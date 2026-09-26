const http = require('http')
const https = require('https')
const { SocksProxyAgent } = require('socks-proxy-agent')

const PORT = parseInt(process.env.PORT || '3001', 10)
// Tor's SOCKS bridge address (`<osIp>:9050`), injected by startos/main.ts.
const TOR_SOCKS = process.env.TOR_SOCKS || '127.0.0.1:9050'
const UPSTREAM_BASE =
  process.env.UPSTREAM_BASE || 'https://chainalysis-proxy.copexit.workers.dev'

// socks5h:// means the SOCKS proxy handles DNS resolution (no DNS leak)
const agent = new SocksProxyAgent(`socks5h://${TOR_SOCKS}`)

// Supports mainnet (1/3/bc1), testnet/signet (m/n/2/tb1)
const ADDR_RE =
  /^\/chainalysis\/address\/([13mn2][a-km-zA-HJ-NP-Z1-9]{25,34}|(bc1|tb1)[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{39,87})$/
const REQUEST_TIMEOUT_MS = 30_000
const MAX_RESPONSE_BYTES = 1024 * 1024
const MAX_REQUEST_BYTES = 64 * 1024
const WHIRLPOOL_BASE = 'https://whirlpoolstats.xyz/api'
const LIQUISABI_URL = 'https://liquisabi.com/api'
const WHIRLPOOL_RE = /^\/observatory\/whirlpool\/(summary|charts|txs)$/

function fetchViaAgent(
  url,
  { method = 'GET', body, timeout = REQUEST_TIMEOUT_MS } = {},
) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const req = https.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        method,
        agent,
        headers: {
          Accept: 'application/json',
          ...(body && {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
          }),
        },
        timeout,
      },
      (res) => {
        const chunks = []
        let totalBytes = 0
        res.on('data', (chunk) => {
          totalBytes += chunk.length
          if (totalBytes > MAX_RESPONSE_BYTES) {
            req.destroy()
            reject(new Error('Upstream response too large'))
            return
          }
          chunks.push(chunk)
        })
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString()
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body)
          } else {
            reject(
              Object.assign(
                new Error(`Upstream ${res.statusCode}: ${body.slice(0, 200)}`),
                { status: res.statusCode },
              ),
            )
          }
        })
      },
    )
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Upstream request timed out'))
    })
    req.end(body)
  })
}

async function readJsonBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > MAX_REQUEST_BYTES) throw new Error('Request body too large')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString())
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  })
  res.end(body)
}

function sendObservatoryError(res) {
  sendJson(
    res,
    502,
    JSON.stringify({
      error: {
        code: 'UPSTREAM_DOWN',
        message: 'Tor proxy upstream request failed',
      },
    }),
  )
}

const server = http.createServer(async (req, res) => {
  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('ok')
    return
  }

  let url
  try {
    url = new URL(req.url, 'http://localhost')
  } catch {
    sendJson(res, 400, JSON.stringify({ error: 'Invalid request URL' }))
    return
  }
  if (url.pathname === '/observatory/liquisabi/api') {
    if (req.method !== 'POST') {
      sendJson(res, 405, JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    let body
    try {
      body = await readJsonBody(req)
    } catch {
      sendJson(res, 400, JSON.stringify({ error: 'Invalid JSON body' }))
      return
    }
    if (body?.jsonrpc !== '2.0' || body.method !== 'dashboard') {
      sendJson(
        res,
        400,
        JSON.stringify({ error: 'Invalid or disallowed method' }),
      )
      return
    }
    try {
      const result = await fetchViaAgent(LIQUISABI_URL, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'dashboard',
          params: {},
          id: 1,
        }),
      })
      sendJson(res, 200, result)
    } catch (err) {
      console.error(`Observatory LiquiSabi error: ${err.message}`)
      sendObservatoryError(res)
    }
    return
  }

  const whirlpool = url.pathname.match(WHIRLPOOL_RE)
  if (whirlpool) {
    if (req.method !== 'GET') {
      sendJson(res, 405, JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    const segment = whirlpool[1]
    const page = Math.min(
      Math.max(parseInt(url.searchParams.get('page') || '1', 10) || 1, 1),
      10_000,
    )
    try {
      const result = await fetchViaAgent(
        `${WHIRLPOOL_BASE}/${segment}${segment === 'txs' ? `?page=${page}` : ''}`,
        {
          timeout:
            segment === 'charts'
              ? 60_000
              : segment === 'summary'
                ? 20_000
                : 30_000,
        },
      )
      sendJson(res, 200, result)
    } catch (err) {
      console.error(`Observatory Whirlpool ${segment} error: ${err.message}`)
      sendObservatoryError(res)
    }
    return
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const match = req.url.match(ADDR_RE)
  if (!match) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        error: 'Invalid path. Use /chainalysis/address/{btc_address}',
      }),
    )
    return
  }

  const address = match[1]
  const upstreamUrl = `${UPSTREAM_BASE}/address/${address}`

  try {
    const body = await fetchViaAgent(upstreamUrl)
    sendJson(res, 200, body)
  } catch (err) {
    if (err.status === 429) {
      res.writeHead(429, {
        'Content-Type': 'application/json',
        'Retry-After': '60',
        'Cache-Control': 'no-store',
      })
      res.end(JSON.stringify({ error: 'Rate limit exceeded' }))
      return
    }
    console.error(`Tor proxy error: ${err.message}`)
    sendJson(
      res,
      502,
      JSON.stringify({ error: 'Tor proxy upstream request failed' }),
    )
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Tor proxy sidecar listening on port ${PORT}`)
  console.log(`Routing via socks5h://${TOR_SOCKS}`)
})

// Graceful shutdown
function shutdown() {
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(1), 5000)
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

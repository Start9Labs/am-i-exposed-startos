FROM node:24-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY server.js ./

USER 1000

EXPOSE 3001
CMD ["node", "server.js"]

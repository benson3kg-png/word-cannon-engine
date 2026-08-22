# Production-Grade Headless Chrome Sandbox Node Core
FROM ghcr.io/puppeteer/puppeteer:latest

USER root
WORKDIR /app

# Ingest package configurations and source trunks
COPY package.json ./
RUN npm install

COPY . .

# Expose port and boot the automated web listener session
EXPOSE 10000
CMD ["node", "server.js"]

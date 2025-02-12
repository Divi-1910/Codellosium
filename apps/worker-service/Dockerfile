FROM node:18-alpine

# Install required build tools
RUN apk add --no-cache build-base python3

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

CMD ["node", "index.js"]
FROM node:20-alpine

RUN apk add --no-cache "curl"

WORKDIR /app
COPY . .
RUN npm install
ENTRYPOINT ["npm", "run", "dev"]
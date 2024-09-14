FROM node:alpine

WORKDIR /app
COPY . .

RUN chmod +x "./docker-entrypoint.sh"

RUN npm install

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]
# ENTRYPOINT ["npm", "run", "dev"]
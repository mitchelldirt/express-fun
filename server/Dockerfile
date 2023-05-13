FROM node:alpine as base
WORKDIR /app
COPY package.json .
RUN rm -rf node_modules && npm install --force
COPY . .
EXPOSE 8080
EXPOSE 8081
CMD ["npm", "run", "dev"]

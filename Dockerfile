# Build the frontend
FROM node:18.16-alpine AS frontend
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
RUN yarn build

# Produce final container
FROM node:18.16-alpine AS final
WORKDIR /app/
COPY --from=frontend /home/node/app/.output ./
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["node", "server/index.mjs"]
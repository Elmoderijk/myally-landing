FROM node:24-alpine AS builder
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# De tests draaien hier mee: de GitHub-workflow kan dat niet (de sleutel van de server mag
# geen workflows wijzigen). Een rode test laat de uitrol mislukken in plaats van stil rood te staan.
RUN npm test

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

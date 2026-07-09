# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package manifests and lockfile
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the production assets
RUN npm run build

# Production Stage
FROM nginx:1.25-alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

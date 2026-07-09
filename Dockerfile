# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built frontend assets
COPY --from=builder /app/dist ./dist

# Copy the Express server file
COPY server.js ./

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]

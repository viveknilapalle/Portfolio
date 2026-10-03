# Development image: Node and all dependencies live in the container.
FROM node:22-bookworm-slim

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies first so this layer is cached until the lockfile changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000
# Webpack dev server: its file polling works on Docker Desktop bind mounts,
# unlike Turbopack's. Production builds still use Turbopack.
CMD ["npm", "run", "dev", "--", "--webpack", "--hostname", "0.0.0.0", "--port", "3000"]

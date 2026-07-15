# syntax=docker/dockerfile:1.7
FROM node:22-alpine
WORKDIR /app

# git is required by VitePress `lastUpdated: true` (reads git log timestamps)
RUN apk add --no-cache git

# Copy package files first for layer caching.
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

# Copy VitePress config (stays in the image, not in mounted volume).
COPY .vitepress/ .vitepress/

# Copy default documentation content. At runtime, the bind mount at
# ./doc-files overlays this, so the image ships with content but the
# mounted volume takes priority.
COPY doc-files/ doc-files/

EXPOSE 5173
CMD ["npx", "vitepress", "dev", "--host", "0.0.0.0", "--port", "5173"]

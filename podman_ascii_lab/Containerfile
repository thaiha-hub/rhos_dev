# --- Stage 1: Builder ---
FROM node:18-alpine AS builder

# Install OpenSSL to generate our dummy certs
RUN apk add --no-cache openssl

# Create a directory for certs
WORKDIR /build-certs

# Generate a dummy certificate (simulating the 'gen_certificates.sh' from your lab)
RUN openssl req -new -newkey rsa:2048 -days 365 -nodes \
    -x509 -keyout dummy.key -out dummy.crt \
    -subj "/CN=localhost"

# --- Stage 2: Runtime ---
FROM node:18-alpine

# 1. Set Working Directory
WORKDIR /app

# 2. Copy artifacts from the previous stage
# Notice the --from=builder flag
COPY --from=builder /build-certs/dummy.crt ./certs/dummy.crt

# 3. Copy application source code
COPY package.json server.js ./

# 4. Install dependencies (if we had any)
# --omit=dev keeps the image small
RUN npm install --omit=dev

# 5. Create a non-root user for security
# Alpine syntax to add a user without a password
RUN adduser -D appuser

# 6. Change ownership of the app directory to this new user
# If we don't do this, the 'appuser' cannot read/write files owned by root
RUN chown -R appuser:appuser /app

# 7. Switch to the user
USER appuser

# 8. Set Environment Variables
ENV APP_PORT=8080
ENV WELCOME_MSG="Podman on Mac"

# 9. Expose the port (Documentation only, technically)
EXPOSE 8080

# 10. Set the Entrypoint
# ENTRYPOINT makes the container run as an executable
ENTRYPOINT ["npm", "start"]
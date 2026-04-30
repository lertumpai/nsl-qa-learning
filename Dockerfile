# Use official Node.js image as the base
FROM node:24.12.0-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Start the app using the Next.js built-in server
EXPOSE 3000
CMD ["npm", "start"] 
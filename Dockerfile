# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies first (for caching)
COPY package.json package-lock.json* ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app
COPY . .



# 7. Build the Next.js app
CMD ["sh", "-c", "npm run generate && npm run dev"]


# 8. Expose port
EXPOSE 3000



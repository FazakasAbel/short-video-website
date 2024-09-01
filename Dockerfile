FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

FROM node:14-slim AS production

RUN npm run build

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]

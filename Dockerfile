# Base image
FROM node:22

# Work directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Start the Node application
CMD ["npm", "start"]

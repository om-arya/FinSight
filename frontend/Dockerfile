FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Specify the command to run your React application
CMD ["npm", "run", "dev"]
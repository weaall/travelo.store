# base image
FROM node:18

# set working directory
WORKDIR /app

# install build dependencies
RUN apt-get update && apt-get install -y build-essential

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install

# install typescript globally
RUN npm install -g typescript

# copy the rest of the application code
COPY . .

# compile TypeScript to JavaScript
RUN tsc

# expose the port the app runs on
EXPOSE 8080

# start the app using nodemon for development
CMD ["npm", "run", "dev"]

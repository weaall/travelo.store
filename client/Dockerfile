# base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install

# copy the rest of the application code
COPY . .

# expose the port the app runs on
EXPOSE 3000

# start the app
CMD ["npm", "start"]
# Here we are getting our node as Base image
FROM node:15.4

RUN apt-get update
RUN apt-get install less
# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# setting working directory in the container
WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install
COPY . .

# container exposed network port number
EXPOSE 3666

# command to run within the container
CMD [ "npm" ,"run" ,"start" ]
FROM node:10.15.0-alpine AS assets

WORKDIR /app

# Install yarn and other dependencies via apk
RUN apk update && apk add bash git yarn python g++ make && rm -rf /var/cache/apk/*

# Install node dependencies - done in a separate step so Docker can cache it.
COPY ./app/package.json /app/

RUN npm install && npm install pg@6.1.0

## Copy project files into the docker image
COPY ./app /app/

# comment out to initialize database
CMD ["npm", "start"]


## Build something. Let's assume that it outputs into /app/dist/
#RUN yarn build:prod
#
## Build an python app (or something else) and copy from the previous stage
#FROM python:3.6.3
#
## ...
#
#COPY --from=assets /app/dist/ /app/dist/
#
## ...
#
#CMD ./scripts/start.sh

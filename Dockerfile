FROM alpine:latest

# update alpine linux
RUN apk update && apk upgrade && \
    apk add nodejs && \
    # may comment this line in my computer.
    apk add nodejs-npm && \
    npm install -g @angular/cli@1.6.6

# set the working directory to /app
WORKDIR /app

# add source code to images
ADD . /app

# install dependencies
RUN npm install

# expose port 3000
EXPOSE 3000

# run ng serve on localhost
CMD ["ng","serve", "--host", "0.0.0.0", "--disable-host-check"]

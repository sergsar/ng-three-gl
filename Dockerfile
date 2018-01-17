FROM node AS builder

# --------------------------------------
# Install Chrome for testing
# --------------------------------------
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -y google-chrome-stable

# --------------------------------------
# Install npm packages
# --------------------------------------

WORKDIR /app
COPY package.json ./package.json
RUN yarn && yarn global add @angular/cli

COPY . /app

# --------------------------------------
# Run Tests
# --------------------------------------
#RUN ng test --progress false --single-run

# --------------------------------------
# Build PROD & BETA
# --------------------------------------
RUN ng build --prod --no-progress

# --------------------------------------
# Create final image
# --------------------------------------
FROM nginx:1.13.1

WORKDIR /app
COPY --from=builder /app/dist .

RUN  rm -rf /usr/share/nginx/html/* && cp -R /app/* /usr/share/nginx/html/

#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
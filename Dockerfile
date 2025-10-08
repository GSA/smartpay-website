FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install curl, git
RUN apt-get update && \
    apt-get install -y curl git

# Install Node.js 20.19.4
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g n && \
    n 20.19.4

# Ensure the right Node.js version is set as default
RUN ln -sf /usr/local/n/versions/node/20.19.4/bin/node /usr/bin/node && \
    ln -sf /usr/local/n/versions/node/20.19.4/bin/npm /usr/bin/npm

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci

CMD ["npm", "run", "lint"]
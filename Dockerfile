FROM centos:7
MAINTAINER tribou

# Add Node.js rpm
RUN curl -sL https://rpm.nodesource.com/setup_4.x | bash -

# Install dependencies
RUN yum update -y && \
  yum clean all && \
  yum install -y \
  gcc-c++ \
  make \
  nodejs

# Install NPM
RUN npm install -g npm@3

# Create app folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app
ADD package.json /usr/src/app/
RUN npm install

# Add and build assets
ADD . /usr/src/app
RUN npm run build

EXPOSE 8000

CMD npm start

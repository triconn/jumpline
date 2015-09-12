FROM centos:6

# Add Node.js rpm
RUN curl -sL https://rpm.nodesource.com/setup_0.10 | bash -

# Install dependencies
RUN yum update -y && \
  yum clean all && \
  yum install -y \
  gcc-c++ \
  make \
  nodejs

# Install NPM
RUN npm install -g npm@"^2.0.0"

# Install iQueue
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app
RUN npm run build

EXPOSE 8000

CMD npm start


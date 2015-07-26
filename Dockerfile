FROM centos:6

RUN yum update -y && yum clean all && yum install -y gcc-c++ tar

WORKDIR /tmp
RUN curl -o node-v0.12.7-linux-x64.tar.gz https://nodejs.org/dist/v0.12.7/node-v0.12.7-linux-x64.tar.gz
RUN tar xzvf node-v0.12.7-linux-x64.tar.gz
RUN mv node-v0.12.7-linux-x64/ /opt/
ENV PATH $PATH:/opt/node-v0.12.7-linux-x64/bin

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install
RUN npm build

EXPOSE 8000

CMD npm start


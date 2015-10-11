FROM tribou/node:0.10

# Install iQueue
ADD package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app
RUN npm run build

EXPOSE 8000

CMD npm start


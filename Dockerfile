FROM node:alpine

RUN mkdir alfred-front
COPY . /alfred-front
RUN cd /alfred-front && npm install -y

EXPOSE 3000

ENTRYPOINT cd /alfred-front && npm start

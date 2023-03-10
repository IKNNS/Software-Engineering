# build environment
FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime
RUN echo "Asia/Bangkok" >  /etc/timezone

RUN npm install -g serve@11.0.2

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]

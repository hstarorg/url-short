FROM node:8.1.0-alpine

MAINTAINER hstarorg hm910705@163.com

COPY dumb-init /usr/local/bin/dumb-init

COPY dist /dist

COPY public /public

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

WORKDIR /dist

EXPOSE 5001

CMD ["node", "index.js"]

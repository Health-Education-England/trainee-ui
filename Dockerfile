FROM node:12.2.0-alpine

RUN mkdir /app

COPY . /app

WORKDIR /app

ENV PATH="/app/node_modules/.bin:${PATH}"
ENV REACT_APP_SERVER_ADDRESS="https://trainee.tis.nhs.uk"

RUN npm install --production

CMD ["npm", "start"]

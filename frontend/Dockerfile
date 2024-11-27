FROM node:22

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_GOOGLE_MAPS_API_KEY=$REACT_APP_GOOGLE_MAPS_API_KEY

EXPOSE 80

CMD ["yarn", "start"]

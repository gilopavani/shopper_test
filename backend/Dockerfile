FROM node:18

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

ARG GOOGLE_API_KEY

ENV GOOGLE_API_KEY=${GOOGLE_API_KEY}

COPY . .

CMD ["sh", "-c", "npx prisma db push && yarn seed && yarn dev"]

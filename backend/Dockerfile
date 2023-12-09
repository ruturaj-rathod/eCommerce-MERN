FROM node:14.21.3-bullseye

WORKDIR /app

COPY ./package*.json .

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm run dev" ]
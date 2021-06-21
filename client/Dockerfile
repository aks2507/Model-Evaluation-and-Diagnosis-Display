FROM node:14-slim
WORKDIR /user/src/app 
COPY ./package.json ./ 
COPY yarn.lock ./
RUN yarn install 
COPY . .
CMD yarn start 
EXPOSE 3000

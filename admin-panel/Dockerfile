FROM node:14

WORKDIR /usr/src/app/admin-panel

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && yarn

EXPOSE 4201

CMD ["yarn", "start"]

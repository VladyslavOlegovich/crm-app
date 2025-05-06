FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install @types/bcryptjs --save-dev

RUN npm install typescript --save-dev

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
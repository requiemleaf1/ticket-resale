FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
#skip downloading the one with --save-dev flag when rebuild the image
COPY . .

CMD ["npm", "start"]
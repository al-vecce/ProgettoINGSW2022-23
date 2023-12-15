FROM node:current-alpine

RUN mkdir -p /ratatouille2223-web

WORKDIR /ratatouille2223-web

RUN mkdir -p ./public
RUN mkdir -p ./src
RUN mkdir -p ./.next

COPY --chown=node public ./public
COPY --chown=node src ./src
COPY --chown=node .next ./.next
COPY --chown=node jsconfig.json next.config.js package.json postcss.config.js tailwind.config.js ./

EXPOSE 3000

RUN npm install

RUN chown -R node:node /ratatouille2223-web
USER node

ENV NEXT_PUBLIC_APIHOSTNAME=$http://95.245.179.138:8080
ENV NEXT_PUBLIC_NEXTJSAPPHOSTNAME=http://95.245.179.138:3000
ENV NEXT_PUBLIC_OPENFOODFACTSAPI=https://world.openfoodfacts.org/api/v2/product/

RUN npm run build

CMD [ "npm", "start" ]
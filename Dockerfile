FROM node:18-alpine AS build
WORKDIR /app
RUN npm cache clean --force
COPY . .
RUN npm install --force
Copy . .
RUN npm run build
FROM nginx:stable
## Copy our default nginx config
# Copy . .
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/yolustu/ /usr/share/nginx/html
EXPOSE 80


# FROM node:18.17-alpine AS build
# WORKDIR /dist/src/app
# RUN npm cache clean --force
# COPY . .
# RUN npm install
# RUN npm run build
# FROM nginx:stable
# ## Copy our default nginx config
# COPY default.conf /etc/nginx/conf.d/default.conf
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /dist/src/app/dist /usr/share/nginx/html
# EXPOSE 80
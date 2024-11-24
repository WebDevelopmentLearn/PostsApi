FROM node:18-alpine as build
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем остальной код и собираем проект
COPY . ./
RUN npm run build

# Используем Nginx для раздачи статических файлов
FROM nginx:stable-alpine

# Копируем скомпилированные файлы React-приложения
COPY --from=build /app/build /usr/share/nginx/html

# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
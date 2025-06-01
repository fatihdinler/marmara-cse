# web/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Bağımlılıkları yüklemek için package.json dosyalarını kopyala
COPY package*.json ./
RUN npm install

# Tüm kaynak kodunu kopyala
COPY . .

# React geliştirme sunucusunun çalıştığı portu aç
EXPOSE 3439

# Uygulamayı başlat
CMD ["npm", "start"]

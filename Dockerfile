FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build
    
# ---- run ----
FROM node:20
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm i --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
EXPOSE 8080
CMD ["node", "dist/main.js"]

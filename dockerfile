# Stage 1 - Compile Typescript
FROM node:18 as builder

WORKDIR /app

# copy package json
COPY --chown=app:node package*.json ./

# copy application sources
COPY tsconfig.json ./
COPY ./src ./src

RUN npm ci \
    && npm run build

# Stage 2 - Build Runtime
FROM node:18-alpine

WORKDIR /app

# copy package json
COPY --chown=app:node package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# copy migration files
COPY ./.sequelizerc ./
COPY ./migrations ./migrations
COPY ./uang-makan.json ./
COPY ./uang-lembur.json ./
COPY ./penilaian.json ./
COPY ./jabatan-gaji.json ./
COPY ./bonus.json ./

# copy build app
COPY --from=builder /app/build ./build

# download node modules production only
RUN npm ci --omit=dev

RUN apk add --no-cache tzdata
ENV TZ=Asia/Makassar

# run application
CMD ["npm", "start"]

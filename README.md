## Reactjs Nodejs Sequelize RESTAPI PostgreSQL Mongodb AWS IoT Cron

Este software é um web app FULLSTACK com API REST que usa Javascript, React.js, Node.js e PostgreSQL.

- Reactjs
- Nodejs
- Express
- Axios
- PostgreSQL
- Sequelize
- Bcrypt

<div align="center" >
  <img src="./docs/assets/logo.png" width="200">
</div>


Dashboard desenvolvido em **ReactJs** com **TypeScript** inteiramente componentizado com **componentes puros**.

<div align="center" >
  <img src="./docs/assets/minhacarteirapreview.gif">
</div>

### Layout & Componentes Responsivos

<div align="center" >
  <img src="./docs/assets/resposiveview.png">
</div>

### Layout & Componentes Responsivos

- [x] Para os gráficos, foi utilizada a bibliteca [**Recharts**](http://recharts.org/en-US) que é opensource.
- [x] Para efeito de número crescendo eu utilizei o [**React CountUp**](https://www.npmjs.com/package/react-countup).

## RUN ON FRONTEND FOLDER:

- npm i
- npm install -g typescript
- npm install -D typescript
- npm install -D ts-node
- npm run ts
- npm start
- yarn add
- yarn build

## Modelo POSTGRESQL:

CREATE TABLE IF NOT EXISTS users (
login VARCHAR(40) NOT NULL PRIMARY KEY,
password VARCHAR(300) NOT NULL,
name VARCHAR(90) NOT NULL);

## RUN ON BACKEND FOLDER:

- npm install
- npm audit fix
- npm i -D nodemon
- npm run dev
- npm run start

## Rode no PostgreSQL SSH:
Rode cada um dos comandos localizados no arquivo 'backend/db.sql', o qual está dentro da pasta 'sql'

>>>USERS:

RaizApi = http://localhost:1146/api/users

### get users
GET http://localhost:1146/api/users

### criar user
POST http://localhost:1146/api/users
Content-Type: application/json

Modelo JSON para POST e PUT:

{
    "login": "mariadbmongodb",
    "password": "ab12cDef976g",
    "name": "12345678901"
}

### get user
GET http://localhost:1146/api/users/ID

### delete user
DELETE http://localhost:1146/api/users/ID

### update user
PUT http://localhost:1146/api/users/ID
const express = require('express');
const connection = require('./database/database');
const Game = require('./games/Games')
const gamesController = require('./games/GameController')
const app = express();
const bodyParser = require('body-parser');
const port = 8181;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
    console.log('Conexão feita com sucesso')
}).catch((error) => {
    console.log('Erro na conexão')
})

app.use('/', gamesController)

app.listen(port, () => {
    console.log(`API RODANDO! http://localhost:${port}`);
});
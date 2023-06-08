const express = require('express');
const connection = require('./database/database');
const gamesController = require('./games/GameController');
const userController = require('./users/UserController');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8181;



app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection.authenticate().then(() => {
    console.log('Conexão feita com sucesso');
}).catch((error) => {
    console.log('Erro na conexão');
})

app.use('/', gamesController);
app.use('/', userController);

app.listen(port, () => {
    console.log(`API RODANDO! http://localhost:${port}`);
});
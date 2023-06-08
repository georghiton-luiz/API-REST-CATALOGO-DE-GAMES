# API-REST-CATALOGO-DE-GAMES

## Endpoint
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### Ok! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY4NjI2NjkxMywiZXhwIjoxNjg2MjY4NzEzfQ.kzQHtOD1PEcLS04f0F0TZgkb2HLFV0adtM5WbMtUZWM"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o preocesso de autenticação da requisição.
Motivos: Token inválido, Token expirado.
Exemplo de resposta:
```
{
    "err": "Token inválido"
}
```

## Endpoint
### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.
password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
    "email": "user3@example.com",
    "password": "pass3"
}
```
#### Respostas
##### Ok! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:
```
[
    {
        "id": 1,
        "title": "The Witcher 3: Wild Hunt",
        "year": 2016,
        "price": 59.99
    },
    {
        "id": 2,
        "title": "Grand Theft Auto V",
        "year": 2013,
        "price": 29.99
    },
    {
        "id": 3,
        "title": "Red Dead Redemption 2",
        "year": 2018,
        "price": 49.99
    },
    {
        "id": 4,
        "title": "Minecraft",
        "year": 2011,
        "price": 19.99
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o preocesso de autenticação da requisição.
Motivos: Senha ou e-mail incorretos
Exemplo de resposta:
```
{
    "err": "Credenciais inválidas"
}
```

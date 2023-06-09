const express = require('express');
const router = express.Router();
const Game = require('./Games');
const { auth, JWTSecret } = require('../middlewares/auth');

router.get('/games', auth, (req, res) => {

    Game.findAll({
        order:[
            ['id']
        ]
    }).then(games => {
        res.status(200)
        res.json(games)        
    }).catch((erro) => {
        res.status(400)
    })    
})

router.get('/games/:id', auth, (req, res) => {
    let id = req.params.id;
    if (!isNaN(id)) { 
        Game.findByPk(id).then(game => {
            if (game != undefined) {
                res.status(200).json(game)                 
            } else {
                res.status(404).json({ error: 'Jogo não encontrado' })
            }
        })
    } else {
        res.sendStatus(400)
    }
})

router.post('/game', auth, (req, res) => {
    let {title, year, price} = req.body;
    if(title != undefined && year != undefined && price != undefined){
        Game.create({
            title,
            year,
            price
        }).then(() => {
            res.status(200).json({ confirm: 'Jogo adicionado com sucesso!' })
        }).catch((erro) => {
            res.status(404).json({ error: 'Jogo não adicionado!' })
        })
    }else{
        res.sendStatus(400)
    }
})

router.delete('/game/:id', auth, (req, res) => {
    let id = req.params.id
    if (id != undefined) {
        if(!isNaN(id)){
            Game.destroy({
                where:{
                    id
                }
            }).then(() => {
                res.status(200).json({ confirm: 'Jogo deletado com sucesso!' })
            })
        }else{
            res.status(404).json({ error: 'Jogo não encontrado!' })
        }
    } else {
        res.sendStatus(400)
    }
})

router.put('/game/:id', auth, (req, res) => {
    let {title, year, price} = req.body;
    let id = req.params.id
    if (id != undefined) {
        if(!isNaN(id)){
            Game.update({title, year, price},{
                where: {
                    id
                }
            }).then(() => {
                res.status(200).json({ confirm: 'Informações do jogo atualizada com sucesso!' })
            })
        }else{
            res.status(404).json({ error: 'Jogo não encontrado!' })
        }
    } else {
        res.sendStatus(400)
    }
})

module.exports = router
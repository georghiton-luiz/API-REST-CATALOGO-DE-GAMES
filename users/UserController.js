const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./User');
const { auth, JWTSecret } = require('../middlewares/auth')

router.post('/auth', (req, res) => {
    let {email, password} = req.body;
    if (email != undefined) {
        User.findOne({where: {email}}).then((user) => {
            if (user.password == password) {
                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn: '30m'}, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({err: 'Falha interna'});
                    } else {
                        res.status(200);
                        res.json({token: token})
                    }
                });
            } else {
                res.status(401);
                res.json({err: 'Cresenciais inválidas'})
            }
        }).catch(() => {
            res.status(404);
            res.json({err: 'O email enviado não existe'});
        })
    } else {
        res.status(400);
        res.json({err: 'O email enviado é inválido'})
    }
});

module.exports = router
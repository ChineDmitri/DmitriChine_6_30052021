const User = require('../models/User');

const bcrypt = require('bcrypt'); //bcryptage
const jwt = require('jsonwebtoken'); //attribution des tokens

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // salt = 10 tours, en suite retourn un promise
        .then((hash) => { 
            const user = new User({ //creation d'un instance user
                email: req.body.email,
                password: hash
            });
            user.save() // n'oublie pas souvegarger dans la DB
                .then(() => res.status(201).json({ message: "User created!" })) // response 201 = obj created
                .catch((error) => res.status(400).json({ error }));
        })
        .cathc(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Utilisateur n'est pas touvé "})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((validation) => {
                    if (!validation) {
                        return res.status(401).json({ message: "Mot de pass incorrect"}) // 401 non auth
                    };
                    res.status(200)({ // 200 OK auth
                        iserId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
}
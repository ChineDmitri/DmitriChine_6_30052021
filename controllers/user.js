const User = require('../models/User');
const crypto = require('crypto');

const bcrypt = require('bcrypt'); //bcryptage
const jwt = require('jsonwebtoken'); //attribution des tokens

const SECRET_KEY = 'MOT_SECRET'; 

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // salt = 10 tours, en suite retourn un promise
        .then((hash) => { 

            
            const hashEmail = crypto.createHmac('sha256', SECRET_KEY)
                .update(req.body.email)
                .digest('hex');
            console.log(hashEmail);

            const user = new User({ //creation d'un instance user
                email: hashEmail,
                password: hash
            });
            user.save() // n'oublie pas souvegarger dans la DB
                .then(() => res.status(201).json({ message: "User created!" })) // response 201 = obj created
                .catch((error) => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {

    const hashEmail = crypto.createHmac('sha256', SECRET_KEY)
        .update(req.body.email)
        .digest('hex');
    console.log(hashEmail);

    req.body.email = hashEmail;

    User.findOne({ email: hashEmail })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Utilisateur n'est pas touvé "})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((validation) => {
                    if (!validation) {
                        return res.status(401).json({ message: "Mot de pass incorrect"}); // 401 non auth
                    };
                    res.status(200).json({ // 200 OK auth
                        userId: user._id,
                        token: jwt.sign( // distribution token
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                   
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
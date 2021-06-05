const Sauce = require('../models/Sauce');

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauce) => res.status(200).json({ sauce }))
        .catch((error) => res.status(400).json({ error }))
};

// exports.createSauce = (req, res, next) => {
//     const sauceObjet = JSON.parse(req.body.thing)
//     // delete req.body._id;
//     delete sauceObjet._id;
//     const thing = new Thing({
//         // ...req.body
//         ...sauceObjet
//     });
//     thing.save()
//         .then(() => res.status(201).json({ message: 'objet enregistré!' }))
//         .catch(() => res.status(400).json({ error }));
// };
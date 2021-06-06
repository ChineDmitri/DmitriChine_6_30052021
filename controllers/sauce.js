const Sauce = require('../models/Sauce');

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json( sauces ))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
      .then((sauce) => {res.status(200).json(sauce);})
      .catch((error) => {res.status(404).json({error: error});});
  };

exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce) // parsé en format JSON
    delete sauceObjet._id; // _id destripustion par MongoDB
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce ajouté" }))
        .catch((error) => res.status(400).json({ error }));
};
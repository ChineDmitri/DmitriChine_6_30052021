const Sauce = require('../models/Sauce');
const fs = require('fs');

function deleteOneSauce(objet) {
    const fileName = objet.imageUrl.split('/images/')[1];
    fs.unlinkSync(`images/${fileName}`);
}

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

exports.modifySauce = (req, res, next) => {
    const sauceObjet = req.file ? // s'il existe on parse body Sauce SINON on reste simple
        { // true 1
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        } : { ...req.body }; // false 0
    
    if (req.file) { // si on modifier une image pour une sauce, il ne faut pas oublier supprime l'ancienne
        Sauce.findOne({ _id: req.params.id})
            .then((sauce) => deleteOneSauce(sauce))
            .catch((error) => res.status(500).json({ error }));
    }

    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObjet, _id: req.params.id }, 
    )
        .then(() => res.status(200).json({ message: 'Objet modify' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => deleteOneSauce(sauce))
        .catch((error) => res.status(500).json({ error }));

    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce deleted"}))
        .catch((error) => res.status(400).json({ error }));
}

exports.voteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {

            switch(req.body.like) {
                case 0: // si c'est 0 donc user n'est neutre, donc null par son userID!
                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersDisliked: req.body.userId },
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({ message: 'like 0' }))
                        .catch((error) => res.status(400).json({ error }));
                    } else {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersLiked: req.body.userId },
                            _id: req.params.id
                        })
                            .then(() => res.status(200).json({ message: 'like 0' }))
                            .catch((error) => res.status(400).json({ error }));
                    }


                    // sauceObjet.userliked.splice(indexOf(req.params.user), 1)
                    // sauceObjet.usersDisliked.splice(indexOf(req.params.user), 1)
                    
                    // sauceObjet.likes = sauceObjet.userliked.length;
                    // sauceObjet.usersDisliked = sauce.usersDisliked.length;
                    console.log("0")


                    break;
                case -1:

                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersLiked: req.body.userId },
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({ message: 'like 0' }))
                        .catch((error) => res.status(400).json({ error }));
                    }
                
                    Sauce.updateOne({ _id: req.params.id }, {
                        $push: { usersDisliked: req.body.userId },
                        _id: req.params.id
                    })
                        .then(() => res.status(200).json({ message: 'like -1' }))
                        .catch((error) => res.status(400).json({ error }));

                    
                    
                    console.log("-1")

                    break;
                case 1:

                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $pull: { usersDisliked: req.body.userId },
                            _id: req.params.id
                        })
                        .then(() => res.status(200).json({ message: 'like 0' }))
                        .catch((error) => res.status(400).json({ error }));
                    }
                
                    Sauce.updateOne({ _id: req.params.id }, {
                        $push: { usersLiked: req.body.userId },
                        _id: req.params.id
                    })
                        .then(() => res.status(200).json({ message: 'like -1' }))
                        .catch((error) => res.status(400).json({ error }));
        
                    console.log("1")

                    break;
            }
        })
        .catch((error) => res.status(500).json({ error }));
    
}
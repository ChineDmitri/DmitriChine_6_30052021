const mongoos = require('mongoose');

const sauceSchema = mongoos.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String},
    heat: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: Array},
    usersDisliked: {type: Array}
});

module.exports = mongoos.model('Sauce', sauceSchema);
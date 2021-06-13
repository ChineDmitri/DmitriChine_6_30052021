const rateLimit = require('express-rate-limit');

const optionLike = {
    windowMs: 5 * 1000, // 5 seconds
    max: 3
};
const optionModify = {
        windowMs: 10 * 1000, // 10 seconds
    max: 1
};
const optionCreateDelete = {
    windowMs: 60 * 1000, // 60 seconds
    max: 1
};
const optionSignup = {
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 1
};

exports.like = rateLimit(optionLike);

exports.modify = rateLimit(optionModify);

exports.createDelete = rateLimit(optionCreateDelete);

exports.signup = rateLimit(optionSignup);
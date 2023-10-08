const toolkit = require('../utils/toolkit')

exports.getPageNotFound = (req, res, next) => {
    res.status(404).send(toolkit.response(false, 404, {}, "", "Request is not found"));
}
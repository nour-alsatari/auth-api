'use strict';
const Users = require('../models/users.model');

function bearer(req, res, next) {

    if(req.headers.authorization);
    const bearerHeaderToken = req.headers.authorization.split(' ')[1]; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhbWltIiwiaWF0IjoxNjM2MzY2MDgwfQ.OhHLD4yRWs1LlTloBjIs0j-QYzi8LdoQDXUfPaO0BSg

    Users.authenticateBearer(bearerHeaderToken)
        .then(userData => {
            req.user = userData;
            req.user.token = bearerHeaderToken;
            next();
        }).catch(() => {
            next('Bearer token authentication error');
        });

}

module.exports = bearer;
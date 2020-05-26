const { Router } = require('express');

const jwt = require('jsonwebtoken');

const auth = Router();

auth.post('/', (req, res) => {
    const { username } = req.body;

    const token = jwt.sign({username: username}, 'privateKey', {expiresIn: '60s'});

    res.send(token);
});

module.exports = auth;

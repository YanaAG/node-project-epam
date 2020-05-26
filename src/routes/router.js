const { Router } = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const router = Router();

const pokemons = require('../routes/pokemons');
const auth = require('../routes/auth');

const User = require('../models/User');

function verifyJWT(token) {
    let isValid = false;

    if (token){
        // eslint-disable-next-line no-unused-vars
        jwt.verify(token, 'privateKey', function (err, decoded) {
            if (err) {
                isValid = false;
            } else {
                isValid = true;
            }
        });
    } else {
        isValid = false;
    }

    return isValid;
}

passport.use(
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    (username, password, done) => {
        User.findOne({username: username}, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {errors: {'Username': 'is incorrect'}});
            }

            const match = bcrypt.compareSync(password, user.password);

            if (!match) {
                return done(null, false, {errors: {'Password': 'is incorrect'}});
            }

            return done(null, user);
        });
    })
);

passport.use(
    new BearerStrategy((token, done) => {
        const isValid = verifyJWT(token);

        if (!isValid) {
            return done(null, false, {errors: {'Username or password': 'is incorrect'}});
        }

        return done(null, token);
    })
);

router.use('/pokemons', passport.authenticate('bearer', {session: false}), pokemons);
router.use('/authenticate', passport.authenticate('local', {session: false}), auth);

module.exports = router;

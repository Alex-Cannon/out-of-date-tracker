const router = require('express').Router();
let isAuth = require('../utils/passportUtil').isAuth;

router.get('/items', isAuth, (req, res) => {

});

module.exports = router;
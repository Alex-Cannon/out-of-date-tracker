const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const User = require('../utils/schema.js').User;

// Post an item
router.post('/item', isAuth, (req, res) => {

});

// Returns a list of 10 items.
router.get('/items', isAuth, (req, res) => {
  Item.find({}, (err, docs) => {
    if (err) { return res.sendStatus(500) }
    if (!docs) { return res.sendStatus(400) }

    res.json(docs)
  }).skip(req.query.page * 10).limit(10)
});

module.exports = router;
const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const Item = require('../utils/schema.js').Item;

let errJSON = {class: "alert alert-danger", message: "Internal server error. Please try again"};

function createItem(req, res) {
  Item.create(req.body, (err, item) => {
    if (err || !item) { return res.status(500).json(errJSON); }
    console.log("Created item");
    return res.json({_id: item._id});
  });
}

// Post items
router.post('/items', isAuth, (req, res) => {
  Item.create(req.body.items, (err, item) => {
    if (err || !item) { return res.status(500).json(errJSON); }
    console.log("Created items");
    return res.json({_id: item._id});
  });
});

// Edit or add an item
router.put('/item', isAuth, (req, res) => {
  if (req.body._id) {
    Item.updateOne({_id: new ObjectID(req.body._id)}, req.body, {upsert: true}, (err, result) => {
      if (err || !result) { return res.sendStatus(500); }
      console.log("Item updated or added");
      return res.sendStatus(200);
    });
  } else {
    createItem(req, res);
  }
});

// Returns a list of 10 items.
// Sort by {date || needs-updated}
router.get('/items', isAuth, (req, res) => {
Item.find(req.query && req.query.query?{$text: {$search: req.query.query}}:{})
  .sort({dates: 1})
  .skip(10*req.query.skip)
  .limit(10)
  .exec((err, items) => {
    if (err) { return res.sendStatus(500); }
    if (!items) { return res.sendStatus(404); }
    res.json(items);
  });

});

// Delete an item
router.delete('/item', isAuth, (req, res) => {
  Item.deleteOne({_id: new ObjectID(req.body.item_id)}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    return res.sendStatus(200);
  })
});

module.exports = router;
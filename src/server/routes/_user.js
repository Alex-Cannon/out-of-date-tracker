const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const User = require('../utils/schema.js').User;
const userUtil = new User();

let errJSON = {class: "alert alert-danger", message: "Internal server error. Please try again"};

// Adds a user to the DB.
router.post('/adduser', (req, res) => {

  // Verify username does NOT exist
  User.findOne({username: req.body.username}, (err, userExists) => {
    if (err) { return res.status(500).json(errJSON); }
    if (userExists) { return res.status(409).json({class: "alert alert-danger", message: "Username already taken. Please use a different username."})}

    // Hash given password
    req.body.password = userUtil.generateHash(req.body.password);

    // Create user
    User.create(req.body, (err, doc) => {
      if (err) { return res.status(500).json(errJSON); }
      if (!doc) { return res.status(500).json(errJSON); }

      // Sign In. Remove password from response.
      doc.password = null;
      passport.authenticate('local');
      return res.json(doc);
    });
  });
});

router.get("/myuser", isAuth, (req, res) => {
  console.log("got myuser");
  req.user.password = null;
  return res.json(req.user);
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
  var user = req.user;
  user.password = null;
  res.json(user);
});

router.get('/signout', function (req, res) {
  console.log("Signing out...");
  req.logout();
  res.sendStatus(200);
});


module.exports = router;
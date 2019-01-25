if (!process.env.PRODUCTION) {
  const config = require('../config.js');
  Object.keys(config).map((key) => {
    process.env[key] = config[key];
  });  
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoUtil = require('./utils/mongoUtil.js');

const PORT = process.env.PORT || 80;

// Allow JSON and urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to DB before opening routes
mongoUtil.connectToServers((err) => {
  if (err) throw err;

  console.log("DB connection success.");

  // Setup/Configure passport
  require('./utils/passportUtil.js').setupPassport(app);

  // Setup API routes
  app.use('/api/', require('./routes/_user.js'));
  app.use('/api/', require('./routes/_item.js'));


  // Initialize App
  app.listen(PORT, (app) =>
    console.log("App listening on port " + PORT + "...")
  );
});

module.exports = app;
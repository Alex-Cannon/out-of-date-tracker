const mongoose = require('mongoose');
var mongoUtil = require('./mongoUtil.js');
const connection = mongoUtil.getConnection();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// USER
var userSchema = new Schema({
  username: String,
  password: String,
  items: Array
}, { 
  collection: "users" 
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var schemas = {
  User : connection.model('User', userSchema),
};

module.exports = schemas;
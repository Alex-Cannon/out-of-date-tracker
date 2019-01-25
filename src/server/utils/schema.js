const mongoose = require('mongoose');
var mongoUtil = require('./mongoUtil.js');
const connection = mongoUtil.getConnection();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// USER
var userSchema = new Schema({
  username: String,
  password: String,
}, { 
  collection: "users" 
});

// ITEM
var itemSchema = new Schema({
  name: String,
  dates: Array,
  owner: String // User ObjectID
}, {
  collection: "items"
});

// Allow text queries on "Item.name"
itemSchema.index({name: 'text'}, {default_language: "none"});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var schemas = {
  User : connection.model('User', userSchema),
  Item : connection.model('Item', itemSchema)
};

module.exports = schemas;
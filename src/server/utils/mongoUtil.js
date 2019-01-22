var mongoose = require('mongoose');

let connection;

module.exports = {
  connectToServers: function ( callback ) {
    connection = mongoose.createConnection(process.env.DB_URI, { useNewUrlParser: true}, function(err) {
      if (err) { return callback(err); }
      callback();
    });
  },

  getConnection: function() {
    return connection;
  },

}

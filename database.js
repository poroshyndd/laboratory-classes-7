const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');

let database;


function mongoConnect(callback) {
  const password = encodeURIComponent(DB_PASS);
  const uri = "";
  const client = new MongoClient(uri, {
    tlsAllowInvalidCertificates: true  
  });

  client.connect()
    .then(() => {
      console.log('Connection to the database has been established.');
      database = client.db('shop');
      callback();
    })
    .catch(err => {
      console.error('MongoDB connection failed!', err);
      throw err;
    });
}


function getDatabase() {
  if (!database) throw new Error('No database found.');
  return database;
}

module.exports = { mongoConnect, getDatabase };


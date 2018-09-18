const pg = require("pg");
const settings = require("./settings"); // settings.json


var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,      //'127.0.0.1',
    user : settings.user,          //'your_database_user',
    password : settings.password,  //'your_database_password',
    database : settings.database,  //'myapp_test'
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

const addPerson = function() {
  knex('famous_people').insert({
    first_name: firstName,
    last_name: lastName,
    birthdate: date
  })
  // .asCallback(function(err, rows) {
  //   if (err) return console.error(err);
  // });
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(err) {
    console.error(err);
  })

};

addPerson();
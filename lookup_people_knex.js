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

const inputName = process.argv[2];

const lookUp = function() {
  knex.select('*')
    .from('famous_people')
    .where('first_name', 'ILIKE', inputName)
    .orWhere('last_name', 'ILIKE', inputName)
    // asCallback will wait until all the search is done, then handles it
    // Promises is the more modern way of doing it
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log(`Found ${rows.length} person(s) by the name${inputName}:`);
      let count = 1;
      rows.forEach(output => {
        console.log(`- ${count}: ${output.first_name} ${output.last_name}, born '${output.birthdate.toLocaleString().slice(0,8)}'`,)
        count ++;
      })
      // knex.destroy();   // force closes the pooling
    });
  };

lookUp();

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({   // prototyping client as pg tool, adding the below settings
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    for (stuff in result) {
      console.log(stuff)
    }
    console.log(`result[0]: ${result.rows[0]}`)
    console.log(`result[1]: ${result.rows[1]}`)
    console.log(`result[2]: ${result.rows[2]}`)


    console.log(result.rows[0].number); //output: 1
    client.end();
  });
});


// What other information does the result object returned from query contain?
// Why does the query function take in an array of arguments?
// Is there any resemblance to the mongo driver that you used in Week 3, in this activity?
// What is this new keyword that you see being used to create the client? You may not have seen this before.

// INSIDE result object:

// command
// rowCount
// oid
// rows
// fields
// _parsers
// RowCtor
// rowAsArray
// _getTypeParser
// addCommandComplete
// _parseRowAsArray
// parseRow
// addRow
// addFields
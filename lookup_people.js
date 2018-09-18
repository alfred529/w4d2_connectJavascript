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

const inputName = process.argv[2];
// const last_name = process.argv[3];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...")
  lookUp();
});


// FUNCTION TO LOOK UP THE DATABASE
const lookUp = function() {
  client.query(`SELECT *
                FROM famous_people
                WHERE first_name ILIKE '${inputName}'
                OR last_name ILIKE '${inputName}'`,
                (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result);
    console.log(`Found ${result.rowCount} person(s) by the name${inputName}:`);
    let count = 1;
    result.rows.forEach(output => {
      console.log(`- ${count}: ${output.first_name} ${output.last_name}, born '${output.birthdate.toLocaleString().slice(0,8)}'`,)
      count ++;
    })
    // console.log(result.rows);
    client.end();
  });
}

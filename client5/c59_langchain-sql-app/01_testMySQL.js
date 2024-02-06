require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }

  console.log('Connected to MySQL database!');

  connection.query('SHOW TABLES', (err, tables) => {
    if (err) {
      console.error('Error fetching tables:', err.message);
    } else {
      console.log('Loaded tables:');
      tables.forEach((table) => console.log(table.Tables_in_world));
    }

    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
});
import dotenv from 'dotenv'; dotenv.config();
import mysql2 from 'mysql2/promise';

// main is run at the end
//----------------------------------------------------
async function main() {
    var pConnection 
  try {
    const connectionConfig = {
      host:     process.env.DB3_MYSQL_HOST,
      port:     3306, // Default MySQL port
      user:     process.env.DB3_MYSQL_USER,
      password: process.env.DB3_MYSQL_PASSWORD,
      database: process.env.DB3_MYSQL_DATABASE,
//    connectTimeout: 10000, // Added connection timeout (10 seconds)
    };
 
    var pConnection = await mysql2.createConnection(connectionConfig);
    console.log(`You have successfully connected to MySQL at ${process.env.DB3_MYSQL_HOST}.`);

    // ... rest of your code using the connection ...

  } catch (err) {
    console.error(`ERROR ${err.code || err.errno}: ${err.message}`); // Use code or errno for clarity
    if (err.code === 'ETIMEDOUT') {
      console.error('Connection timed out. Consider increasing the timeout or checking network connectivity.');
    }
    process.exit(1);
  } finally {
    if (pConnection) {
      await pConnection.end();
    }
  }
} // eof main
//----------------------------------------------------

main();

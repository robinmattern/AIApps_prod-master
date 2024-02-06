//  const sqlite3 = require('sqlite3');
   import sqlite3 from 'sqlite3'

   var aPath = '/e/Repos/Robin/AIApps_/dev01-robin/client5/5c1_langchain-sql-app/assets/chinook.db'
   var aPath = '/Repos/Robin/AIApps_/dev01-robin/client5/5c1_langchain-sql-app/assets/chinook.db'
   var aPath = './assets/chinook.db'
   var aPath = './assets/sakila.db'

// const db = new sqlite3.Database('./chinook.db');
   const db = new sqlite3.Database( aPath, (err) => {
    if (err) {
        console.error( "Error connecting to database:", err.message);
        return; // Exit if connection failed
        }

        console.log( `Connected to the database successfully! ${db.open}` );

//      db.all( "SELECT * FROM sqlite_master WHERE type = 'table'", ( err, tables ) => {
        db.all( 'SELECT name FROM sqlite_master WHERE type = "table"', ( err, tables ) => {
            if (err) {
        console.error( "Error fetching tables:", err.message);
    } else {
        console.log( "Loaded tables:" );
        tables.forEach( (table) => console.log( table.name ) );
        }
      } );
    
//      Retrieving All Rows
        selectEm( "SELECT first_name || ' ' || last_name FROM customer" )
//      selectEm( "SELECT EmployeeId, FirstName FROM employees" ) 
//      selectEm( "SELECT * FROM tracks" )

        closeIt()      
    } ); // eob new sqlite3.Database
//  ---------------------------------------------------------------    

function selectEm( aSQL ) {
     var aTable = aSQL.replace( /.+FROM/, "" ).replace( / WHERE.+/, "" ).replace( /^ +/, "" ) 
        db.all( aSQL, (err, rows) => {
    if (err) {
        console.error( `Error fetching from table, '${aTable}':`, err.message );
    } else {
        console.log( `{aTable} table:` );
        rows.forEach( (row) => console.log( row ) );
        } 
      } )  
    }; // eof selectEm 
//  ---------------------------------------------------------------    

function closeIt( ) {
        db.close( (err) => {
    if (err) {
        console.error( "Error closing database:", err.message );
      } else {
        console.log( "Database closed successfully." );
        }
      } );
    }; // eof closeIt
//  ---------------------------------------------------------------    
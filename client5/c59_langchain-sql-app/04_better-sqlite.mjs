
 import Database from 'better-sqlite3';
  const db = new Database('./chinook.db', {} );  // was options 
  db.pragma('journal_mode = WAL');

  try {
//const row = db.prepare( 'SELECT * FROM users WHERE id = ?').get( userId );
  const row = db.prepare( 'SELECT * FROM customer WHERE LastName = ?').get( 'Jones' );
        console.log( row.firstName, row.lastName, row.email );
    } catch( err ) {
        console.log( err );
        }       

//const pSQL = db.prepare( 'SELECT * FROM users' )
process.exit()
  const rows = pSQL.run()      
        rows.forEach( (row) => {
          console.log(row.EmployeeId + " " + row.FirstName);
        } )

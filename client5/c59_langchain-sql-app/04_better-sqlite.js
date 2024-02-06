  const db = require( 'better-sqlite3' )( 'chinook.db', {} );  // was options 

//const row = db.prepare( 'SELECT * FROM users WHERE id = ?').get( userId );
//      console.log(row.firstName, row.lastName, row.email);

        db.all("SELECT EmployeeId, FirstName FROM employees", (error, rows) => {
          rows.forEach((row) => {
          console.log(row.EmployeeId + " " + row.FirstName);
          } )
        } );
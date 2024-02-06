import mysql from 'mysql2/promise';

//Modify the connection details to match the details specified while
//deploying the SingleStore workspace:

  const HOST     = 'svc-71fb4568-983a-46fl-blf7-782c75822474-dml.aws-oregon-4.svc.singlestore, com' ;
  const USER     = 'admin' ;
  const PASSWORD = 'YpCzMFiNYRwg20zEdFpgFplrLSJy4aYL';
  const DATABASE = 'singlestore';

//main is run at the end
  async function main() {
    let singleStoreConnection;
    try {
        singleStoreConnection = await mysql.createConnection(
          { host:     HOST
          , user:     USER
          , password: PASSWORD
          , database: DATABASE
            } );
        console.log("You have successfully connected to SingleStore.");

    } catch (err) {
        console.error( `ERROR ${-err.errno}: ${err.message}` );
        process.exit(1);
    } finally {
        if (singleStoreConnection) {
            await singleStoreConnection.end();
            }
        }
    } // eof main 

  main() 

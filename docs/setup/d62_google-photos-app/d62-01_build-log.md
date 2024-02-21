<span id="b3"></span>

 3. **Edit the App package.json file**  
    `# cd ./c61_llm-comments-db-app`    
    `# cat package.json`  
      ```
        {
          "name": "aiapps_client6-c61_llm-comments-db-app",
          "version": "0.1.1",
          "description": "First Node.js AI Client App to label YouTube comments using OpenAI model",
          "Author": "Robin Mattern",
          "main": "index.mjs",
          "scripts": {
            "start":        "node index.mjs",   
            "vueDocs":      "bash ../../docs/run-docsify.sh",   
            "getComments":  "node index.mjs google",   
            "savComments":  "node index.mjs insert",   
            "runModel":     "node index.mjs update",   
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "dependencies": { },

          "type": "module"
          }
      ```
<span id="b4"></span>

 4. **Create Database and Table**   
   - In MySQL Workbench, create a new schema, named: `comments`   
   - Create a new table, named: `comments`    
      ```
        USE comments;  
        CREATE TABLE comments(  
          id        INT AUTO_INCREMENT KEY,  
          commentid VARCHAR(64),  
          commenter VARCHAR(64),  
          comment   VARCHAR(512),  
          gpt       VARCHAR(512),  
          flag      INT,  
          respond   INT  
          )
      ```
<span id="c5"></span>

### C. Connect to a MySQL database
 5. **Write a simple DB connect script**   
    - In VSCode, open New Integrated Terminal   
    `# cd ./client6/c61*`   
    `# cat 00_db_u01-connect.js`    
      ```
         import dotenv from 'dotenv'; dotenv.config() 
         import mysql  from 'mysql2/promise';

        // 01.1 Write main() function which is run at the end
        //----------------------------------------------------
          async function main() {
            var pConnection 
            try {
            var pConnection = await mysql.createConnection(
                  { host:     process.env.DB1_MYSQL_HOST
                  , user:     process.env.DB1_MYSQL_USER
                  , password: process.env.DB1_MYSQL_PASSWORD
                  , database: process.env.DB1_MYSQL_DATABASE
                  , port:     3306 // Default MySQL port
        //        , pool:     true 
                  } );
                console.log(   `Successful connection to MySQL DB at: ${process.env.DB1_MYSQL_HOST}`);

            } catch( pErr ) {
                console.log(   `Failed to connect to MySQL DB at: ${process.env.DB1_MYSQL_HOST}`);
        //      console.error( `ERROR:`,  pErr );
        //      console.error( `ERROR: ${ pErr }` );
                console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
                process.exit(1);
            } finally {
            if (pConnection) {
                await pConnection.end();
                }
                }
            } // eof main 
        //----------------------------------------------------

        // 01.2 Call main() function
        //----------------------------------------------------
                main() 

        //----------------------------------------------------
      ```
<span id="c6"></span>

 6. **Add MySQL config paramerters to .env**   
    `# cp  .env_u03  .env`   
    `# cat .env`    
      ```
           GOOGLE_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
           OPENAI_API_KEY = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

           DB1_MYSQL_HOST     = '127.0.0.1'
           DB1_MYSQL_USER     = 'root'
           DB1_MYSQL_PASSWORD = 'FormR!1234'
           DB1_MYSQL_DATABASE = 'comments'
      ```
<span id="c7"></span>

 7. **Run the DB Connect script**  
    `# node 00_db_u01-connect.js`
      ```
        Successful connection to MySQL DB at: 127.0.0.1
      ```
<span id="d8"></span>

### D. Add a Sample Data Record
 8. **Write an insert function**  
    - In VSCode, open New Integrated Terminal   
    `# cd ./client6/c61*`  
    `# cat 00_db_u01-testInsert.js`  
      ```
        // 03.1 Write insert() function to be run inside main
        //----------------------------------------------------
          async function insert( { pConnection, pComment } ) {      // .(40203.03.1 RAM Was create())
          const [ results ] = await conn.execute(
                 'INSERT INTO comments (commentid, commenter, comment, gpt, flag, respond) VALUES ( ?, ?, ?, ?, ?, ? )'
              , [ pComment.commentid, pComment.commenter, pComment.comment, pComment.gpt, pComment.flag, pComment.respond ]
                );
         return results.insertld;
                }
                
        // 03.2 Use insert() function inside main
        //----------------------------------------------------
          const id = await insert( { pConnection, pComment:         // .(40203.03.2 RAM Was create())
                  { commentid:  1
                  , commenter: "Adrian Twarog"
                  , comment  : "Why did the database go on a diet? It had too many tables!"
                  , spt      : ""
                  , flag     :  0
                  , respond  :  0 
                    }
                  } );
               console.log( `Inserted row id is: ${id}.` );    
      ```
<span id="d9"></span>  

 9. **Write and use a function getDBconfig()**  
    `# cat 00_db_u02-testInsert.js`   
      ```
          async function main() {
            var pConnection 
            var pDBconfig = getDBconfig( 'DB1' )                    // .(40203.05.1 RAM Use getDBconfig())
            try {
            var pConnection = await mysql.createConnection( pDBconfig )
                ... 

        // 05.2 Write getDBconfig() function to be run inside main
        //----------------------------------------------------
        function getDBconfig(aDB) {                                 // .(40203.05.2 RAM Write getDBconfig())
            var pCfg =  
                 { host:     process.env[`#{aDB}_MYSQL_HOST`]
                 , user:     process.env[`#{aDB}_MYSQL_USER`]
                 , password: process.env[`#{aDB}_MYSQL_PASSWORD`]
                 , database: process.env[`#{aDB}_MYSQL_DATABASE`]
                 , port:     3306 // Default MySQL port
                   } 
         return pCfg            
                };
        //----------------------------------------------------
      ```
<span id="d10"></span>

10. **Run the script to insert a test comment record**    
    `# node 00_db_u02-testInsert.js`   
      ```
        Successful connection to MySQL DB at: 127.0.0.1.
        Inserted row id: 1.
      ```
<span id="e10"></span>
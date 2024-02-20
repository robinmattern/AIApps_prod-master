
## Integrate OpenAI GPT3 with a Database

View a description of this app: [here](../../docs/setup/d61_llm-comments-db-app/d61-00_description.md)   

You will need to have NodeJS v18+ installed to run the node scripts below. VSCode and MySQL are also needed
to edit and debug the scripts, although the scripts will run using a remote MySQL database. 

The first command below creates a .env file.  In it are real credentials that should not be shared.  However,
you will need to get your own API_KEYs from the Google and OpenAI links above and replace them into the .env file. 

- `# cp .env_u03 .env; nano .env`      [view setup](../../docs/setup/d61_llm-comments-db-app/d61-00_description.md?id=61B) 
- `# node 00_db_u01-connect.js`        [view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c5)
- `# node 01_db_u03-testInsert.js`     [view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D8)
- `# node 02_cm_u01-testAPI.js`       ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e12))  
- `# node 02_cm_u03-getComments.mjs`  ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e13))
- `# node 02_db_u05-addComments.mjs`  ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=f15))
- `# node 03_ai_u01-testOpenAI.js`    ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g17))
- `# node 03_ai_u03-updComments.mjs`  ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g19))
- `# node 04_ai_u01-doEmAll.mjs`      ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=h22))
- `# node index.mjs`                  ([view code ](../../docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?id=h24))


## Integrate OpenAI GPT3 with a Database
### <div style="margin-top: -10px; margin-left: 80px;">(c61_llm-comments-db-app)</div>

### A. Background Info

This tutorial written by Adrian Twarog, uses a OpenAI model to categorize YouTube video comments as
requiring a response, not needed a response or offensive. 

 - **Title**: How to integrate OpenAI GPT3 with a Databases - Crash Course - [Video](https://www.youtube.com/watch?v=N4nX_rTwKx4) 
 - **Keywords**: JavaScript, MySQL, SingleStoreDB, OpenAI, GPT3.5, AI Model, Youtube Comments. 
 - **Author:** Adrian Twarog, Date: 4/23/23 
 - **GitHub:** adriantwarog/youtube-comments-openai-gpt3 [Repo](https://github.com/adriantwarog/youtube-comments-openai-gpt3.git)
 - **Project Repos App**: c61_llm-comments-db-app
 - **Links:** 
    - [OpenAI API_KEY Page](https://platform.openai.com/api-keys)   
    - [OpenAI Usage Page](https://platform.openai.com/usage)   
    - [Google Dev Project Page](https://console.cloud.google.com/apis/welcome?project=)   
    - [Google Dev API_KEY Page](https://console.cloud.google.com/apis/credentials?project=)   
    - [SingleStore DB Service](https://www.singlestore.com/cloud-trial/)
    - [Bard Conversation](https://g.co/bard/share/6f48fe97c585)
    - [App Build Log](setup/d61_llm-comments-db-app/d61-01_build-log.md)
 - **Modules**:  
   - dotenv v16.4.1
   - mysql2-promise v0.1.4
   - googleapis v114.0.0
   - openai v3.2.1

You will need to have NodeJS v18+ installed to run the node scripts below. VSCode and MySQL are also needed
to edit and debug the scripts, although the scripts will run using a remote MySQL database. 

The first command below creates a .env file.  In it are real credentials that should not be shared.  However,
you will need to get your own API_KEYs from the Google and OpenAI links above and replace them into the .env file. 

- `# cp .env_u03 .env; nano .env`
- `# node 00_db_u01_connect.js`
- `# node 01_db_u01-testInsert.js`   
- `# node 02_comments_u01-testAPI.js`  
- `# node index_u01.mjs`  
- `# node 03_ai_u01-testOpenAI.js` 
- `# node 03_ai_u02-updateDB.js` 
- `# node index_u02.mjs`  

### B. Setup Project and Database 

Before writing any code, you will need to create a project folder, clone the repository that goes with the video, 
install node modules in the client6 folder and setup the app folder.  Finally, if you are using your own MySQL
database, you will need to create a MySQL database schema, named `comments' and a table of the same name to hold 
the YouTube video comments.

 1. **Clone the Repository**  
 2. **Install Node Modules**  
 3. **Copy Source Files into App folder**  
 4. **Create Database and Table**

### C. Connect to a MySQL database

These three steps create a script to perform the connection to the MySQL database specified in the .env file. 

 5. **Write a simple DB connect script**                    [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c5)
 6. **Add MySQL config parameters to .env**                 [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c6)
 7. **Run the DB Connect script**                           [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c7)

### D. Add a Sample Data Record

Now you can add a function to insert comment records into the database. Step 9. adds a helper function to 
make it easier to switch between different local and remote MySQL databases.

 8. **Write an insert function**                            [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D8)
 9. **Write and use a function getDBconfig()**              [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D9)
10. **Run the script to insert a sample comment record**    [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D10) 

### E. Get YouTube comments with Google API 

Next you'll use the Google YouTube API to get the comments for Adrian's YouTube Video.  Create a project at the [projectcreate page](https://console.cloud.google.com/projectcreate)
Then enable the "youtube data api v3" API at the [api page](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3)
And finally you'll get an API_KEY for it at the [apis/library page]( https://console.cloud.google.com/apis/credentials?project=)

11. **Get Google YouTube API_KEY and put it into .env**     [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=E11) 
12. **Write a script to get YouTube comments**              [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=_12-Write-a-script-to-get-YouTube-comments) 
13. **Run script to get YouTube comments. Then turn it into a module script**  [view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=E13) 

### F. Add YouTube comments to MySQL database               ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=f-add-youtube-comments-to-mysql-database))
These two scripts save the comments retreived from the Google YouTube API into the `comments` table in the MySQL database

14. **Write addComments in 01_db_v07-addComments.mjs**      [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L276) 
15. **Write and run script to add comments into MySQL DB**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L324) 

### G. Run the YouTube comments against OpenAI model, davinci-002 

The last three steps test the OpenAI API using the davinci-002 model and loop though the YouTube comments, creating a prompt for each one that 
gets submitted to the OpenAI model using the API.  At first, we got an error 472 that indicates we've exceeded our quota for how many times per minute 
we can run the model.  This [link](https://platform.openai.com/account/limits) describes the problem. and this 
[link](https://platform.openai.com/usage) shows how many times we have run time model and what will be charged against our free $500 started quota.  

It seems that all the free models can only be run 3 times per minute.  So we asked Bard to help me out 
and write a runction to throttle how often the API, pOpenAI.createCompletion( pRequest ), gets run.   

16. **Test OpenAI model. Write and run script to run comments against OpenAI model**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L348) 
17. **Add Bard's function, throttledCreateCompletion**      [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L488) 
18. **Write and run simple script to process 5 comments**   [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L507) 

### H. Refactor DB and main index scripts   
The last two steps refactor the DB script to handle multiple SQL operations and the main `index.js' script 
to run the various operations from the command line using node.   

19. **Refactor addComments into doComments**                [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L555) 
20. **Write improved script to test multiple processes**    [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L662) 
21. **Run improved script to test multiple processes**      [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L757) 



<div style="width: 800px;">

## Integrate OpenAI GPT3 with a Database
### <div style="margin-top: -10px; margin-left: 40px; margin-bottom:20px;">(c61_llm-comments-db-app)</div>

### A. Background Info

This tutorial written by Adrian Twarog, uses a OpenAI model to categorize YouTube video comments that
require a response, and those that don't need a response or are offensive.  Of the XX AI Use Cases we've 
described under AI Research, this application demonstrates the use of an AI model to classify a series of 
test stored in a database.   

 - **Title**: How to integrate OpenAI GPT3 with a Databases - Crash Course ([view video](https://www.youtube.com/watch?v=N4nX_rTwKx4)) 
 - **Keywords**: JavaScript, MySQL, SingleStoreDB, OpenAI, GPT3.5, AI Model, Youtube Comments. 
 - **Author:** Adrian Twarog, Date: 4/23/23 
 - **GitHub:** adriantwarog/youtube-comments-openai-gpt3 ([goto repo](https://github.com/adriantwarog/youtube-comments-openai-gpt3.git))
 - **Project Repos App**: c61_llm-comments-db-app
 - **Links:** 
    - [OpenAI API_KEY Page     ](https://platform.openai.com/api-keys)   
    - [OpenAI Usage Page       ](https://platform.openai.com/usage)   
    - [Google Dev Project Page ](https://console.cloud.google.com/apis/welcome?project=)   
    - [Google Dev API_KEY Page ](https://console.cloud.google.com/apis/credentials?project=)   
    - [SingleStore DB Service  ](https://www.singlestore.com/cloud-trial/)
    - [Bard Conversations      ](https://g.co/bard/share/6f48fe97c585),  [MySQL Error](https://g.co/gemini/share/00475349aac4)
    - [App Build Log           ](setup/d61_llm-comments-db-app/d61-01_build-log.md)
 - **Modules**:  
   - dotenv v16.4.1
   - mysql2-promise v0.1.4
   - googleapis v114.0.0
   - openai v3.2.1

You will need to have NodeJS v18+ installed to run the node scripts below. VSCode and MySQL are also needed
to edit and debug the scripts, although the scripts will run using a remote MySQL database. 

The commands below allow you to run the NodeJS scripts for this application located in the folder, 
`/C/Repos/AIApps_/dev01-robin/client6/c61_llm-comments-db-app`,  There are four requirements for them to work
described in the three `(view details)` links below and in Sections B, E and G.  Starting in Section C, you can 
view the steps required to write the scripts.  Section I describes how you can make a copy of the repository
in order to edit or create the scripts for this application 

- Setup Project and MySQL Database    ([view details](setup/d61_llm-comments-db-app/d61-00_description.md#b1))
- Get Google Project and API_KEY      ([view details](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e10))
- Get OpenAI Model API_KEY            ([view details](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g10))
- `# cd /C/Repos/AIApps/client6/c61*`
- `# cp .env_u03 .env; nano .env`     ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c6))
- `# node 02_cm_u01-testAPI.js`       ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e12))  
- `# node 03_ai_u01-testOpenAI.js`    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g17))
- `# node 00_db_u01-connect.js`       ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c5))
- `# node 01_db_u03-testInsert.js`    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=d8))
- `# node 02_cm_u03-getComments.mjs`  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e13))
- `# node 02_db_u05-addComments.mjs`  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=f15))
- `# node 03_ai_u03-updComments.mjs`  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g19))
- `# node index_u03.mjs`              ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g22))

<span id="b1" name="b1"></span>

### B. Setup Project and MySQL Database             &nbsp; ([view setup](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=b1))

Before writing any code, you will need to create a project folder, clone the repository that goes with the video, 
install node modules in the client6 folder and setup the app folder.  Finally, if you are using your own MySQL
database, you will need to create a MySQL database schema, named `comments' and a table of the same name to hold 
the YouTube video comments.

 1. **Clone the Repositories**                              ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=b1))
 2. **Install Client Node Modules**                         ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=b2))
 3. **Edit the App package.json file**                      ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=b3))
 4. **Create Database and Table**                           ([view setup](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=b4))

### C. Connect to a MySQL database

These three steps create a script to perform the connection to the MySQL database specified in the .env file. 

 5. **Write a simple DB connect script**                    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c5))
 6. **Add MySQL config parameters to .env**                 ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c6))
 7. **Run the DB Connect script**                           ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=c7))

### D. Add a Sample Data Record

Now you can add a function to insert comment records into the database. Step 9. adds a helper function to 
make it easier to switch between different local and remote MySQL databases.

 8. **Write an insert function**                            ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D8))
 9. **Write and use a function getDBconfig()**              ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D9))
10. **Run the script to insert a sample comment record**    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=D10)) 

<span id="e1" name="e1"></span>

### E. Get YouTube comments with Google API                 ([view details](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e10)) 

Next you'll use the Google YouTube API to get the comments for Adrian's YouTube Video. ([view details](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e10))
- Create a project at the ([projectcreate page](https://console.cloud.google.com/projectcreate))
- Then enable the "youtube data api v3" API at the ([api page](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3))
- And finally you'll get an API_KEY for it at the ([apis/library page]( https://console.cloud.google.com/apis/credentials?project=))

11. **Get Google YouTube API_KEY and put it into .env**     ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e11)) 
12. **Write a script to get YouTube comments**              ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=e12)) 
13. **Run script to get YouTube comments. Then turn it into a module script**  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=E13)) 

### F. Add YouTube comments to MySQL database       &nbsp; ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=F14))
These two scripts save the comments retreived from the Google YouTube API into the `comments` table in the MySQL database

14. **Write addComments in 01_db_v07-addComments.mjs**      ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=F14) 
15. **Write and run script to add comments into MySQL DB**  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=F15) 

<span id="g1" name="g1"></span>

### G. Run the YouTube comments against OpenAI model, davinci-002    ([view details](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=g10))

The next we will get an OpenAI API_KEY from the OpenAI website and then run a simple test.  
- Create a project at the ([projectcreate page](https://console.cloud.google.com/projectcreate))
- Then enable the "youtube data api v3" API at the ([api page](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3))
- And finally you'll get an API_KEY for it at the ([apis/library page]( https://console.cloud.google.com/apis/credentials?project=))

16. **Get OpenAI API_KEY and put it into .env**                      ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=G16)) 
17. **Write and run a script to test OpenAI model**                  ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=G17)) 

The next three steps access the OpenAI API in a loop for each YouTube comment, creating a prompt for each one, invoking the davinci-002 model
At first, we got an error 472 that indicates we've exceeded our quota for how many times per minute we can run the model.  
- This [link](https://platform.openai.com/account/limits) describes the problem. 
- This [link](https://platform.openai.com/usage) shows how many times we have run time model and what will be charged against our free $500 started quota.  

It seems that all the free models can only be run 3 times per minute.  So we asked Bard to help me out 
and write a runction to throttle how often the API, pOpenAI.createCompletion( pRequest ), gets run.   

18. **Write and run script to run comments against OpenAI model**    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=G18)) 
19. **Add Bard's function, throttledCreateCompletion**               ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=G19)) 
20. **Write and run simple script to process 5 comments**            ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=G20)) 

### H. Refactor DB and main index scripts   
The next two steps refactor the DB script to handle multiple SQL operations and the main `index_u03.js' script 
to run the various operations from the command line using NodeJS.   

21. **Refactor addComments into doComments**                ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=h21)) 
22. **Write improved script to test multiple processes**    ([view code](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=h22)) 
23. **Run improved script to test multiple processes**      ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=h23)) 

### I. Create your own repository 

24. **Setup a new repository**                              ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=i24)) 
25. **Create an empty app folder in client6 from template** ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=i25))  
26. **Update your repository in Github**                    ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=i26)) 
27. **Update your or the master repository from Github**    ([view commands](setup/d61_llm-comments-db-app/d61-01_build-log.md?id=i27)) 


<div style="height:1000px;"></div>
</div>

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
 - **Google Project App**: [aiapps-dev01-robin](https://console.cloud.google.com/welcome?project=aiapps-dev01-robin)
 - **Links:** 
 - [OpenAI API_KEY](https://platform.openai.com/api-keys)   
 - [Google Dev API_KEY](https://console.cloud.google.com/welcome?project=aiapps-dev01-robin)   
 - [SingleStore DB Service](https://www.singlestore.com/cloud-trial/),
 - [Bard Conversation](https://g.co/bard/share/7713d9089754),
 - [App Build Log](setup/d61_llm-comments-db-app/d61-01_build-log.md)  
 - **Modules**:  

### B. Setup Project and Database 

Before writing any code, we will create a project folder, clone the repository that goes with the video, 
install node modules in the client6 folder and setup the app folder.  Finally we will create a MySQL database
schema and a table to hold the YouTube video comments.

 1. **Clone the Repository**  
 2. **Install Node Modules**  
 3. **Copy Source Files into App folder**  
 4. **Create Database and Table**

### C. Connect to a MySQL database

These three steps create a script to perform the connection. 

 5. **Write a script**  
 6. **Add MySQL Config parameters to .env**  
 7. **Run the DB Connection app**  

### D. Add a Sample Data Record

We will now add a function to insert comment records into the database. We'll also write a helper function to 
make it easier to switch between local and remote MySQL databases

 8. **Write an insert function**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L156)
 9. **Write and use a function getDBconfig()**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L185)
10. **Run the script to insert a sample comment record**  

### E. Get YouTube comments with Google API 

Next we use the Google YouTube API to get the comments for Adrian's
YouTube Video.  We create a project at the [projectcreate page](https://console.cloud.google.com/projectcreate)
Then enable the "youtube data api v3" API at the [api page](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3)
And finally we get an API_KEY for it at the [apis/library page]( https://console.cloud.google.com/apis/credentials?project=aiapps-dev01-robin)

11. **Get Google YouTube API_KEY and put it into .env**  
12. **Write a script to get YouTube comments**  
13. **Run the script to get YouTube comments**  

### F. Add YouTube comments to MySQL database 
These two scripts save the comments into the comments table in the MySQL database
14. **Write addComments in 01_db_v07-addComments.mjs** 
15. **Write and run script to add comments into MySQL Database** 

### G. Run comments against OpenAI model, davinci-002 
Finally we loop though the comments and create a prompt for each one that 
get submitted to the OpenAI model using the API, We got an error 472 that indicates we
have exceeded our quota for how many times we can run the model.  This 
[link](https://platform.openai.com/account/limits) describes the problem. and this 
[link](https://platform.openai.com/usage) shows how many times we have run time model and 
what will be charged against our free $500 started quota.  

I seems that all the free models can only be run 3 times per minute.  So I asked Bard to help me out 
and write a runction to throttle how often the API, pOpenAI.createCompletion( pRequest ), gets run.   

16. **Write and run script to run comments against OpenAI model**   
17. **Add Bard's function, throttledCreateCompletion**  
18. **Write and run simple script to process 5 comments**  

### H. Refactor DB and main index scripts   
I refactored the DB script to handle multiple SQL operations and the main index script 
to run the variouse processes from the command line.   
19. **Refactor addComments into doComments**   
20. **Write and run improved script to test multiple processes**  
21. **Run improved script to test multiple processes**  



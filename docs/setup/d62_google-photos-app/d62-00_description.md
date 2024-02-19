<div style="width: 800px;">

## Analyze Google Photos
### <div style="margin-top: -10px; margin-left: 40px; margin-bottom:20px;">(c61_llm-comments-db-app)</div>

### A. Background Info

This application utilizes a Google API to obtain information about Google Photos

 - **Title**: Analyze Google Photos 
 - **Keywords**: JavaScript, MySQL, SingleStoreDB, OpenAI, GPT3.5, AI Model, Youtube Comments. 
 - **Author:** Robin Mattern, Date: 2/16/24 
 - **GitHub:** https://www.npmjs.com/package/googleapis
 - **Project Repos App**: c62_google-photos-app
 - **Links:** 
    - [Google Dev Project Page ](https://console.cloud.google.com/apis/welcome?project=)   
    - [Google Dev API_KEY Page ](https://console.cloud.google.com/apis/credentials?project=)   
    - [Bard Conversations      ]()
    - [App Build Log           ](setup/d62_google-photos/d62-01_build-log.md)
 - **Modules**:  
   - dotenv v16.4.1
   - mysql2 v3.9.1
   - mysql2-promise v0.1.4
   - googleapis v114.0.0
   - openai v3.2.1

### E. Get YouTube comments with Google API 

Next you'll use the Google YouTube API to get the comments for Adrian's YouTube Video.  Create a project at the [projectcreate page](https://console.cloud.google.com/projectcreate)
Then enable the "youtube data api v3" API at the [api page](https://console.cloud.google.com/apis/library/browse?q=youtube%20data%20api%20v3)
And finally you'll get an API_KEY for it at the [apis/library page]( https://console.cloud.google.com/apis/credentials?project=)

11. **Get Google YouTube API_KEY and put it into .env**     [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L217) 
12. **Write a script to get YouTube comments**              [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L223) 
13. **Run script to get YouTube comments. Then turn it into a module script**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L257) 

</div>
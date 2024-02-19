<div style="width: 800px;">

## Google Vertex First App
### <div style="margin-top: -10px; margin-left: 40px; margin-bottom:20px;">(c61_llm-comments-db-app)</div>

### A. Background Info

This application utilizes a Google API to obtain information about Google Photos

 - **Title**: Google Vertex First App
 - **Keywords**: JavaScript, Gemini, AI Models. 
 - **Author:** Robin Mattern, Date: 2/19/24
 - **GitHub:** https://...
 - **Project Repos App**: c63_google-vertex-ai-app
 - **Links:** 
    - [YouTube Tutorial Video](https://...)   
    - [Github Tutorial Page](https://...)   
    - [Bard Conversations      ]()
    - [App Build Log           ](/setup/google-vertex-ai-app/d63-02_build-log.md)
 - **Modules**:  
   - dotenv v16.4.1
   - mysql2 v3.9.1
   - mysql2-promise v0.1.4
   - googleapis v114.0.0
   - openai v3.2.1

### B. Setup

1. **Initial Links** 
   - <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer">ai.google.dev</a>  
   - <a href="https://aistudio.google.com/app/prompts/new_chat?utm_source=agd&utm_medium=referral&utm_campaign=core-cta&utm_content=">aistudio.google.com</a>  
   - <a href="https://console.cloud.google.com/vertex-ai/generative?project=" target="_blank">vertex-ai</a>   
     &nbsp;<br>     
   
1. **Get Google YouTube API_KEY and put it into .env**     [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L217) 
   
2. **Write a script to get YouTube comments**              [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L223) 
3. **Run script to get YouTube comments. Then turn it into a module script**  [view code](https://github.com/robinmattern/dev01-robin/blob/f3d1bca139fb3a0631045cb4885edac72e59cb89/docs/setup/d61_llm-comments-db-app/d61-01_build-log.md?plain=1#L257) 

</div>
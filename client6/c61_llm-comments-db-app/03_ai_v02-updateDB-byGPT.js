import dotenv from 'dotenv'; dotenv.config() 
import { Configuration, OpenAIApi } from "openai";
import doComments from './01_db_u03-module.mjs'    // .(40204.07.11 RAM New module)

// 09.1 Set OpenAI API_KEY
// -------------------------------------------------
var pConfiguration = new Configuration(
         { apiKey      : process.env.OPENAI_API_KEY
//	     , organization: process.env.OPENAI_ORG
           } );
    var pOpenAI        =  new OpenAIApi( pConfiguration );

// 09.3 Write function updateDatabaseUsingGPT
// -------------------------------------------------
async function updateDatabaseUsingGPT( ) {
    var mComments = await doComments( 'select' );

        console.log( `Processing ${mComments.length} comments.` )
   try {
   for (var i = 0; i < mComments.length; i++) {

        var aPrompt = `The following AI tool helps YouTubers identify if a comment can should be replied to or not.\n`
                    + `Questions and/or asking for advice are good examples of when a reply is needed.\n\n` 
                    // Context Example 1
                    + `User: John Smith\n` 
                    + `Comment: That was a great video, thanks!\n` 
                    + `Should Reply: No\n\n` 
            
                    // Context Example 2
                    + `User: Sue Mary\n` 
                    + `Comment: I'm stuck on step four, how do I do it?\n` 
                    + `Should Reply: Yes\n\n` 
            
                    // Actual use case
                    + `User: ${mComments[0].commenter}\n` 
                    + `Comment: ${mComments[i].comment}\n` 
                    + `Should Reply:`
/*
        var pArgs = { model : "davinci-002"   // .(40204.09.1 RAM Deprecated: text-davinci-003)
                    , prompt:  aPrompt
                    , stop: [ "\n", "User:", "Comment:", "Should Reply:" ]
                    , max_tokens:  7
                    , temperature: 0
                      } );
        var pResponse = await pOpenAI.createCompletion( pArgs ) 
*/                
        var pResponse = await pOpenAI.createCompletion(
             { model : "davinci-002"   // .(40204.09.1 RAM Deprecated: text-davinci-003)
             , prompt:  aPrompt 
            , stop: [ "\n", "User:", "Comment:", "Should Reply:" ]
            , max_tokens:  7
            , temperature: 0
              } );
        var aResponse = pResponse.data.choices[0].text.trim()    
            console.log( `Comment Id ${mComments[i].id} response: ${aResponse}` );

        if (aResponse == "Yes") {
      await doComments( 'update',[ mComments[i].id ] );
            console.log( `Comment Id ${mComments[i].id} updated` )
            } // if comment respond = "Yes"

        } // eol for each mComments  

    } catch( pErr ) {
        console.log(   `Failed to process pOpenAI.createCompletion`);
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
        process.exit()
        }        
    } // eof updateDatabaseUsingGPT
// --------------------------------------------------------

  async function readDatabase() {

    var pComments = await doComments( 'select' );
        console.log( pComments )
        }
// --------------------------------------------------------

// 09.4 Run updateDatabaseUsingGPT
// -------------------------------------------------

        updateDatabaseUsingGPT();
//      readDatabase();

// --------------------------------------------------------


import   dotenv      from 'dotenv'; dotenv.config()
import { Configuration, OpenAIApi } from "openai";
import   doComments  from './01_db_u05-module.mjs'    // .(40204.07.11 RAM New module)

// 09.1 Set OpenAI API_KEY
// -------------------------------------------------
var pConfiguration = new Configuration(
         { apiKey      : process.env.OPENAI_API_KEY
//       , organization: process.env.OPENAI_ORG
           } );
    var pOpenAI        =  new OpenAIApi( pConfiguration );

//#09.3 Write function updateDatabaseUsingGPT
// 09.5 Refactor function updateDatabaseUsingGPT to take aPromptTemplate, mComments as arguments
// -------------------------------------------------
  async function updateDatabaseUsingGPT(         aPromptTemplate, mComments ) {           // .(40204.09.5 RAM Add Arguments)


        mComments  =  mComments ?  mComments : [ { id: 1, commenter: '', comment: '' } ]  // .(40204.09.6 RAM Make mComents optional)


        console.log( `Running ${mComments.length} comments against OpenAI 'davinci-002' model.` )

   try {
   for (var i = 0; i < mComments.length; i++) {

        var aPrompt =  aPromptTemplate                                                    // .(40204.09.7 Update template)
        var aPrompt =  aPrompt.replace( /{Commenter}/, mComments[0].commenter )           // .(40204.09.8)
        var aPrompt =  aPrompt.replace( /{Comment}/,   mComments[i].comment   )           // .(40204.09.9)

//      var mStop   = [ "\\n", "User:", "Comment:", "Should Reply:" ]                     // .(40212.01.1 RAM Got this error: '$.stop' is invalid. Please check the API reference: https://platform.openai.com/docs/api-reference.' )
        var mStop   = [        "User:", "Comment:", "Should Reply:" ]                     // .(40212.01.2 RAM So let's remote "\\n", Why??)

        var pRequest =
             { model :     "davinci-002"                                                  //#.(40204.09.2 RAM Deprecated: text-davinci-003).(40204.13.6)

             , prompt:      aPrompt
             , stop:        mStop                                                         // .(40212.01.3 RAM Use variable)
             , max_tokens:  7
             , temperature: 0
               };
        var pResponse = await pOpenAI.createCompletion( pRequest )


        var aResponse = pResponse.data.choices[0].text.trim()
            console.log( `Comment Id ${mComments[i].id} response: ${aResponse}` );


        if (aResponse == "Yes") {
      await doComments(  'update',[ mComments[i].id ] );
      await doComments(  'update', { set: 'respond = 1', where: `id = ${ mComments[i].id }` } );
            console.log( `Comment Id ${mComments[i].id} updated` )

            } // if comment respond = "Yes"


        } // eol for each mComments

    } catch( pErr ) {
        console.log(   `Failed to process pOpenAI.createCompletion`);
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        console.log(   `    URL: ${pErr.config.url}\n\n`
                     + ` Headers: ${pErr.request._header.replace( /\n+$/, "" ).replace( /\n/g, "\n          " ) }\n`
                     + `Req Data: ${pErr.config.data}\n\n`
                     + `Res Data: ${pErr.response.data.error.message}\n` )
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

// 09.6 Run            function, updateDatabaseUsingGPT
// -------------------------------------------------





    var aPrompt1   = "Say this is a test"

    var aPrompt2   = `The following AI tool helps YouTubers identify if a comment can should be replied to or not.\n`
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
                   + `User: {Commenter}\n`
                   + `Comment: {Comment}\n`
                   + `Should Reply:`






//                    await doComments( 'connect', 'DB2' );
    var mComments2 =  await doComments( 'select' );

//      updateDatabaseUsingGPT(         aPrompt1 );
        updateDatabaseUsingGPT(         aPrompt2, mComments2 );

//      readDatabase();

// --------------------------------------------------------

import { promisify } from "util"; const wait = promisify( setTimeout );                   // .(40206.02.1 BARD Write wait function)
import   dotenv      from 'dotenv'; dotenv.config()
import { Configuration, OpenAIApi } from "openai";

import   doComments  from './01_db_u05-module.mjs'                                        // .(40204.07.11 RAM New module)

// 09.1 Set OpenAI API_KEY
// -------------------------------------------------
var pConfiguration = new Configuration(
         { apiKey      : process.env.OPENAI_API_KEY
//	     , organization: process.env.OPENAI_ORG
           } );
    var pOpenAI        =  new OpenAIApi( pConfiguration );

//#09.3 Write function updateDatabaseUsingGPT
// 09.5 Refactor function updateDatabaseUsingGPT to take aPromptTemplate, mComments as arguments
// -------------------------------------------------
//async function updateDatabaseUsingGPT(         aPromptTemplate, mComments ) {           // .(40204.09.5 RAM Add Arguments)
  async function updateDatabaseUsingGPT( aModel, aPromptTemplate, mComments ) {           // .(40205.13.5 RAM Add aModel)

        mComments  =  mComments ?  mComments : [ { id: 1, commenter: '', comment: '' } ]  // .(40204.09.6 RAM Make mComents optional)
    var nWaitSecs  =  mComments[0].comment == '' ? 2 : 20                                 // .(40207.14.1 RAM Override 20 secs if testing).(40206.06.1 RAM Add nWaitSecs)

        console.log( `Running ${mComments.length} comments against OpenAI '${aModel}' model.` )
        console.log( `Submitting prompt every ${nWaitSecs} secs (${ `${new Date()}`.substr( 16, 8 )}).`) // .(40206.06.2)
   try {
   for (var i = 0; i < mComments.length; i++) {

        var aPrompt =  aPromptTemplate                                                    // .(40204.09.7 Update template)
        var aPrompt =  aPrompt.replace( /{Commenter}/, mComments[0].commenter )           // .(40204.09.8)
        var aPrompt =  aPrompt.replace( /{Comment}/,   mComments[i].comment   )           // .(40204.09.9)

//      var mStop   = [ "\\n", "User:", "Comment:", "Should Reply:" ]                     // .(40212.01.1 RAM Got this error: '$.stop' is invalid. Please check the API reference: https://platform.openai.com/docs/api-reference.' )
        var mStop   = [        "User:", "Comment:", "Should Reply:" ]                     // .(40212.01.2 RAM So let's remote "\\n", Why??)

        var pRequest =
//           { model :     "davinci-002"                    					          //#.(40204.09.2 RAM Deprecated: text-davinci-003).(40204.13.6)
             { model :      aModel                          					          // .(40204.13.6 RAM Add aModel)
             , prompt:      aPrompt
             , stop:        mStop                                                         // .(40212.01.3 RAM Use variable)
             , max_tokens:  7
             , temperature: 0
               };
//      var pResponse = await pOpenAI.createCompletion( pRequest )                       //#.(40206.02.2)
        var pResponse = await throttledCreateCompletion( pRequest, nWaitSecs )           // .(40206.06.1 RAM Add nWaitSecs).(40206.02.2 RAM Run every minute)

        var aResponse = pResponse.data.choices[0].text.trim().padEnd(3)
//          console.log( `Comment Id ${mComments[i].id} response: ${aResponse} (${ `${new Date()}`.substr(16,8)})` );
        var aMsg = `Comment Id ${mComments[i].id} response: ${aResponse} (${ `${new Date()}`.substr( 16, 8 )})`

        if (aResponse == "Yes") {
//    await doComments(  'update',[ mComments[i].id ] );
      await doComments(  'update', { set: 'respond = 1', where: `id = ${ mComments[i].id }` } );
//          console.log( `Comment Id ${mComments[i].id} updated: '${mComments[i].comment.substr( 1, 40 )}...'` )
            aMsg = `${aMsg}; Updated: '${mComments[i].comment.substr( 0, 40 )}...'`
            } // if comment respond = "Yes"
            console.log( aMsg );

        } // eol for each mComments

    } catch( pErr ) {
        console.log(   `\nFailed to process pOpenAI.createCompletion`);
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}\n` );
        console.log(   `      URL: ${pErr.config.url}\n\n`
                     + `  Headers: ${pErr.request._header.replace( /\n+$/, "" ).replace( /\n/g, "\n           " ) }\n`
                     + ` Req Data: ${pErr.config.data}\n\n`
                     + ` Res Data: ${pErr.response.data.error.message}\n` )
        process.exit(1);
//  } finally {
//      process.exit()
        }
    } // eof updateDatabaseUsingGPT
// --------------------------------------------------------

  async function readDatabase() {

    var pComments = await doComments( 'select' );
        console.log( pComments )
        }
// --------------------------------------------------------

// 09.6 Run refactored function, updateDatabaseUsingGPT
// 10.1 Write function, updComments, for export
// -------------------------------------------------
//async function updComments( aUpdType ) {
  async function updComments( aUpdType, aModel ) {          			  // .(40205.13.1 RAM Add aModel)
        aUpdType   =  aUpdType ? aUpdType : 'all'
        aModel     =  aModel   ? aModel   : 'davinci-002'   			  // .(40205.13.2)
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

    if (aUpdType  == 'test') {
  await updateDatabaseUsingGPT( aModel, aPrompt1 );                       // .(40205.13.3)
        console.log(  `\nAI Model test completed.\n` );
        }
    if (aUpdType == 'all') {
                      await doComments( 'connect', 'DB1' );
    var mComments2 =  await doComments( 'select' );

//      updateDatabaseUsingGPT(         aPrompt1 );
  await updateDatabaseUsingGPT( aModel, aPrompt2, mComments2 );           // .(40205.13.4)
        console.log(  `\nAI Model update completed.\n` );
        }
        } // eof updComments
// -------------------------------------------------

  async function throttledCreateCompletion( pRequest, nWaitSecs ) {       // .(40206.06.1).(40206.02.3 BARD Write function)

  const dStartTime   = Date.now();
//const pResponse    = await pOpenAI.createCompletion( pRequest );
  const dElapsedTime = Date.now() - dStartTime;
  const dWaitTime    = Math.max( 0, (nWaitSecs * 1000) - dElapsedTime);   // .(40206.06.1 RAM Add nWaitSecs).(40206.02.3 BARD Wait at least 1 second)
        await wait( dWaitTime );
  const pResponse    = await pOpenAI.createCompletion( pRequest );
 return pResponse;
        }                                                                 // .(40206.02.3 BARD End)
// --------------------------------------------------------

// 10.2 Export function, updateComments
// -------------------------------------------------
   export default updComments

// --------------------------------------------------------

    if (import.meta.url.replace( /.+\//, "" ) == process.argv[1].replace( /.+[\\\/]/, "" ) ) {
        updComments( )
        }
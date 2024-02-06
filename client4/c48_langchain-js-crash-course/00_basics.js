    import { config } from "dotenv"; config();
 
// import { Configuration, OpenAIApi } from "openai";           //#.(40120.03.1)
   import {                OpenAI    } from "openai";           // .(40120.03.1 RAM New Class name for OpenAI)
// import {                OpenAI    } from "@langchain/openai";   // .(40120.03.1 RAM New Class name for OpenAI)

//const configuration = new Configuration(                      //#.(40120.04.1 RAM Not part of openai mondule v4.26)
//       { apiKey: process.env.OPENAI_API_KEY                   //#.(40120.04.2) 
//         } );                                                 //#.(40120.04.3)
//const configuration = {                                       //#.(40120.04.1 RAM Create a new configuration object).(40130.05.1 RAM It doesn work either) 
//        apiKey: process.env.OPENAI_API_KEY                    //#.(40120.04.2).(40130.05.1)  
//        }                                                     //#.(40120.04.3).(40130.05.1)   
                  
//const openai = new OpenAIApi( configuration );                //#.(40120.03.2)   
//const openai = new OpenAI( configuration );                   //#.(40120.04.4).(40130.05.1) 
  const openai = new OpenAI( process.env.OPENAI_API_KEY );      // .(40130.05.1 RAM Try it without a configuration object ) 

// -----------------------------------------------------

async function chat( input ) {

  const messages = [ { role: "user", content: input } ];

//const response = await openai.createChatCompletion( {         //#.(40120.04.5 RAM Not part of new openai object)
//const response = await openai.createCompletion( {             //#.(40120.04.5 RAM New syntax).(40130.06.1 RAM Beg createCompletion doesn't work either) 
//        model      : "gpt-3.5-turbo",
//        prompt     :  messages,                               // .(40120.04.6 RAM Change messages: to prompt:) 
//        temperature:  0 
//        } );                                                  //#.(40130.06.1 RAM End)

  const response = await openai.chat.completions.create( {   // .(40120.04.7 RAM New syntax)
//        model   : "gpt-4",                                    //#.(40130.08.1 RAM OpenAI docs are wrong) 
          model   : "gpt-3.5-turbo",                            // .(40130.08.1) 
          messages: messages,                                   // .(40120.04.8 RAM Bard was wrong, perhaps)
          temperature:  0 
          } )
//const response = await openai.chat.completions.create(        //#.(40120.04.7 RAM VSCode says it shouild be like this)
//                                                              //#    { body: ChatCompletionCreateParamsNonStreaming, ... } )
/*const stream   = await openai.chat.completions.create( {      //#.(40130.07.1 RAM Beg Use streaming)
          model   : "gpt-4",
          messages: messages,                                  
          stream  : true,
          });
      let result = "";
      for await (const chunk of stream) {
//        process.stdout.write(chunk.choices[0]?.delta?.content || "");
          result += chunk.choices[0]?.delta?.content || "";
          }                                                     //#.(40130.07.1 RAM End) 
*/    
// return response.data.choices[0].message.content;             //#.(40130.04.8 RAM Old version syntax)        
   return response.choices[0]?.message?.content;                // .(40130.04.8 RAM Bard and OpenAI docs are wrong)    
          } // eof chat
// -----------------------------------------------------

  const question = "What is the capital of France";
                                                               // .(40129.01.1 RAM Beg Add console.log message) 
        console.log( `\nchat[1] question: ${question} \n-----------------------------------------------------------`)

        chat( question )                                      
          .then(  ( response ) => console.log( response ) )   //#.(40129.01.2)
          .catch( ( error    ) => console.error( error  ) );  //#.(40129.01.3)  

        chat( question )           
          .then(  ( response ) => {                           // .(40129.01.2 RAM Beg Add console.log message) 
            console.log( `\nchat[2] response: \n-----------------------------------------------------------`)
            console.dir( response, { depth: 99 } )            // .(40129.01.2 RAM End)
            } ) 
          .catch( ( error    ) => {                           // .(40129.01.3 RAM Beg Add console.log message) 
            console.log( `\nchat[3] error: \n-----------------------------------------------------------`)
            console.log(  `${error.response.status}: ${error.response.statusText}`  ) 
            console.dir( error.config, { depth: 99 } )        
            process.exit()                                    // .(40129.01.3 RAM End)
            } );
 
  const promptTemplate = `
        Be very funny when answering questions
        Question: {question}
        `;

  const prompt = promptTemplate.replace( "{question}", question );
                                                              // .(40129.01.4 RAM Beg Add console.log message) 
        console.log( `\nchat[3] question: ${question} \n-----------------------------------------------------------`)

        chat( prompt )           
          .then(  ( response ) => {                           // .(40129.01.5 RAM Beg Add console.log message) 
            console.log( `\nchat[4] response: \n-----------------------------------------------------------`)
            console.dir( response, { depth: 99 } )            // .(40129.01.5 RAM End)
            } ) 
          .catch( ( error    ) => {                           // .(40129.01.6 RAM Beg Add console.log message) 
            console.log( `\nchat[4] error: \n-----------------------------------------------------------`)
            console.log(  `${error.response.status}: ${error.response.statusText}`  ) 
            console.dir( error.config, { depth: 99 } )
            process.exit()                                    // .(40129.01.6 RAM End)
            } );
                                                               

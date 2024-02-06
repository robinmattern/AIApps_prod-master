  import { config } from "dotenv"; config();

  import { Configuration, OpenAI } from "openai";

  const configuration = new Configuration( {
          apiKey: process.env.OPENAI_API_KEY,
          } );
  const openai = new OpenAI( configuration );

  //------ ----------------------------------------------------------

  async function chat(input) {
  const messages = [{ role: "user", content: input }];

  const response = await openai.createChatCompletion(
           {  model: "gpt-3.5-turbo"
           ,  messages: messages
           , temperature: 0
             } );

 return response.data.choices[0].message.content;
        }
//------ ----------------------------------------------------------

  const question = "What is the capital of France";
                                                              // .(40129.01.1 RAM Beg Add console.log message) 
        console.log( `\nchat[1] question: ${question} \n-----------------------------------------------------------`)

//      chat( question )                                      //#.(40129.01.2)   
//        .then(  ( response ) => console.log( response ) )   //#.(40129.01.2)
//        .catch( ( error    ) => console.error( error  ) );  //#.(40129.01.3)  

        chat( question )           
          .then(  ( response ) => {                           // .(40129.01.2 RAM Beg Add console.log message) 
            console.log( `\nchat[2] response: \n-----------------------------------------------------------`)
            console.dir( response, { depth: 99 } )            // .(40129.01.2 RAM End)
            } ) 
          .catch( ( error    ) => {                           // .(40129.01.3 RAM Beg Add console.log message) 
            console.log( `\nchat[3] error: \n-----------------------------------------------------------`)
            console.log(  `${error.response.status}: ${error.response.statusText}` ) 
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

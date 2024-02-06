  import { config } from "dotenv"; config();

  import { OpenAI         } from "@langchain/openai"        // .(40130.01.1 RAM: was: "langchain/llms/openai")
  import { PromptTemplate } from "@langchain/core/prompts"  // .(40130.01.2 RAM: was: "langchain/prompts")

//import { SimpleSequentialChain, LLMChain } from "langchain/chains";
  import { SequentialChain                 } from "langchain/chains";  // Import SequentialChain
  import {                        LLMChain } from "langchain/chains";


  const llm = new OpenAI( { temperature: 0 } );

  const responseTemplate1 = `
        You are a helpful bot that creates a 'thank you' response text.
        If customers are unsatisfied, offer them a real world assistant to talk to.
        You will get a sentiment and subject as input and evaluate.

        text: {input}
        `;

  const responseTemplate2 = `
        You are an assistant bot. Your job is to make the customer feel heard and understood.
        Reflect on the input you receive.
        
        text: {input}
        `;

//const promptTemplate = new PromptTemplate(`Q: What is the meaning of life?`);
  const reviewPromptTemplate1 = new PromptTemplate(
         { template: responseTemplate1
         , inputVariables: ["input"],
           } );

  const reviewPromptTemplate2 = new PromptTemplate(
         { template: responseTemplate2
         , inputVariables: ["input"]
           } );

  const reviewChain1   =  new LLMChain({ llm, prompt: reviewPromptTemplate1 });
  const reviewChain2   =  new LLMChain({ llm, prompt: reviewPromptTemplate2 });

//const overallChain = new SimpleSequentialChain(
//       { chains: [ reviewChain1, reviewChain2 ]
//       , verbose: true,
//         } );
//const result = await overallChain.run(
//       { input: "I ordered Pizza Salami and it was awful!",
//         } );
  try {
  const question = "I ordered Pizza Salami and it was awful!" ;

        console.log( `\nsimplesequentialchain[1] question: ${question}: \n-----------------------------------------------------------`)

  // Execute the chains sequentially:
  const result = await executeSequentially( 
           [ reviewChain1, reviewChain2  ]
         , { input: question } 
           );

        console.log( `\nsimplesequentialchain[2] answer:\n-----------------------------------------------------------`)       
        console.log( result.text.replace( /^\n+/, "" ) );
  } catch( error ) {
        console.log(  `\nsimplesequentialchain[3] error: \n-----------------------------------------------------------`)
    if (error.message) {
        console.log( error.message ) 
    } else { 
        console.log( `${error.response.status}: ${error.response.statusText}` )
        console.error( error.config  ) 
        }      
     } // eoe  await executeSequentially

     process.exit() 
     
// Create a function to execute chains sequentially:
  async function executeSequentially( chains, input ) {               // .(40130.10.1 Bard Beg Added function) 
    let currentInput = input; var result, nChain=0                    // .(40130.10.2 RAM Initialize var result var here)
   for (var chain of chains) { nChain++
                                                                      // .(40130.11.1 RAM Add input log record )
//      console.log( `\nexecuteSequentially[1] ${nChain}. currentInput: ${currentInput.input}\n-----------------------------------------------------------`)       
        console.log( `\nexecuteSequentially[1] ${nChain}. currentInput: ${currentInput.input}`)       

//      const result = await chain.call( { input: currentInput } );   //#.(40130.10.2 Bard defined var result locally in loop block)
          var result = await chain.call( { input: currentInput } );   // .(40130.10.2 RAM update global var result) 
                                                                      // .(40130.11.2 RAM Add result log record )
        console.log(  `executeSequentially[2] ${nChain}. result.text:\n-----------------------------------------------------------`)       
        console.log( result.text.replace( /^\n+/, "" ) );             // .(40130.11.3)

//      currentInput = result.text;                                   // Use the output of one chain as input for the next
        currentInput = { input: result.text.replace( /^[ \n]+/, "" ) }    // Use the output of one chain as input for the next
        }
 return result;  // Return the final result                           // .(40130.10.2 RAM Now has a value )
        }                                                             // .(41030.10.1 Bard End)




  import { config } from "dotenv"; config();

  import { OpenAI         } from "@langchain/openai"        // .(40130.01.1 RAM: was: "langchain/llms/openai")
  import { PromptTemplate } from "@langchain/core/prompts"  // .(40130.01.2 RAM: was: "langchain/prompts")
//import { SimpleSequentialChain, LLMChain } from "langchain/chains";
  import {                        LLMChain } from "langchain/chains";
  import { SequentialChain                 } from "langchain/chains";  // Import SequentialChain

  const llm = new OpenAI( { temperature: 0 } );

  try { 
  const question       = "What is the meaning of life?" 
        console.log(  `\nsimple-chain[1] question: ${question}: \n-----------------------------------------------------------`)

//const openai         =  new OpenAI("sk-YOUR_API_KEY");
  const promptTemplate =  new PromptTemplate(`Q: ${question}`);
  const chain          =  new LLMChain( { llm: openai, prompt: promptTemplate  } );
  const response       =  await chain.call();  // not chain.run

        console.log( `\nsimple-chain[2] answer:\n-----------------------------------------------------------`)
        console.log( response.text );   // Output: The meaning of life is a philosophical question that has been pondered...

      } catch (error ) {
        console.log(  `\nsimple-chain[3] error: \n-----------------------------------------------------------`)
    if (error.message) {
        console.log( error.message ) 
    } else { 
        console.log( `${error.response.status}: ${error.response.statusText}` )
        console.error( error.config  ) 
        }
//      process.exit()
        }          
        process.exit() 



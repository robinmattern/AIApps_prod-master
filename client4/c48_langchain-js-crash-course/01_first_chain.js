  import { config } from "dotenv"; config();

  import { OpenAI         } from "@langchain/openai"        // .(40130.01.1 RAM: was: "langchain/llms/openai")
  import { PromptTemplate } from "@langchain/core/prompts"  // .(40130.01.2 RAM: was: "langchain/prompts")
  import { LLMChain       } from "langchain/chains";

  const model     =  new OpenAI( { temperature: 0 } );
  const template  = "Be very funny when answering questions\n Question: {question}";
  const prompt    =  new PromptTemplate({ template, inputVariables: ["question"] });

//  const chainCFG  = {
//        llm: new OpenAI({ model: "davinci-002" }),
//        prompt,
//        };
// const chainCFG  = { llm: model, prompt } 

  const chain = new LLMChain( { llm: model, prompt } );
//const chain = new LLMChain( chainCFG );

//const question = "What is the capital of France";
  const question = "What is the capital of England";

  try { 
        console.log( `\nfirst-chain[1]  question: ${question}: \n-----------------------------------------------------------`)

    const result = await chain.call( { "question": question } );

    console.log( `\nfirst-chain[2] answer:\n-----------------------------------------------------------`)
    console.log( result.text.replace( /^\n+/, "" ) );

    } catch (error ) {
        console.log(  `\nfirst-chain[3] error: \n-----------------------------------------------------------`)
        console.log(  `${error.response.status}: ${error.response.statusText}`  ) 
        console.error( error.config  ) 
        process.exit()
        }  

//      console.log( typeof( result ) != 'undefined' ? result.text : "\n * No {result} returned");


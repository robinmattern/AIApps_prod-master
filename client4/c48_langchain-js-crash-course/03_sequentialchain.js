  import { config } from "dotenv"; config();

  import { OpenAI         } from "@langchain/openai"        // .(40130.01.1 RAM: was: "langchain/llms/openai")
  import { PromptTemplate } from "@langchain/core/prompts"  // .(40130.01.2 RAM: was: "langchain/prompts")
//import { SequentialChain, LLMChain } from "langchain/chains";
  import {                  LLMChain } from "langchain/chains";

  const llm = new OpenAI({ temperature: 0 });

  // ------------------------------------------------------------------------------------------------
      var pInputVariables =       
           { dish_name:  "Pizza Salami"
           , experience: "It was awful!"
             };

  let aPrompt  = `You ordered ${pInputVariables.dish_name} and your experience was ${pInputVariables.experience}. Write a review: `;
 /* 
  let template = "You ordered {dish_name} and your experience was {experience}. Write a review: ";
    let promptTemplate = new PromptTemplate( 
         { template
         , inputVariables: [ "dish_name", "experience" ],
           });
*/           
  const reviewChain = new LLMChain( 
         { llm
         , prompt:     aPrompt // promptTemplate
         , outputKey: "review"
           });
// ------------------------------------------------------------------------------------------------

  var template = "Given the restaurant review: {review}, write a follow-up comment: ";
   var promptTemplate = new PromptTemplate(
         { template
         , inputVariables: [ "review" ]
           } );
  var commentChain = new LLMChain( 
         { llm
         , prompt:     promptTemplate
         , outputKey: "comment"
           } );
// ------------------------------------------------------------------------------------------------

   var template = "Summarise the review in one short sentence: \n\n {review}";
   var promptTemplate = new PromptTemplate(
         { template
         , inputVariables: [ "review" ],
           } );
  var summaryChain = new LLMChain(
         { llm
         , prompt:     promptTemplate
         , outputKey: "summary"
           } );
// ------------------------------------------------------------------------------------------------

        template = "Translate the summary to german: \n\n {summary}";
        promptTemplate = new PromptTemplate(
         { template
         , inputVariables: [ "summary" ]
           } );
  var translationChain = new LLMChain(
         { llm
         , prompt:      promptTemplate
         , outputKey: "german_translation"
           } );
// ------------------------------------------------------------------------------------------------

    var InputVariables =       
         { dish_name:  "Pizza Salami"
         , experience: "It was awful!"
           };
    var aFirstInput = setTemplate( reviewChain.prompt, InputVariables )            

//const overallChain = new SequentialChain(
  var results = await executeSequentially(
           [ reviewChain, commentChain, summaryChain, translationChain ]
         , { dish_name: "Pizza Salami", experience: "awful" }
         , outputVariables
           ); 
    var result = executeSequentially(
         { chains:          [  reviewChain, commentChain, summaryChain, translationChain ]
//       , inputVariables:  [ "dish_name", "experience" ]
         , inputVariables:     InputVariables
//       , inputTemplate:   { template: aFirstInput }
         , outputVariables: [ "review", "comment", "summary", "german_translation"]
           } );
  
/*  var result = await overallChain.call(
         { dish_name:  "Pizza Salami"
         , experience: "It was awful!"
           } ); */
// ------------------------------------------------------------------------------------------------

        console.log( result );

// ------------------------------------------------------------------------------------------------

  async function executeSequentially( args ) {
    let chains = args.chains
    let input  = args.inputVariables
//  let input  = args.inputTemplate.template
    let output = args.outputVariables 

    let currentInput = input;
    let results = {};

   for (let i = 0; i < chains.length; i++) {
  var chain  = chains[i];
  var result = await chain.call( { input: currentInput } );
        currentInput = result.text;

    //  Store the output in the results object using the specified output variable name
        results[ output[i] ] = result.text;
        }

 return results;
    }
// ------------------------------------------------------------------------------------------------

function setTemplate(args, inputValues) {
     var aTemplate  = args.template 
     var mInputKeys = args.inputVariables
     var pInputVals = inputValues
   for (let i = 0; i < mInputKeys.length; i++) {
        aTemplate = aTemplate.replace( `{${mInputKeys[i]}}`, pInputVals[mInputKeys[i]] )
        }
 return aTemplate
        }
   
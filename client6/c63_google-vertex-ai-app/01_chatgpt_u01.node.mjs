
// nst { VertexAI } =  require( '@google-cloud/vertexai' );
import { VertexAI }    from     '@google-cloud/vertexai';

// Initialize Vertex with your Cloud project and location
// ---------------------------------------------------------------------
  const vertex_ai  =  new VertexAI( { project: 'aiapps-dev01-suzee-c63b', location: 'us-central1' } );
  const model      = 'gemini-pro-vision';

// Instantiate the models
// ---------------------------------------------------------------------
  const generativeModel = vertex_ai.preview.getGenerativeModel(
         { model                 : model
         , generation_config:
            { "max_output_tokens": 2048
            , "temperature"      :  0.4
            , "top_p"            :    1
            , "top_k"            :   32
               }
         , safety_settings:
            [ { "category": "HARM_CATEGORY_HATE_SPEECH",       "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
            , { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
            , { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
            , { "category": "HARM_CATEGORY_HARASSMENT",        "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
                 ],
            } );

// ---------------------------------------------------------------------

async function generateContent() {

  const req = {
    contents: [ { role:  'user'
                , parts: [ { text: "What model is this prompt being answered with?�Bard was your ChatCPT service.�It is now named Gemini, but that is also a brand name for many services.\nWhat is the�name of LLM that you are using?\nHow do I save this prompt?�When I click on the left arrow next to the name of this prompt, it asks me if I want to save it?\nSorry, but there is no Save option on that menu.�And there is no Saved Prompts tab on the left sidebar.\nSomehow a right sidebar has just appeared and it has a Save button and it says that the Model name is Gemini 1.0 Pro Vision."}]
                } ],
        };

  const streamingResp = await generativeModel.generateContentStream( req );

//  for await (const item of streamingResp.stream) {
//      process.stdout.write( 'stream chunk: ' + JSON.stringify( item ) );
//      }

    var pResponse = await streamingResp.response

        console.log( `\n  Response:\n----------------------\n${pResponse.candidates[0].content.parts[0].text}` )
        console.log( "\n  pResponse.object:\n----------------------------" )
        console.dir(  pResponse, { depth: 99 } )
        console.log( "" )
        };
// ---------------------------------------------------------------------

        generateContent();


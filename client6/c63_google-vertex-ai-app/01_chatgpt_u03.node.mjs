import fs from 'fs' 
import { VertexAI } from '@google-cloud/vertexai';

// Read pCredentials from ADC file and/or set environment variable
//const aCredentialsPath = '/C/Users/Robin/AppData/Roaming/gcloud/application_default_credentials.json'
  const aCredentialsPath = 'C:\\Users\\Robin\\AppData\\Roaming\\gcloud\\application_default_credentials.json'
  const pCredentials = JSON.parse( fs.readFileSync( aCredentialsPath ) );
//rocess.env.GOOGLE_APPLICATION_CREDENTIALS = aCredentialsPath;

//Initialize Vertex with your Cloud project and location
//---------------------------------------------------------------------

  const vertex_ai  =  new VertexAI( { project: 'aiapps-dev01-suzee-c63b', location: 'us-central1' } );
  const model      = 'gemini-pro-vision';

//Instantiate the models
//---------------------------------------------------------------------

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

//---------------------------------------------------------------------

async function generateContent() {

  const pRequest = {
    contents: [
      { role:  'user'
      , parts: [ { text: "What model is this prompt being answered with?" } ]
        } ],
      };

    var streamingResp =  await generativeModel.generateContentStream( pRequest );

    var pResponse     =  await streamingResp.response

//      console.dir(     pResponse.candidates[0], { depth: 99 } )
    var aResponse     =  pResponse.candidates[0].content.parts[0].text
        console.log(  `  Response:\n--------------------------------\n${aResponse}` )
        };
//---------------------------------------------------------------------

        generateContent( );


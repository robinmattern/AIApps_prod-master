// 1. Initialize a new project with: npm init -y, and create an 4 js files .env file 
// 2. npm i "@pinecone-database/pinecone@^0.0.10" dotenv@^16.0.3 langchain@^0.0.73
// 3. Obtain API key from OpenAI (https://platform.openai.com/account/api-keys)
// 4. Obtain API key from Pinecone (https://app.pinecone.io/)
//    4a. get API_KEY 
//    4b. 
// 5. Enter API keys in .env file
// Optional: if you want to use other file loaders (https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/)

import { PineconeClient      } from "@pinecone-database/pinecone";
import { DirectoryLoader     } from "langchain/document_loaders/fs/directory";
import { TextLoader          } from "langchain/document_loaders/fs/text";
import { PDFLoader           } from "langchain/document_loaders/fs/pdf";

import { createPineconeIndex } from "./1-createPineconeIndex.js";
import { updatePinecone      } from "./2-updatePinecone.js";
import { queryPineconeVectorStoreAndQueryLLM } from "./3-queryPineconeAndQueryGPT.js";

// 6. Load environment variables
import * as dotenv             from "dotenv";
         dotenv.config();

               start() 
async function start() { 

// 7. Set up DirectoryLoader to load documents from the ./documents directory

//      console.log( "import.meta.url:", import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ) ) 
  var __dirname = import.meta.url.replace( import.meta.url.replace( /.+\//, "/" ), "" ).replace( /file:\/\//, "" ) // .replace( /:/, "" )
   var  aAppDir = __dirname.replace(/\/E:/, "") 

try {
        console.log('[0.1] loading documents from: ' + `${aAppDir}/documents` ); 

 const  loader  =  new DirectoryLoader( `${aAppDir}/documents`, 
         { ".txt": (path) => new TextLoader(path)
//       , ".pdf": (path) => new PDFLoader(path)
              } );
   var  docs = await loader.load();

// var  aFile   = `${aAppDir}/documents/Romeo and Juliet.txt`
//      console.log( "aFile: ", aFile )
//onst  textLoader = new TextLoader( aFile );              
//      console.log('Before loading documents. Loader:'); console.dir( loader, {depth: 99} );
//  var  docs = await textLoader.load();
//      console.log('After loading documents');              


// 8. Set up variables for the filename, question, and index settings
 const  question  = "Who is mr Gatsby?";
 const  indexName = "pinecone-index-01";
 const  vectorDimension = 1536;

// 9. Initialize Pinecone client with API key and environment
const client    =  new PineconeClient();
await client.init( 
       {  apiKey:      process.env.PINECONE_API_KEY
       ,  environment: process.env.PINECONE_ENVIRONMENT
          } );


//10. Run the main async function
//  ( async              () => {
//                   run( client, indexName, vectorDimension )  
//    async function run( client, indexName, vectorDimension ) {

//11. Check if Pinecone index exists and create if necessary
      await  createPineconeIndex( client, indexName, vectorDimension );

//12. Update Pinecone vector store with document embeddings
      await  updatePinecone( client, indexName, docs );

//13. Query Pinecone vector store and GPT model for an answer
      await  queryPineconeVectorStoreAndQueryLLM( client, indexName, question );

//    } // eof run 
//    } )( );

} catch (error) {
      console.error("[0.9] An error occurred:"); console.dir( error, { depth: 99} )
      process.exit() 
      }

  } // eof start 




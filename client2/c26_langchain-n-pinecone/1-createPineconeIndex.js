import { PineconeClient      } from "@pinecone-database/pinecone";
import * as dotenv             from "dotenv";

    const bTest = true 
      if (bTest) {
          dotenv.config();
    const indexName = "pinecone-index-01";
    const vectorDimension = 1536;
    const client    =  new PineconeClient();

    await client.init( 
           {  apiKey: process.env.PINECONE_API_KEY
           ,  environment: process.env.PINECONE_ENVIRONMENT
              } );

       createPineconeIndex ( client, indexName, vectorDimension)
       } 

async function createPineconeIndex ( client, indexName, vectorDimension) {

// 1. Initiate index existence check
      console.log( `Checking "${indexName}"...` );

// 2. Get list of existing indexes
      const existingIndexes = await client.listIndexes();

// 3. If index doesn't exist, create it
  if (!existingIndexes.includes( indexName )) {

      try { 
// 4. Log index creation initiation
      console.log(`\n[1.1] Creating "${indexName}"...`);

// 5. Create index
      const createClient = await client.createIndex( {
        createRequest: 
         {  name:      indexName         // pinecone-index-01
         ,  dimension: vectorDimension   // 1536
         ,  metric:   "cosine"
            }
      } );

// 6. Log successful creation
      console.log( `[1.2] Created with client:`, createClient );

// 7. Wait 60 seconds for index initialization
      await new Promise( ( resolve ) => setTimeout( resolve, 60000 ));

} catch (error) {
      console.error("[1.3] An error occurred:"); console.dir( error, { depth: 99} )
      process.exit() 
      }    

  } else {

// 8. Log if index already exists
      console.log( `[1.4] "${indexName}" already exists.` );
    }

};
// --------------------------------------------------------

export { createPineconeIndex } 

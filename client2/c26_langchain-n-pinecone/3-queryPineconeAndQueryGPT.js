// 1. Import required modules
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";

// 2. Export the queryPineconeVectorStoreAndQueryLLM function
export const queryPineconeVectorStoreAndQueryLLM = async (
  client,
  indexName,
  question
) => {

try {
  // 3. Start query process
    console.log("\n[3.1] Querying Pinecone vector store...");

// 4. Retrieve the Pinecone index
  const index = client.Index(indexName);

// 5. Create query embedding
  const queryEmbedding = await new OpenAIEmbeddings().embedQuery(question);

  // 6. Query Pinecone index and return top 10 matches
  let queryResponse = await index.query({
    queryRequest: {
      topK: 10,
      vector: queryEmbedding,
      includeMetadata: true,
      includeValues: true,
    },
  });

  // 7. Log the number of matches 
  console.log(`[3.2] Found ${queryResponse.matches.length} matches...`);

  // 8. Log the question being asked
  console.log(`[3.3] Asking question: ${question}...`);
  if (queryResponse.matches.length) {

// 9. Create an OpenAI instance and load the QAStuffChain
    const llm = new OpenAI({});
    const chain = loadQAStuffChain(llm);

//10. Extract and concatenate page content from matched documents
    const concatenatedPageContent = queryResponse.matches
      .map((match) => match.metadata.pageContent)
      .join(" ");

//11. Execute the chain with input documents and question
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: question,
    });

// 12. Log the answer
    console.log(`[3.4] Answer: ${result.text}`);

  } else {

// 13. Log that there are no matches, so GPT-3 will not be queried
    console.log("[3.5] Since there are no matches, GPT-3 will not be queried.");
  }

} catch (error) {
  console.error("[3.6] An error occurred:"); console.dir( error, { depth: 99} )
  process.exit() 
  }  

};

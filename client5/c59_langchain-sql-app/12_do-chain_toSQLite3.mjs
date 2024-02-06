
import { SqlDatabase } from "langchain/sql_db";
import { DataSource  } from "typeorm";
import { ChatOpenAI  } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";

const datasource = new DataSource({
  type: "sqlite",
  database: "./assets/chinook.db",
  });

const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
  });
const llm = new ChatOpenAI( { temperature: 0 } );
// const llm = new ChatOpenAI( { modelName: "gpt-3.5-turbo", temperature: 0 } );  // .(40202.01. RAM Was gpt-4)

const chain = await createSqlQueryChain({
  llm,
  db,
  dialect: "sqlite",
  });

//  const result = await chain.run("How many tracks are there?");
// *TypeError: chain.run is not a function

//  const result = await chain.invoke( "How many tracks are there?" )
// *TypeError: Cannot use 'in' operator to search for 'question' in How many tracks are there?

    const result = await chain.invoke( { question: "How many tracks are there?" } )

    console.log( "result:", result )
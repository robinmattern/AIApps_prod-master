// 11.3 Import three modules
//----------------------------------------------------------
//mport addComments        from './01_db_u02-module.mjs'
 import doComments         from './01_db_u05-module.mjs'                  // .(40204.07.11 RAM New module)
 import getComments        from './02_cm_u03-getComments.mjs'
 import updComments        from './03_ai_u03-updComments.mjs'             // .(40204.10.3 RAM New module)

// 11.9 Insert Youtube comments into database
//----------------------------------------------------------
function Help() {                                                         // .(40217.11.9 RAM Beg Added)
        console.log( "" )
        console.log( "  Syntax:   node index.mjs {aCmd}")
        console.log( "    aCmd    Command" )
        console.log( "    ------  --------------------------------------" )
        console.log( "    testDB  Test Access to MySQL DB" )
        console.log( "    testAI  Test OpenAI model with simple prompt" )
        console.log( "    google  Get comments from Google YouTube API" )
        console.log( "    insert  Insert comments into database from Google YouTube API" )
        console.log( "    update  Add comments after running OpenAI model" )
        console.log( "    select  Select comments with respond = 1" )
        console.log( "    doemall Run get, insert and update commands" )
        }                                                                 // .(40217.11.9 RAM End)
//----------------------------------------------------------

    var TheDB    = 'DB1'

    var TheCount =  20            // .(40206.04.6 RAM Add TheCount)

    var TheModel = 'davinci-002'  // .(40205.13.1 RAM Add most expensive model)
//  var TheModel = 'curie-001'    // .(40205.13.1
//  var TheModel = 'ada'          // .(40205.13.1 RAM Add least expensive model)

//  var aTests = "select"         // ?? 
//  var aTests = "google"         // Gets the Google YouTube comments
//  var aTests = "insert"         // Gets the Google Data and stores it in the database
//  var aTests = "insert,update,show"
//  var aTests = "update,show"    // Runs the AI Model for each comments and updates the database
//  var aTests = "doemall"
//  var aTests = "test"
    var bRun   =  0

//      console.log(`process.argv[2]: ${process.argv[2]}`); process.exit()
    var aTests = (process.argv[2] ? process.argv[2] : aTests)
    var aTests = (typeof aTests) != 'undefined' ? aTests : ''

// 09.2 Get and add comments to database
//----------------------------------------------------------
/*
    var mComments = await getComments()
                    await addComments( mComments )          //#.(40204.07.8 RAM)
                    await doComments( 'insert', mComments ) // .(40204.07.8 RAM New syntax)
*/
// 11.11 Test access to MySQL database
//----------------------------------------------------------
    if (aTests.match( /testDB/ )) { bRun = 1                // .(40205.11.11 RAM Add testDB option)
                    await doComments( 'connect', TheDB )    // .(40204.07.13 RAM Use new connect option)
        } // eif testDB

// 11.5 Test running OpenAI API model
//----------------------------------------------------------
    if (aTests.match( /testAI/ )) { bRun = 1                // .(40205.11.4 RAM New test option)
                          console.log( "" )
//                  await doComments( 'connect', TheDB )    // .(40204.07.13 RAM Use new connect option)
                    await updComments( 'test', TheModel)    // .(40205.11.5 RAM Test OpenAI API)
    } // eif testAI

// 11.10 Get YouTube Comments using Google API 
//----------------------------------------------------------
    if (aTests.match( /google/ )) { bRun = 1                // .(40217.11.10 RAM Beg Add google command)
    var mComments = await getComments( TheCount )               
        } // eif google                                     // .(40217.11.10 RAM End)

// 11.4 Insert Youtube comments into database
//----------------------------------------------------------
    if (aTests.match( /insert/ )) { bRun = 1                // .(40205.11.4 RAM New insert option)
    var mComments = await getComments( TheCount )           // .(40206.04.7 RAM Add TheCount)
//                  console.log( `Retreived ${mComments.length} comments from the Google YouTube API`)
                    await doComments( 'connect', TheDB )    // .(40204.07.13 RAM Use new connect option)
                    await doComments( 'delete'  )           // .(40204.07.14 RAM New delete option)
                    await doComments( 'insert', mComments )
        } // eif insert

// 11.6 Get and store results of running OpenAI model on mComments to database
//----------------------------------------------------------
    if (aTests.match( /update/ )) { bRun = 1                // .(40205.11.6 RAM Run update optione)
                    await doComments( 'connect', TheDB )    // .(40204.07.13 RAM Use new connect option)
//  var mComments = await getComments()
    var mComments = await doComments( 'select' )
//                  console.log( `Retreived ${mComments.length} comments from the Google YouTube API`)
//                  await doComments( 'lengths', mComments) // .(40204.07.4 RAM New syntax)
//                  process.exit()
//                  await doComments( 'delete'  )           // .(40204.07.14 RAM New delete option)
//                  await doComments( 'insert', mComments ) // .(40204.07.8 RAM New syntax)
                    await updComments( 'all', TheModel )    // .(40205.13.2 RAM Add TheModel).(40204.10.4 RAM New AI method)
    } // eif update

// 11.7 Show Comments with Respond = 1
//----------------------------------------------------------
    if (aTests.match( /show|select/ )) { bRun = 1
//                  await doComments( 'connect', aDB )      //#.(40204.07.13 RAM Use new connect option)
                    await doComments( 'connect', TheDB )    // .(40204.07.13 RAM Use TheDB)
    var mComments = await doComments( 'select', 'respond = 1' ) // .(40204.07.15 RAM New syntax)
                    console.log( "Commenter            Comment" )
                    console.log( "-------------------- --------------------------------------------------" )
    if (mComments.length > 0) {
        mComments.map( ( pComment, i ) => {
                    console.log( i+1, pComment.commenter.padEnd(25), pComment.comment.substr( 1, 50 ) + "..." )
          } ) // eol mComments
      } else {
                   console.log( "no comments with response = 1" )
        } // eif no mComments
      } // eif show

// 11.9 Run doEmAll script
//----------------------------------------------------------
    if (aTests.match( /doemall/ )) { bRun = 1
        console.log( `\n Run:\n # node '04_ai_u01-doEmAll.mjs'\n` )        
        } // eif doemall

// 11.8 Invalid aTests cmd
//----------------------------------------------------------
    if (bRun == 0) { Help() }                               // .(40217.11.9 RAM )

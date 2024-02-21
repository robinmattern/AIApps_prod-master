// 06.4 Import two modules
//----------------------------------------------------------
//mport addComments  from './01_db_v07-addComments.mjs'
 import doComments   from './01_db_u05-module.mjs'          // .(40204.07.11 RAM New module)
 import getComments  from './02_cm_u03-getComments.mjs'
 import updComments  from './03_ai_u03-updComments.mjs'     // .(40204.10.3 RAM New module)

    var nCount    =  process.argv[2] ? process.argv[2] : 5  // .(40221.01.1 RAM get nCount from command arg)

// 06.5 Get and add comments to database
//----------------------------------------------------------
    var mComments =  await getComments( nCount )            // .(40221.01.2 RAM Use nCount)
  await doComments( 'connect' )                             // .(40204.07.13 RAM Use new connect option)
  await doComments( 'delete'  )                             // .(40204.07.14 RAM New delete option)
  await doComments( 'insert', mComments )

// 11.6 Get and store results of running OpenAI model on mComments to database
//----------------------------------------------------------
  await updComments('all', 'davinci-002' )                  // .(40204.10.4 RAM New AI method)


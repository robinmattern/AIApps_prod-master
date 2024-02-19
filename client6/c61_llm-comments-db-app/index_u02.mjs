// 06.4 Import two modules
//----------------------------------------------------------
//mport addComments  from './01_db_v07-addComments.mjs'
 import doComments   from './01_db_u05-module.mjs'         // .(40204.07.11 RAM New module)
 import getComments  from './02_comments_u03-module.mjs'
 import updComments  from './03_ai_u03-module.mjs'         // .(40204.10.3 RAM New module)

// 06.5 Get and add comments to database
//----------------------------------------------------------
    var mComments =  await getComments( 5 )
  await doComments( 'connect' )                             // .(40204.07.13 RAM Use new connect option)
  await doComments( 'delete'  )                             // .(40204.07.14 RAM New delete option)
  await doComments( 'insert', mComments )

// 11.6 Get and store results of running OpenAI model on mComments to database
//----------------------------------------------------------
  await doComments( 'connect' )                             // .(40204.07.13 RAM Use new connect option)
//  var mComments =  await doComments( 'select' )
  await updComments('all', 'davinci-002' )                  // .(40204.10.4 RAM New AI method)

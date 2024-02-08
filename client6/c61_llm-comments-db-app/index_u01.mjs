// 06.4 Import two modules
//----------------------------------------------------------
 import   addComments   from './01_db_u02-addComments.mjs'
 import   getComments   from './02_comments_u03-module.mjs'

// 06.5 Get and add comments to database
//----------------------------------------------------------
    var mComments = await getComments( 20 )
  await addComments( mComments )
/*
    mComments.map( ( pComment, i ) => {
          console.log( i, pComment.snippet.topLevelComment.snippet.textOriginal.length )  // max: 3365
        } )
*/

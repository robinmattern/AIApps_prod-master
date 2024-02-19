  import getAccessToken from './03_google-oauth_u01.mjs'; 

 async function getAlbumsList() {
        try {
  const accessToken = getAccessToken(); // Access token (replace with your actual token)
      
  const url      = 'https://photoslibrary.googleapis.com/v1/albums';  // API endpoint
  
  const headers  = {  // Authorization header
          Authorization: `Bearer ${accessToken}`,
          };
  
  const response =  await fetch( url, { headers } );  // Fetch albums data
  
   if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
        }
  
  const data     =  await response.json();
  
  const albums   =  data.albums;  // Process albums data
        console.log( '--- Albums ---' );
   for (const album of albums) {
        console.log( `ID: ${album.id}` );
        console.log( `Title: ${album.title}` );
        console.log( `Product URL: ${album.productUrl}` );
        console.log( `Cover Photo URL: ${album.coverPhotoBaseUrl}` );
        console.log( `Number of media items: ${album.mediaItemsCount }`);
        console.log( '---' );
        }
    
    if (data.nextPageToken) {   // Handle pagination if needed
        console.log('--- More albums available, use nextPageToken for pagination ---');
        }
    } catch (error) {
        console.error( error );
        }
    } // eof getAlbumsList
// --------------------------------------------------------------------------

        getAlbumsList();
  
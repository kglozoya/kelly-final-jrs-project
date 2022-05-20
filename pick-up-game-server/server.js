// fancy way to import stuff
const express = require( "express" );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

// using express
const app = express();
// configuration options to make things work "all fancy"
var corsOptions = {
    orgin: '*'
};

app.use( cors( corsOptions ) );
app.use( bodyParser.json() ); // has to go under where you have reference 'app'
app.use( bodyParser.urlencoded( { extended: true } ) );

/// Hooking up all the pieces of the api. Things get attached in this file
require( './app/index' );
require( './app/routes/games.routes.js' )( app );

// Tell the application to listen. Opening the server. Serving the server. "Serving it up"
const PORT = process.env.PORT || 8080
app.listen( 8080, () => {
    console.log( `Server is running on port ${PORT}` );
} )
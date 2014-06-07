
var express = require( 'express' );

var router = express.Router();

// ---------------------------------------------------------------------------------------------- //

router.get( '/', function( req, res, next ){
    // Select an image.
    // Pick a question for that image.
    // Display image and question to the user.
});

// ---------------------------------------------------------------------------------------------- //

router.post( '/answer/image/:image/question/:question', function( res, res, next ){
    // Save the response to the database.
    // Re-prioritize the question for the image.
    // Redirect the user to the viewer.
});

// ---------------------------------------------------------------------------------------------- //

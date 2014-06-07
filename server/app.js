
var express = require( 'express' );

var app = express();

// Any traffic to root is redirected to the image viewer module.
app.get( '/', function( req, res ){
    res.redirect( '/viewer' );
});

app.use( '/viewer', require( './routes/viewer' ) );

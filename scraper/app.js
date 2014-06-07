
var cheerio = require( 'cheerio' );
var config  = require( './config' );
var debug   = require( 'debug' )( 'scraper:app' );
var mysql   = require( 'mysql-promise' );
var q       = require( 'q' );
var request = require( 'q-request' );

// Connect to the database.
var db = mysql();
db.configure( config.database );

// TODO Pick the image ID to look at.

// Get the page from FA.
request.get({
    hostname    : 'www.furaffinity.net',
    path        : '/view/13650939/',
    headers     : {
        'Cookie' : 'a=7849b872-7013-48a4-9355-b72d79d7ebd5; b=04635c24-76ff-40df-b76e-95a29893b778'
    }
}).then(function( body ){
    // Extract all the information we need from the FA page.
    var $ = cheerio.load( body );

    // Get the image URL.
    var image = $( '#submissionImg' ).attr( 'src' );

    // Extract the metadata.
    var metadata = $( '#submission .maintable' )[ 0 ];
    metadata = $( metadata ).find( 'table table td.alt1[align=left]' )[ 0 ];
    metadata = $( metadata ).find( 'td:first-child' );
    metadata = metadata
            .text()
            .split( '\n' )
            .map(function( a ){ return a.trim(); })
            .filter(function(a){ return /:\s/.test( a ); })
            .map(function(a){ return a.split( /:\s/ ); })
            .reduce(function( a, b ){ return a[ b[ 0 ] ] = b[ 1 ], a; }, {})
    ;

    // Extract the artist
    metadata.Artist = $( $( 'a[href^="/user/"]:not(#my-username)' )[ 0 ] ).text();

    return {
        imageUrl    : 'http:' + image,
        metadata    : metadata
    };
}).then(function( data ){
    console.log( data );

    // Save the data to the database.

});

// Prioritize the questions for the image.

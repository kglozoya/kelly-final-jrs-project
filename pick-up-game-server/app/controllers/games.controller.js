const db = require( '../index' )


exports.getAllGames = ( req, res ) => {

    const query = `
    
    SELECT DISTINCT game.*, firstName, lastName, email,
	(SELECT COUNT(*) FROM rsvp
        WHERE rsvp.gameId = game.id) AS rosterCount
            FROM game
        INNER JOIN games.player
            ON game.gameCreator = player.id;
    `;

    db.query( query, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was a server error. Please try again later.',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'There are no posted games.',
                    error: err
                } )
        } else {
            res.send( {
                // returns an array of objects
                games: results
            } );
        }
    } );
}

exports.createNewGame = ( req, res ) => {

    let { sport, dateTime, skillLevel, address1, city, locationNote, gender, gameCreator } = req.body;

    if ( !sport || !dateTime || !skillLevel || !address1 || !city || !gender || !gameCreator ) {
        res.status( 400 ).send( {
            message: 'Please complete all required fields'
        } )
        return;
    } else if ( locationNote.length > 50 ) {
        res.status( 400 ).send( {
            message: 'Location note must be 50 characters or less.'
        } )
        return;
    }
    // TODO: add contraints for 1- date in future

    const query = `
        INSERT INTO games.game 
            (sport, dateTime, skillLevel, address1, city, locationNote, gender, gameCreator)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?);
        `;

    const placeholders = [ sport, dateTime, skillLevel, address1, city, locationNote, gender, gameCreator ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'Oops! We had an error added your game. Please try again later.',
                    error: err
                } );
        } else {
            res.send( {
                message: "New game added! 🤗",
                newGame: results
                
            } )
        }
    } );

}

exports.deleteGameById = ( req, res ) => {
    let { gameId } = req.params;

    const query = `  
    DELETE FROM games.game
        WHERE id = ?;
    `
    const placeholders = [ gameId ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was a server error deleting this game',
                    error: err
                } );
        } else if ( results.affectedRows == 0 ) {
            res.status( 404 )
                .send( {
                    message: "Could not find that game."
                } )
        } else {
            res.send( {
                message: 'Game deleted. Buh-bye! 😬'
            } );
        }
    } );
}
const db = require( '../index' );


exports.getPlayersByGameId = ( req, res ) => {

    let { gameId } = req.params;

    const query = `
        SELECT playerId, firstName, lastName 
        FROM games.rsvp
        
        INNER JOIN games.player
            ON rsvp.playerId = player.id
        
            WHERE gameId = ?
    `;

    const placeholders = [ gameId ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'Please try again later. Server error retreiving information',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No players signed up',
                    error: err
                } )
        } else {
            res.send( {
                // returns and array of objects {playerIds: ''}
                players: results
            } );
        }
    } );
}

exports.getGamesByPlayerId = ( req, res ) => {

    let { playerId } = req.params;

    const query = `
        SELECT DISTINCT gameId as id, sport, skillLevel, address1, city, locationNote, gender, gameCreator, dateTime, firstName, lastName,
        (SELECT COUNT(*) FROM rsvp
             WHERE rsvp.gameId =  game.id) AS rosterCount
                FROM rsvp
    
             INNER JOIN games.game
                 ON rsvp.gameId = game.id
            INNER JOIN games.player
                  ON game.gameCreator = player.id 
    
        WHERE playerId = ?
    `;



    const placeholders = [ playerId ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'Please try again later. Server error retreiving information',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No games for this player',
                    error: err
                } )
        } else {
            // results.map()
            console.log('here?', results);
            res.send( {
                // returns and array of game objects
                games: results
            } );
        }
    } );
}

exports.addPlayerToGame = ( req, res ) => {

    let { gameId, playerId } = req.body;

    if ( !gameId || !playerId) {
        res.status( 400 ).send( {
            message: 'You must be signed in and choose an existing game'
        } )
        return;
    }

    const query = `
        INSERT INTO games.rsvp 
            (gameId, playerId)
        VALUES
            (?, ?);
        `;

    const placeholders = [ gameId, playerId ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was an error adding you to the roster.',
                    error: err
                } );
        } else {
            res.send( {
                message: "Your signed up! 🤗"
            } )
        }
    } );

}

exports.removePlayerFromGame = ( req, res ) => {
    let { gameId, playerId } = req.params;

    const query = `  
    DELETE FROM games.rsvp
        WHERE gameId = ?
        AND playerId = ?;
    `
    const placeholders = [ gameId, playerId ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was an error removing you from this game',
                    error: err
                } );
        } else if ( results.affectedRows == 0 ) {
            res.status( 404 )
                .send( {
                    message: "No problem- you weren't signed up anyways 😜"
                } )
        } else {
            res.send( {
                message: `You're out!  😬`
            } );
        }
    } );
}



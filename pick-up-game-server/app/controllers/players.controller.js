const db = require( '../index' );
const bcrypt = require( 'bcrypt' );
const saltRounds = 10;
const { v4: uuid } = require( 'uuid' )

exports.createNewPlayer = async ( req, res ) => {

    let { firstName, lastName, email, password } = req.body;

    if ( !firstName || !lastName || !email || !password ) {
        res.status( 400 ).send( {
            message: "All fields are required to create an account."
        } );
        return
    } else if ( password.length <= 6 ) {
        res.status( 400 ).send( {
            message: "Your password must be at least 7 characters."
        } )
        return
    }

    const encryptedPassword = await bcrypt.hash( password, saltRounds )

    const query = `
    INSERT INTO games.player (id, firstName, lastName, email, password)
    VALUES
    (?, ?, ?, ?, ?);
    `;
    const placeholders = [ uuid(), firstName, lastName, email, encryptedPassword ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            if ( err.errno === 1062 ) {
                res.status( 400 ).send( {
                    message: "An account with that email already exists.",
                    error: err
                } )
            } else {
                res.status( 500 ).send( {
                    message: "There was an error creating your account. Please try again later.",
                    error: err
                } );
            }
        }
        else {
            // success  --> calls log in function to immediately log in
            this.login( req, res );
        }
    } )
}

exports.login = ( req, res ) => {

    let { email, password } = req.body;
    if ( !email || !password ) {
        res.status( 400 ).send( {
            message: 'Both email and password are required for login'
        } )
        return;
    }
    const query = `
            SELECT * FROM games.player
            WHERE email = ?;        
        `;
    const placeholders = [ email ];

    db.query( query, placeholders, async ( err, results ) => {

        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'There was an error logging in. Please try again later.',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No account not found with that email.',
                    error: err
                } )
        } else {

            const passwordMatched = await bcrypt.compare( password, results[ 0 ].password )
            if ( !passwordMatched ) {
                res.status( 400 ).send( {
                    message: "Incorrect password"
                } )
            } else {
                res.send( {
                    message: "Sign up successful! 🤗",
                    player: results[ 0 ]
                } )
            }
        }
    } );
}



exports.getPlayerByEmail = ( req, res ) => {

    let { email } = req.params;

    const query = `
        SELECT * FROM games.player
            WHERE email = ?
    `;

    const placeholders = [ email ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'Server error. Unable to retrieve player information',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No players found',
                    error: err
                } )
        } else {
            res.send( {
                player: results
            } );
        }
    } );
}

exports.getPlayerById = ( req, res ) => {

    let { id } = req.params;

    const query = `
        SELECT * FROM games.player
            WHERE id = ?
    `;

    const placeholders = [ id ];

    db.query( query, placeholders, ( err, results ) => {
        if ( err ) {
            res.status( 500 )
                .send( {
                    message: 'Server error. Unable to retrieve player information',
                    error: err
                } );
        } else if ( results.length == 0 ) {
            res.status( 404 )
                .send( {
                    message: 'No players found',
                    error: err
                } )
        } else {
            res.send( {
                // returns and array of playerIds??
                players: results
            } );
        }
    } );
}
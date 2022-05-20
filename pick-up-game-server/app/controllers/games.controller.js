const db = require( '../index' )
const Palette = db.palettes
// this is conventionally uppercase


exports.getAllPalettes = ( req, res ) => {

    Palette.find( {} )
        .then( data => {
            if ( data.length == 0 ) {
                res.status( 404 )
                    .send( {
                        message: "No palettes found with title", title
                    } )
            }
            console.log( 'data', data )
            res.send( {
                palettes: data,
                message: "great success!"
            } )

        } )
        .catch( err => {
            res.status( 500 )
                .send( {
                    message: "There was an error creating a palette",
                    error: err
                } )
        } )
        .finally( () => { } )
}

exports.getPaletteById = ( req, res ) => {
    const { id } = req.params
    console.log( id )
    if ( !id ) {
        res.status( 400 ).send( {
            message: " did not work, sorrryyy"
        } )
        return;
    }
    
    Palette.findById( id )
        .then( data => {
            if ( data.length == 0 ) {
                res.status( 404 )
                    .send( {
                        message: "No palettes found with id"
                    } )
            } else {
                console.log( 'data', data )
                res.send( {
                    palettes: data,
                    message: "great success!"
                } )
            }

        } )
        .catch( err => {
            res.status( 500 )
                .send( {
                    message: "There was an error creating a palette",
                    error: err
                } )
        } )
}

exports.getPalettesByUser = ( req, res ) => {
    res.send( "method not implemented" )
}

exports.getPalettesByHexColor = ( req, res ) => {
    res.send( "method not implemented" )
}

exports.getPalettesByTitle = ( req, res ) => {
    const { title } = req.params

    if ( !title ) {
        res.status( 500 ).send( {
            message: " did not work, sorrryyy"
        } )
    }
    Palette.find( { title } )
        .then( data => {
            if ( data.length == 0 ) {
                res.status( 404 )
                    .send( {
                        message: "No palettes found with title", title
                    } )
            } else {
                console.log( 'data', data )
                res.send( {
                    palettes: data,
                    message: "great success!"
                } )
            }

        } )
        .catch( err => {
            res.status( 500 )
                .send( {
                    message: "There was an error creating a palette",
                    error: err
                } )
        } )
        .finally( () => { } )
}

exports.createNewPalette = ( req, res ) => {
    // 1) parse the body/params
    const { title, colors } = req.body;
    // 2) validate
    if ( !title || !colors ) {
        res.status( 400 )
            .send( {
                message: 'Request body contained invalid data'
            } )

    }
    // 3) *New- create some Mongoose Object
    const palette = new Palette( {
        title: title,
        colors: colors
    } )
    // 4) *New- 'send' to mongo DB
    palette.save( palette )
        .then( data => {
            res.send( {
                palette: data,
                message: "Success!"
            } )
        } )
        .catch( err => {
            res.status( 500 )
                .send( {
                    message: "There was an error creating a palette",
                    error: err
                } )
        } )
        .finally( () => {
            console.log( "This code runs no matter what" )
        } );
}

exports.updatePalettesById = ( req, res ) => {
    const { id } = req.params

    if ( !id ) {
        res.status( 500 ).send( {
            message: " did not work, sorrryyy"
        } )
    }
    Palette.findById( { id } )
        .then( data => {
            if ( data.length == 0 ) {
                res.status( 404 )
                    .send( {
                        message: "No palettes found with this id", id
                    } )
            } else {
                console.log( 'id', id )
                res.send( {
                    palettes: id,
                    message: "great success!"
                } )
            }

        } )
        .catch( err => {
            res.status( 500 )
                .send( {
                    message: "There was an error creating a palette",
                    error: err
                } )
        } )
        .finally( () => { } )
}

exports.updateTitle = ( req, res ) => {
    res.send( "method not implemented" )
}

exports.deletePaletteById = ( req, res ) => {
    res.send( "method not implemented" )
}
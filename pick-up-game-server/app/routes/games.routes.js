module.exports =(app) => {
 
    const games = require('../controllers/games.controller.js')
    
    var router = require("express").Router();

    router.get('/', palettes.getAllPalettes);
    router.get('/:id', palettes.getPaletteById);
    router.get('/user/:userId', palettes.getPalettesByUser);
    router.get('/color/:hexColor', palettes.getPalettesByHexColor);
    router.get('/title/:title', palettes.getPalettesByTitle);
    
    router.post('/', palettes.createNewPalette)
   
    router.put('/:id', palettes.updatePalettesById)
    router.put('title/:title', palettes.updateTitle)
   
    router.delete('/:id', palettes.deletePaletteById)

// New! a way to insert long route with just router.get('/'
    app.use('/api/palettes', router)
}


// this is a second way of setting up routes,
// using a simplified route
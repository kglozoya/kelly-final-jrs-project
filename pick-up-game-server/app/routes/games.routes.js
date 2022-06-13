module.exports =(app) => {
 
    const games = require('../controllers/games.controller.js')
    

    app.get('/api/games', games.getAllGames);
    // app.get('/api/games/:id', games.getGameById);
    
    app.post('/api/games', games.createNewGame);
    
    app.delete('/api/games/:gameId', games.deleteGameById);
}

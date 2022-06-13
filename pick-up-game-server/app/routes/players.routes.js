module.exports =(app) => {
 
    const players = require('../controllers/players.controller.js')
    

    // app.get('/api/players', players.getAllPlayers);
    app.get('/api/players/:id', players.getPlayerById);
    app.get('/api/players/signin/:email', players.getPlayerByEmail);
    
    app.post('/api/players/signup', players.createNewPlayer);
    app.post('/api/players/login', players.login);
    
    // app.delete('/api/players/:id', players.removePlayerById)
}

module.exports =(app) => {
 
    const rsvps = require('../controllers/rsvps.controller.js')
    

    app.get('/api/rsvps/players/:gameId', rsvps.getPlayersByGameId);
    app.get('/api/rsvps/games/:playerId', rsvps.getGamesByPlayerId);
    
    app.post('/api/rsvps', rsvps.addPlayerToGame);
    
    app.delete("/api/rsvps/:gameId/:playerId", rsvps.removePlayerFromGame);

}

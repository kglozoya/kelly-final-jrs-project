const axios = require('axios');
const URL = `http://localhost:8080/api`

// -------GAME ROUTES--------------//
function getAllGames() {
    return axios.get(`${URL}/games`)
}

function createNewGame({ sport, dateTime, skillLevel, address1, city, locationNote, gender, gameCreator }) {
    return axios.post(`${URL}/games`, { sport, dateTime, skillLevel, address1, city, locationNote, gender, gameCreator })
}

function deleteGameById(gameId) {
    return axios.delete(`${URL}/games/${gameId}`)
}


//----------PLAYER ROUTES--------------//
/// don't really know if I am going to use this function... ?
function getUserByEmail(email) {
    return login({ email, password: '' })
}

function getPlayerById(id) {
    return axios.get(`${URL}/players/${id}`)
}
function getPlayerByEmail(email) {
    return axios.get(`${URL}/players/signin/${email}`)
}

function createNewPlayer({firstName, lastName, email, password}) {
    return axios.post(`${URL}/players/signup`, { firstName, lastName, email, password })
}

function login( {email, password} ) {
    return axios.post(`${URL}/players/login`, { email, password })
}

//--------------RSVP ROUTES---------------//
function getPlayersByGameId(gameId) {
    return axios.get(`${URL}/rsvps/players/${gameId}`)
}

function getGamesByPlayerId(playerId) {
    return axios.get(`${URL}/rsvps/games/${playerId}`)
}

function addPlayerToGame(gameId, playerId) {
    return axios.post(`${URL}/rsvps`, {gameId, playerId})
}

function removePlayerFromGame(gameId, playerId) {
    return axios.delete(`${URL}/rsvps/${gameId}/${playerId}`)
}

const api = {
    getAllGames,
    createNewGame,
    deleteGameById,
    getUserByEmail,
    getPlayerById,
    getPlayerByEmail,
    createNewPlayer, 
    login,
    getPlayersByGameId,
    getGamesByPlayerId,
    addPlayerToGame,
    removePlayerFromGame
}

function useAxios() {
    return api;
}

export { useAxios };

function savePlayer(player) {
    localStorage.setItem("player", JSON.stringify(player))
}

function getPlayer() {
    let value = localStorage.getItem("player");
    let player = JSON.parse(value)
    return player;
}

function removePlayer() {
    localStorage.removeItem("player");
}

const ls = {
    savePlayer,
    getPlayer,
    removePlayer
}

function useLocalStorage() {
    return ls;
}

export { useLocalStorage }

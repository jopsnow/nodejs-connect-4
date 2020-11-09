const players = [];

// join player 
function playerJoin(id) 
{
    const player = {num: players.length+1, id: id, player_name: `Player-${players.length+1}`}
    players.push(player);
    return player;
}

// get the current player 
function getCurrentPlayer(id) {
    return players.find(player => player.id === id)
}

// get current number of players 
function numOfPlayers() {
    return players.length;
}

// player leaves game 
function playerLeave(id) {
    const index = players.findIndex(player => player.id === id);

    if (index !== -1) {
        return players.splice(index, 1)[0]; 
    }
}

module.exports = {
    playerJoin,
    getCurrentPlayer,
    numOfPlayers,
    playerLeave
}
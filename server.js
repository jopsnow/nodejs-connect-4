const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const { playerJoin, numOfPlayers, playerLeave} = require('./utils/players');
const { changeTurn, makeMove, checkWinner, resetBoard} = require('./utils/gamestatus');
const { checkServerIdentity } = require('tls');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder
app.use(express.static(path.join(__dirname, 'public')));
moves = 0;

// run when client connects 
io.on('connection', socket => {
    console.log('new web socket connection...');
    
    // join game 
    socket.on('joinGame', () => {

        if (numOfPlayers() <= 2) {
            const player = playerJoin(socket.id);

            socket.join('connect-4-game');

            socket.emit('message', `Welcome to Connect 4 Game, ${player.player_name}`);
            socket.emit('set-player-number', player.player_name);
            if (numOfPlayers() === 2) {
                socket.broadcast.emit('start-turn');
                io.emit('start');
            }
        } else {
            var destination = '/404.html';
            socket.emit('redirect', destination);
        }
    });

    // Run when the player disconnects 
    socket.on('disconnect', () => {
        const player = playerLeave(socket.id);
        if (player) {
            io.emit('message', `${player.player_name} has left the game`);
        }
    })

    
    // make move 
    socket.on('make-move', ({col, row}) => {
        makeMove(row, col);
        result = checkWinner();
        moves=moves+1;
        changeTurn();
        io.emit('made-move', {col, row});
        if (result.winner) {
           io.emit('game-ended', {winner: result.winner, winner_nodes: result.winner_nodes}); 
           resetBoard();
           moves=0;
        } else {
            if(moves >= 42){
                moves=0;
                io.emit('draw');
            }
        }
        
    })

});
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

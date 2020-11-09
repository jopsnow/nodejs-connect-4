const socket = io();
myTurn = false;
gameEnded = false;
const yourColor = 'red';
const opponentColor = 'blue';

// join game
socket.emit('joinGame');

socket.on('set-player-number', (playerNumber) => {
    $('#player-number').html(`<h2>${playerNumber}</h2>`);
})
socket.on('message', message => {
    console.log(message);
})

// make move
    $('.cols > .col').click(function(){
        if (myTurn && !gameEnded) {
            const colNumber = $(this).attr('data-col');
            for (row = 6; row > 0; row--) {
                if (!$('#cell-'+colNumber+'-'+row).hasClass('red') && !$('#cell-'+colNumber+'-'+row).hasClass('blue')) {
                    
                    socket.emit('make-move', {col: colNumber, row: row});

                    break;
                } 
            } 
        }
    })

// play again 
$('#start-button').click(() => {
    $('#button-wrapper').addClass('hidden');
    $('.data-cell').removeClass('blue');
    $('.data-cell').removeClass('red');
    $('.data-cell').removeClass('winner-node');
    if (myTurn) {
        $('.col').removeClass('disabled-col');
    } else {
        $('.col').addClass('disabled-col');
    }
    gameEnded = false;
})

// made move
socket.on('made-move', ({col, row}) => {
    
    console.log(col, row);
    var currentColor = myTurn ? 'red' : 'blue';
    $('#cell-'+col+'-'+row).addClass(currentColor);
    myTurn = !myTurn;
    if (myTurn) {
        $('.col').removeClass('disabled-col');
    } else {
        $('.col').addClass('disabled-col');
    }
    $('#turn').html(myTurn ? "<h2>Your Turn</h2>" : "<h2>Opponent Turn</h2>");
});

// start the game 
socket.on('start', () => {
    $('#turn').html(myTurn ? "<h2>Your Turn</h2>" : "<h2>Opponent Turn</h2>");
    $('.col').removeClass('hidden');
    $('#button-wrapper').addClass('hidden');
})

// initial turn
socket.on('start-turn', () => {
    console.log('start-turn');
    myTurn = !myTurn;
})

// game ended
socket.on('game-ended', ({winner, winner_nodes}) => {
    alert(`Player-${winner} wins`);
    $('.data-cell').removeClass('blue');
    $('.data-cell').removeClass('red');
    $('.col').addClass('disabled-col');
    $('#button-wrapper').removeClass('hidden');
    gameEnded = true;
    winner_nodes.forEach((winner_node) => {
        $(`#cell-${winner_node.col+1}-${winner_node.row+1}`).addClass('winner-node');
    });
    
})

// draw game
socket.on('draw', () => {
    alert('DRAW');
    $('.col').addClass('disabled-col');
    $('#button-wrapper').removeClass('hidden');
    gameEnded = true;
});


// redirect
socket.on('redirect', function(destination) {
    window.location.href = destination;
});

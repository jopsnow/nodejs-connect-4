
player_turn = 1;

board = [[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0]]



function changeTurn() 
{
    player_turn = (player_turn === 1) ? 2 : 1;
}

function makeMove(row, col)
{
    var move_made = false;
    for(var i = board.length-1; i >= 0; i--){
        
        if(board[row-1][col-1] == 0){
            board[row-1][col-1] = player_turn;
            move_made = true;
            
            break;
        }
    }
}

function resetBoard() {
    board = [[0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]];
}

function checkWinner() {
    found = 0;
    winner_nodes = [];
    winner = false 
    player = 0
    for (var row = 0; row < board.length; row++) {
        if (winner) {
            console.log('winner');
        }
        found = 0;
        player = 0;
        for(var col = 0; col < board[row].length; col++) 
        {   
            var selected = board[row][col];
            if (selected !== 0) found = (player != selected) ? 1 : found + 1;
            player = selected;
            if (found >= 4) {
                winner = player;
                for(var k = 0; k < 4; k++){
                    winner_nodes.push({row: row, col: col-k});
                }
            }
            console.log("winner " + winner); 
            if ((col > 2 && found == 0) || found >= 4) break;
        }
        
    }

    if(!winner){
        for(col = 0; col < board[0].length; col++){
            if(winner) break;
            found = 0;
            player = 0;
            for(row = 0; row < board.length; row++){
                var selected = board[row][col];
                if(selected !== 0) found = (player != selected) ? 1 : found + 1;
                player = selected;
                if(found >= 4){
                    winner = player;
                    for(var k = 0; k < 4; k++){
                        winner_nodes.push({row: row-k, col: col});
                    }
                }
                if((row > 1 && found == 0) || found >= 4) break;
            }
        }
    }

    if(!winner){
        for(col = 0; col < board[0].length-3; col++){
            if(winner) break;
            for(row = 0; row < board.length-3; row++){
                var first_val = board[row][col];
                if(first_val == 0) continue;
                if(	first_val === board[row+1][col+1] &&
                    first_val === board[row+2][col+2] &&
                    first_val === board[row+3][col+3] ){
                    winner = first_val;
                    console.log("winner " + winner); 
                    winner_nodes.push({row: row, col: col});
                    winner_nodes.push({row: row+1, col: col+1});
                    winner_nodes.push({row: row+2, col: col+2});
                    winner_nodes.push({row: row+3, col: col+3});
                    break;
                }
            }
        }
    }

    if(!winner){
        for(col = board[0].length-1; col > 2; col--){
            if(winner) break;
            for(row = 0; row < board.length-3; row++){
                var first_val = board[row][col];
                if(first_val == 0) continue;
                if(	first_val === board[row+1][col-1] &&
                    first_val === board[row+2][col-2] &&
                    first_val === board[row+3][col-3] ){
                    winner = first_val;
                    winner_nodes.push({row: row, col: col});
                    winner_nodes.push({row: row+1, col: col-1});
                    winner_nodes.push({row: row+2, col: col-2});
                    winner_nodes.push({row: row+3, col: col-3});
                    break;
                }
            }
        }
    }

    return {winner_nodes: winner_nodes, winner: winner};
}

module.exports = {
    player_turn,
    changeTurn,
    board,
    makeMove,
    checkWinner,
    resetBoard
}

var game = (function () {
    // the game board
    var board = [[null, null, null], [null, null, null], [null, null, null]];
    // the current player
    var currentPlayer = 'X';

    // select <div class="result">Player 1 wins</div>

    var result = document.querySelector('.result');
    var gameinfo = document.getElementById('status');

    // a function to check if the game is over
    function isGameOver() {
        // check rows, columns, and diagonals
        for (var i = 0; i < 3; i++) {
            if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                return true;
            }
            if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                return true;
            }
        }
        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return true;
        }
        if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return true;
        }
        // check for a tie
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    // a function to make a move
    function makeMove(row, col) {
        if (board[row][col] === null) {
            board[row][col] = currentPlayer;
            if (isGameOver()) {
                console.log('Game over! Player ' + currentPlayer + ' wins!');
                result.textContent = 'Game over! Player ' + currentPlayer + ' wins!';
                result.style.display="flex"
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                gameinfo.textContent = 'Current Turn: ' + currentPlayer ;
            }
        }
    }

    // a function to reset the game
    function reset() {
        board = [[null, null, null], [null, null, null], [null, null, null]];
        currentPlayer = 'X';
    }

    function printBoard() {
        for (var i = 0; i < 3; i++) {
            var line = '';
            for (var j = 0; j < 3; j++) {
                line += board[i][j] + ' ';
            }
            console.log(line);
        }
        console.log(' ');
    }

    // get the text at a particular row col
    function getTextAt(row, col) {
        return board[row][col];
    }


    // expose the public methods
    return {
        makeMove: makeMove,
        isGameOver: isGameOver,
        printBoard: printBoard,
        getTextAt: getTextAt,
        reset: reset
    };
})();


// DOM manipulation
const squares = document.querySelectorAll('.square');

// each squre has idfrom 0 to 8
squares.forEach((square, index) => {
    square.addEventListener('click', () => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        game.makeMove(row, col);
        game.printBoard();
        square.textContent = game.getTextAt(row, col);
    });
});

document.getElementById('reset').addEventListener('click', () => {
    squares.forEach(square => {
        square.textContent = '';
    });
    game.reset();
    game.printBoard();
}
);







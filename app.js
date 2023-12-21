$(function () {
    // Initialize game variables
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Function to handle cell click
    function handleCellClick(index) {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            $(`td[data-index=${index}]`).text(currentPlayer);
            checkGameResult();
            switchPlayer();
        }
    }

    // Function to check if the game has a winner or is a draw
    function checkGameResult() {
        if (checkWinner('X') || checkWinner('O') || (gameBoard.every(cell => cell !== '') && !checkWinner('X') && !checkWinner('O'))) {
            displayResult();
        }
    }

    // Function to check if the current player has won
    function checkWinner(player) {
        for (let i = 0; i < 3; i++) {
            if (
                (gameBoard[i * 3] === player && gameBoard[i * 3 + 1] === player && gameBoard[i * 3 + 2] === player) ||
                (gameBoard[i] === player && gameBoard[i + 3] === player && gameBoard[i + 6] === player) ||
                (i === 0 && gameBoard[0] === player && gameBoard[4] === player && gameBoard[8] === player) ||
                (i === 2 && gameBoard[2] === player && gameBoard[4] === player && gameBoard[6] === player)
            ) {
                gameOver = true;
                displayResult(player === 'X' ? 'Player X' : 'Player O');
                return true;
            }
        }
        return false;
    }

    // Function to switch the player after each move
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        $('#turn').text(`${currentPlayer}'s Turn`);
    }

    // Function to display the game result
    function displayResult() {
        if (gameBoard.every(cell => cell !== '')) {
            $('#result-alert').html('<div class="alert alert-warning" role="alert">It\'s a Draw!</div>').show();
        } else {
            $('#result-alert').html(`<div class="alert alert-success" role="alert">${currentPlayer === 'X' ? 'Player X' : 'Player O'} is the Winner!</div>`).show();
        }
    }

    // Event listener for cell clicks
    $('td').click(function () {
        if (!gameOver) {
            handleCellClick($(this).data('index'));
        }
    });

    // Event listener for the restart button
    $('#restart').click(function () {
        resetGame();
    });

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        $('td').text('');
        $('#turn').text(`${currentPlayer}'s Turn`);
        $('#result-alert').hide();
    }
});

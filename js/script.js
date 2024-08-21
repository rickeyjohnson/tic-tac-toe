function createGameBoard() {
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]]

    const addMark = (mark, row, column) => {
        board[row][column] = mark;
    }

    const displayGameBoard = () => {
        console.log(board[0][0] + board[0][1] + board[0][2])
        console.log(board[1][0] + board[1][1] + board[1][2])
        console.log(board[2][0] + board[2][1] + board[2][2])
    }

    return {board, addMark, displayGameBoard}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("player1", "X")
    const player2 = createPlayer("player2", "O")
    const gameboard = createGameBoard()
    const isPlayer2Turn = 0         // 0 for player 1    1 for player 2

    const startGame = () => {
        console.log("00 01 02")
        console.log("10 11 12")
        console.log("20 21 22")

        console.log("---------")
        prompt("pick row/column [rowcol]")
    }

    const playerTurn = (player, row, col) => {
        gameboard.addMark(player.mark, row, col)
    }

    const turn = () => {
        if (!isPlayer2Turn) {
            // playerTurn(player1)
        } else {
            
        }
    }

    return {player1, player2, startGame, playerTurn}
}
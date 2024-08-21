function createGameBoard() {
    const board = [["#", "#", "#"],
                   ["#", "#", "#"],
                   ["#", "#", "#"]]

    const addMark = (mark, row, column) => {
        board[row][column] = mark;
    }

    const display = () => {
        console.log(board[0][0] + board[0][1] + board[0][2])
        console.log(board[1][0] + board[1][1] + board[1][2])
        console.log(board[2][0] + board[2][1] + board[2][2])
    }

    return {board, addMark, display}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("player1", "X")
    const player2 = createPlayer("player2", "O")
    const gameboard = createGameBoard()
    let playersTurn = 0
    let position = 0
    let done = false;

    const startGame = () => {
        console.log("00 01 02")
        console.log("10 11 12")
        console.log("20 21 22")

        console.log("---------")
    }

    const turn = (player) => {
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)

        gameboard.display()
    }

    const game = () => {
        startGame()

        while (!done) {
            position = prompt("pick row/column [rowcol]")
            playersTurn ? turn(player1) : turn(player2) 
        } // TODO: catch out of bound indexes, catch non number indexes
    }

    return {player1, player2, startGame, turn, game}
}
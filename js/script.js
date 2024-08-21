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
    let position = 0

    const startGame = () => {
        console.log("00 01 02")
        console.log("10 11 12")
        console.log("20 21 22")

        console.log("---------")
    }

    const turn = (player) => {
        position = prompt("pick row/column [rowcol]")
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)

        gameboard.display()
    }

    const game = () => {
        // game code
    }

    return {player1, player2, startGame, turn, game}
}
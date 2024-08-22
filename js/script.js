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

    const checkWinner = () => {
        const allEqual = (arr) => arr.every(val => val === arr[0]);

        // check rows
        for (let row = 0; row < 3; row++) {
            if (allEqual(board[row]) && !board[row].includes("#")) {
                return true
            }
        }

        // check columns
        for (let col = 0; col < 3; col++) {
            let tempArr = []

            for (let row = 0; row < 3; row++) {
                tempArr.push(board[row][col])
            }

            if (allEqual(tempArr) && !tempArr.includes("#")) {
                return true
            }
        }
        
    }

    return {board, addMark, display, checkWinner}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("player1", "X")
    const player2 = createPlayer("player2", "O")
    const gameboard = createGameBoard()
    let player1Turn = true
    let done = false

    const startGame = () => {
        console.log("00 01 02")
        console.log("10 11 12")
        console.log("20 21 22")

        console.log("---------")
    }

    const turn = (player, position) => {
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)

        gameboard.display()
    }

    const game = () => {
        startGame()

        while (!done) {
            let position = prompt("pick row/column [rowcol]")
            player1Turn ? turn(player1, position) : turn(player2, position) 

            if (gameboard.checkWinner()) {
                done = true
                console.log("winner!")
            }

            player1Turn = !player1Turn

        } // TODO: catch out of bound indexes, catch non number indexes
    }

    return {player1, player2, startGame, turn, game}
}
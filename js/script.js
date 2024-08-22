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

    const turn = (player) => {
        let position = prompt(player.name + " type in row/col")
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)

        gameboard.display()
    }

    const game = () => {
        startGame()

        for (let i = 0; i < 9; i++) {
            player1Turn ? turn(player1) : turn(player2) 

            if (gameboard.checkWinner()) {
                console.log("winner!")
                break
            }

            player1Turn = !player1Turn
        }
    }

    return {player1, player2, startGame, turn, game}
}
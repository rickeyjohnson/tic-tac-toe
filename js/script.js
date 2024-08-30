const turnLabel = document.querySelector(".turn")
const boxes = document.querySelectorAll(".box")
const resetButton = document.querySelector("#resetBtn")

function createGameBoard() {
    const board = [["#", "#", "#"],
                   ["#", "#", "#"],
                   ["#", "#", "#"]]

    const clearBoard = () => {

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                board[row][col] = "#"
            }
        }
    }

    const addMark = (mark, row, column) => {
        board[row][column] = mark;
    }

    const display = () => {
        console.log(board[0][0] + board[0][1] + board[0][2])
        console.log(board[1][0] + board[1][1] + board[1][2])
        console.log(board[2][0] + board[2][1] + board[2][2])
        console.log("\n")
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

        // check diagonal
        if ((allEqual([board[0][0], board[1][1], board[2][2]]) || allEqual([board[0][2], board[1][1], board[2][0]])) && board[1][1] !== "#" ) {
            return true
        }

        return false
        
    }

    const isPositionTaken = (row, col) => {
        if (board[row][col] !== "#") {
            return true
        }
    }

    const isValid = (position) => {
        let r = position[0]
        let c = position[1]

        try {
            board[r][c] // throws error is invalid position
        } catch (error) { 
            return false
        }

        return true
    }

    return {board, addMark, checkWinner, isPositionTaken, isValid, clearBoard}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("X", "X")
    const player2 = createPlayer("O", "O")
    const gameboard = createGameBoard()
    let gameover = false
    let i = 0

    const updateTurnLabel = (player) => {
        turnLabel.textContent = player.name
    }

    const changeCurrentPlayer = (currentPlayer) => {
        if (currentPlayer === player1) {
            return player2
        }

        return player1
    }

    // const isPositionTaken = () => {
    //     return (gameboard.isPositionTaken(row, col))
    // }

    const turn = (player, position) => {
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)
    } // returns nothing

    const clearScreen = () => {
        boxes.forEach((box) => {
            box.textContent = ""
        })
    }

    const AIRound = () => {
        let row, col

        if (i > 9) {
            gameover = true
            return
        }

        do {
            row = Math.floor(Math.random() * 3)
            col = Math.floor(Math.random() * 3)
        } while (gameboard.isPositionTaken(row, col))

        let AIbox = document.getElementById(row + "" + col)

        gameboard.addMark("O", row, col)
        AIbox.textContent = "O"

        if (gameboard.checkWinner()) {
            console.log("AI win")
            gameover = true
            return
        }

        gameover = (i >= 9)
        i++
    }

    const round = (box) => {
        
        if (i > 9) {
            gameover = true
            return
        }

        let position = box.getAttribute("id")
        let row = position[0]
        let col = position[1]

        if (gameboard.isPositionTaken(row, col)) {
            console.log('position taken')
            return
        }

        gameboard.addMark("X", row, col)
        box.textContent = "X"

        if (gameboard.checkWinner()) {
            console.log("you win")
            gameover = true
            return
        }

        i++

        AIRound()
    }

    const game = () => {

        boxes.forEach((box) => {
            box.addEventListener("click", () => {

                if (gameover) {
                    console.log('gameover')
                    return
                }

                round(box)
            })
        })

        resetButton.addEventListener("click", () => {
            gameover = false
            i = 1
            turnLabel.textContent = "X"
            currentPlayer = player1
            gameboard.clearBoard()
            clearScreen()
        })
    }

    return {game}
}

const game = Game()
game.game()
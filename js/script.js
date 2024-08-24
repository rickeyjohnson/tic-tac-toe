const turnLabel = document.querySelector(".turn")
const boxes = document.querySelectorAll(".box")

function createGameBoard() {
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]]

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
            if (allEqual(board[row]) && !board[row].includes("")) {
                return true
            }
        }

        // check columns
        for (let col = 0; col < 3; col++) {
            let tempArr = []

            for (let row = 0; row < 3; row++) {
                tempArr.push(board[row][col])
            }

            if (allEqual(tempArr) && !tempArr.includes("")) {
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
        if (board[row][col] !== "") {
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

    return {board, addMark, display, checkWinner, isPositionTaken, isValid}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("X", "X")
    const player2 = createPlayer("O", "O")
    const gameboard = createGameBoard()
    let player1Turn = true

    const updateTurnLabel = (player) => {
        turnLabel.textContent = player.name
    }

    const changeCurrentPlayer = (currentPlayer) => {
        if (currentPlayer === player1) {
            return player2
        }

        return player1
    }

    const turn = (player) => {
        let position = prompt(player.name + " type in row/col")
        let row, col

        // TODO: make validitity a function so it's easily plug and play inside the position taken checker!

        while (!gameboard.isValid(position)) {
            position = prompt(player.name + " please enter proper position (ugly)")
        }

        row = position[0]
        col = position[1]

        while (gameboard.isPositionTaken(row, col)) {
            position = prompt("that row is taken, pick another one!")

            while (!gameboard.isValid(position)) {
                position = prompt(player.name + " please enter proper position (ugly)")
            }

            row = position[0]
            col = position[1]
        }

        gameboard.addMark(player.mark, row, col)

        gameboard.display()
    }

    const game = () => {
        let currentPlayer = player1

        // for (let i = 0; i < 9; i++) {

        //     // player1Turn ? currentPlayer = player1 : currentPlayer = player2

        //     // updateTurnLabel(currentPlayer)

        //     // boxes.forEach((box) => {
        //     //     box.addEventListener("click", () => {
        //     //         box.textContent = currentPlayer.mark
        //     //     })
        //     // })

        //     // player1Turn ? turn(player1) : turn(player2) 

        //     // if (gameboard.checkWinner()) {
        //     //     player1Turn ? console.log(player1.name + " is the winner!") : console.log(player2.name + " is the winner!")
        //     //     break
        //     // }

        //     player1Turn = !player1Turn
        // }

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                // check if box is taken

                // place mark down
                box.textContent = currentPlayer.mark

                // update UI
                updateTurnLabel(currentPlayer)

                // switch turns
                currentPlayer = changeCurrentPlayer(currentPlayer)
            })
        })
    }

    return {game}
}

const game = Game()
game.game()
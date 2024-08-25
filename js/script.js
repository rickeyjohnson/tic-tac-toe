const turnLabel = document.querySelector(".turn")
const boxes = document.querySelectorAll(".box")

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

    return {board, addMark, display, checkWinner, isPositionTaken, isValid}
}

function createPlayer(name, mark) {
    return {name, mark}
}

function Game() {
    const player1 = createPlayer("X", "X")
    const player2 = createPlayer("O", "O")
    const gameboard = createGameBoard()

    const updateTurnLabel = (player) => {
        turnLabel.textContent = player.name
    }

    const changeCurrentPlayer = (currentPlayer) => {
        if (currentPlayer === player1) {
            return player2
        }

        return player1
    }

    const isPositionTaken = (box) => {
        return (box.textContent !== "")
    }

    const turn = (player, position) => {
        let row = position[0]
        let col = position[1]

        gameboard.addMark(player.mark, row, col)
    }

    const game = () => {
        let currentPlayer = player1
        let gameover = false
        let i = 1

        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (gameover) {
                    return
                }

                // check if box is taken
                if (isPositionTaken(box)) {
                    return
                }

                // do players turn
                let position = box.getAttribute("id")
                turn(currentPlayer, position)

                // place mark down
                box.textContent = currentPlayer.mark

                // check for winner
                if (gameboard.checkWinner()) {
                    turnLabel.textContent = currentPlayer.name + " WINS"
                    gameover = true
                    return
                }

                // switch turns
                currentPlayer = changeCurrentPlayer(currentPlayer)

                // update turn label UI
                updateTurnLabel(currentPlayer)

                if (i >= 9) {
                    turnLabel.textContent = "TIE"
                    gameover = true
                }

                i++
            })
        })
    }

    return {game}
}

const game = Game()
game.game()
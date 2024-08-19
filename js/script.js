function GameBoard() {
    const board = [["", "", ""],
                   ["", "", ""],
                   ["", "", ""]]

    const addMark = (mark, row, column) => {
        board[row][column] = mark;
    }
}

function Player(name, mark) {
    return {name, mark}
}

function Game() {
    // extra code
}
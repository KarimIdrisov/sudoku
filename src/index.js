module.exports = function solveSudoku(matrix) {
  const boxSize = 3;

  const findEmpty = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }

    return null;
  }

  const validate = (num, pos, board) => {
    const [row, col] = pos;

    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num && i !== row) {
        return false;
      }

      if (board[row][i] === num && i !== col) {
        return false;
      }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num && i !== row && j !== col) {
          return false;
        }
      }
    }

    return true;
  }

  const solve = () => {
    const currPos = findEmpty(matrix);

    if (currPos === null) {
      return true;
    }

    for (let i = 1; i < 10; i++) {
      const currNum = i;
      const isValid = validate(currNum, currPos, matrix);

      if (isValid) {
        const [x, y] = currPos;

        matrix[x][y] = currNum;

        if (solve()) {
          return true;
        }


        matrix[x][y] = 0;
      }
    }

    return false;
  }

  solve();

  return matrix;
}

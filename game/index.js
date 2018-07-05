import {Map} from 'immutable'

const board = Map();

export const move = (turn, position) => ({
  type: 'MOVE',
  turn: turn,
  position: position
});

// const winner = (board) => {
//   let xWin = false;
//   let oWin = false;
//   for (let i = 0; i < 3; i++) {
//     xWin = xWin || [0, 1, 2].every((ele) => board.hasIn([i, ele]) &&board.getIn([i, ele]) === 'X')
//     || [0, 1, 2].every((ele) => board.hasIn([ele, i]) && board.getIn([ele, i]) ==='X')
//     || [0, 1, 2].every((ele) => board.hasIn([i, i]) && board.getIn([i, i]) === 'X' )
//     || [0, 1, 2].every((ele) => board.hasIn([2-i, i]) && board.getIn([2-i, i]) === 'X' );

//     oWin = oWin || [0, 1, 2].every((ele) => board.hasIn([i, ele]) &&board.getIn([i, ele]) === 'O')
//     || [0, 1, 2].every((ele) => board.hasIn([ele, i]) && board.getIn([ele, i]) === 'O')
//     || [0, 1, 2].every((ele) => board.hasIn([i, i]) && board.getIn([i, i]) === 'O' )
//     || [0, 1, 2].every((ele) => board.hasIn([2-i, i]) && board.getIn([2-i, i]) === 'O');
//   }

//   console.log(xWin, oWin);
//   if (xWin) {
//     return 'X';
//   }
//   else if (oWin) {
//     return 'O';
//   }
//   else {
//     return null;
//   }
// }

function streak(board, ...coords) {
  if (coords.every(coord => board.hasIn(coord) && board.getIn(coord) === 'X')) {
    return 'X';
  }
  else if (coords.every(coord => board.hasIn(coord) && board.getIn(coord) === 'O')) {
    return 'O';
  }
  else {
    return undefined;
  }
}

function winner(board) {
  let theWinner;
  theWinner = (
  streak(board, [0, 0], [0, 1], [0, 2]) ||
  streak(board, [1, 0], [1, 1], [1, 2]) ||
  streak(board, [2, 0], [2, 1], [2, 2]) ||
  streak(board, [0, 0], [1, 0], [2, 0]) ||
  streak(board, [0, 1], [1, 1], [2, 1]) ||
  streak(board, [0, 2], [1, 2], [2, 2]) ||
  streak(board, [0, 0], [1, 1], [2, 2]) ||
  streak(board, [2, 0], [1, 1], [0, 2])
  );
  if (theWinner) {
    return theWinner;
  }
  else {
    for (let i = 0; i < 3; i ++) {
      for (let j = 0; j < 3; j ++) {
        if (board.hasIn([i,j]) === false) {
          return null;
        }
      }
    }
    return 'draw';
  }
}

export default function reducer(state = {turn: 'X', board: board, winner: null}, action) {
  switch (action.type) {
    case 'START':
      return state;
    case 'MOVE':
      let newBoard = state.board.setIn(action.position, action.turn);
      let theWinner = winner(newBoard);
      if (theWinner === 'draw') {
        console.log('draw!');
      }
      else if (theWinner) {
        console.log(theWinner, 'wins!');
      }
      return {turn: action.turn === 'X' ? 'O' : 'X', board: newBoard, winner: theWinner};
    default:
      return state;
  }
}

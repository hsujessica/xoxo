import {Map} from 'immutable'

const board = Map();

export const move = (turn, position) => ({
  type: 'MOVE',
  turn: turn,
  position: position
});

export default function reducer(state = {turn: 'X', board: board}, action) {
  switch (action.type) {
    case 'START':
      return state;
    case 'MOVE':
      return {turn: action.turn === 'X' ? 'O' : 'X', board: state.board.setIn(action.position, action.turn)};
    default:
      return state;
  }
}

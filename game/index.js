import {Map} from 'immutable'

const board = Map();

const move = (turn, position) => ({
 type: 'MOVE',
 turn: turn,
 position: position,
});

export default function reducer(state = {turn: 'X', board: board}, action) {
  switch (action.type) {
    case 'START':
      return state;
    case 'MOVE':
      console.log('hello!!!!!!!!!');
      board.setIn(action.position, action.turn);
      return {...state, turn: action.turn === 'X' ? 'O' : 'X'};
    default:
      return state;
  }
}

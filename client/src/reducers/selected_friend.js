import {SELECT_FRIEND} from '../actions/index';

export default function (state=[], action) {
  switch(action.type) {
    case SELECT_FRIEND:
     console.log('inside reducer switch: SELECT_FRIEND');
      return action.payload;
    default:
      return state;
  }
}

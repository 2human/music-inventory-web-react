import { SELECT_TABLE } from "../actions/actionTypes";

export default (state = {}, action) => {
  switch(action.type) {
    case SELECT_TABLE:
      return { ...state, table: action.payload }
    default:
      return state;
  }
}
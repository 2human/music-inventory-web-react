import { SELECT_TABLE } from "./actionTypes";

export const selectTable = table => {
  return {
    type: SELECT_TABLE,
    payload: table
  }
};
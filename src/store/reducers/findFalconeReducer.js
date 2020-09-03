import { createReducer } from "@reduxjs/toolkit";
import {
  findFalconeAction,
  fetchTokenAction,
} from "../actions/actions";

const reducer = createReducer(
  {},
  {
    [findFalconeAction.type]: (findFalcone, action) => {
      findFalcone.result = action.payload;
    },
    
    [fetchTokenAction.type]: (findFalcone, action) => {
      findFalcone.token = action.payload
    }
  }
);

export default reducer;

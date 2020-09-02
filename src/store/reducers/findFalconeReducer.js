import { createReducer } from "@reduxjs/toolkit";
import {
  findFalconeAction,
  findFalconeActionFailed,
  fetchTokenAction,
  fetchTokenActionFailed,
} from "../actions/actions";

const reducer = createReducer(
  {},
  {
    [findFalconeAction.type]: (findFalcone, action) => {
      findFalcone.result = action.payload;
    },
    [findFalconeActionFailed.type]: (findFalcone, action) => {
      console.log("Find Falcone action failed");
    },
    [fetchTokenAction.type]: (findFalcone, action) => {
      findFalcone.token = action.payload
    },
    [fetchTokenActionFailed.type]: (findFalcone, action) => {
      console.log("fetchTokenActionFailed");
    }
  }
);

export default reducer;

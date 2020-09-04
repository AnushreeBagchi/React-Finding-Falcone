import { createReducer } from "@reduxjs/toolkit";
import { fetchPlanetsAction } from "../actions/actions";

const reducer = createReducer([], {
  [fetchPlanetsAction.type]: (planets, action) => {
    return action.payload;
  },
});

export default reducer;

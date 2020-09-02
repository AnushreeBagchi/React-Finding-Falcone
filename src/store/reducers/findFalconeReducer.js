import { createReducer} from "@reduxjs/toolkit";
import {findFalconeAction} from "../actions/actions";

const reducer = createReducer(
    {},
    {
      [findFalconeAction.type]: (findFalcone, action) => {
        findFalcone.result = action.payload;
      },
    }
  );
  
export default reducer;
  
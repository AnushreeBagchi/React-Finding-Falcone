import { createReducer} from "@reduxjs/toolkit";
import {fetchVehiclesAction} from "../actions/actions";

const reducer = createReducer([], {
    [fetchVehiclesAction.type]: (vehicles, action) => {
      vehicles.length = 0; //resetting the array
      action.payload.forEach(veh => {
        vehicles.push(veh)
      });
    }
  });

export default reducer;


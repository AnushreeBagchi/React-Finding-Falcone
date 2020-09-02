import { createReducer} from "@reduxjs/toolkit";
import {fetchVehiclesAction, fetchVehiclesActionFailed} from "../actions/actions";

const reducer = createReducer([], {
    [fetchVehiclesAction.type]: (vehicles, action) => {
      vehicles.length = 0; //resetting the array
      action.payload.forEach(veh => {
        vehicles.push(veh)
      });
    },
    [fetchVehiclesActionFailed.type]: (vehicles, action) => {
      console.log("fetchVehiclesActionFailed");
    }
  });

export default reducer;


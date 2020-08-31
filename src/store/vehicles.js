import axios from "axios";
import * as actions from "./api";
import { createAction, createReducer } from "@reduxjs/toolkit";
import * as url from "./config/remoteUrls";

//actions
const fetchVehiclesAction = createAction("fetchVehicles");

//actioncreators

export const fetchVehicles = () => async (dispatch) => {
  try {
    const response = await axios.request({
      url: url.VEHICLE_API,
    });

    // dispatch(actions.apiCallSuccess(response.data));
    dispatch(fetchVehiclesAction(response.data));
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
  }
};



const reducer = createReducer([], {
  [fetchVehiclesAction.type]: (vehicles, action) => {
    action.payload.forEach(veh => {
      vehicles.push(veh)
    });
  },

});

export const getAvailableVehicles = state => {
  let vehObj = {};
  Object.keys(state.destinations).forEach(key => {
    let dest = state.destinations[key];
    if (dest.selectedVehicle) {
      let vehicle = dest.selectedVehicle;
      vehObj[vehicle] = vehObj[vehicle] ? vehObj[vehicle]+1 : 1;
    }
  });

  let availableVehicles = JSON.parse(JSON.stringify(state.vehicles));
  availableVehicles.forEach(veh=> {
    if (vehObj[veh.name]) {
      veh.total_no -=  vehObj[veh.name];
    }
  });
  return availableVehicles;
}

export default reducer;

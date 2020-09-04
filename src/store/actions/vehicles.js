import {FETCH_VEHICLES_FAILED_MSG, VEHICLE_API} from "../constants";
import {fetchVehiclesAction} from "./actions";

//actioncreators

export const fetchVehicles = () => async (dispatch) => {
    return dispatch({
      type: "apiCallBegan",
      payload: {
        url : VEHICLE_API,
        onSuccess: fetchVehiclesAction.type,
        onError: FETCH_VEHICLES_FAILED_MSG,
      }
    });
};

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

export const getSelectedVehicles = state => {
  let selectedVehicles = [];
  let destinations = state.destinations;
    Object.keys(destinations).forEach(key => {
      let dest = destinations[key];
      if (dest.selectedVehicle ){
        selectedVehicles.push(dest.selectedVehicle);
      }
    });
    return selectedVehicles
}
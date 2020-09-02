import * as url from "../contants";
import {fetchVehiclesAction, fetchVehiclesActionFailed} from "./actions";

//actioncreators

export const fetchVehicles = () => async (dispatch) => {
    dispatch({
      type: "apiCallBegan",
      payload: {
        url : url.VEHICLE_API,
        onSuccess: fetchVehiclesAction.type,
        onError: fetchVehiclesActionFailed.type,
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
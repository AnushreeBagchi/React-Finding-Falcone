import {getInitialDestinationsAction, addDestinationAction, vehicleSelectedAction} from "./actions";
import {NUMBER_OF_DESTINATIONS} from "../constants";

//actions
export const getInitialDestinations = () => (dispatch) => {
  const destinations = [];
  for (let i=1; i <= NUMBER_OF_DESTINATIONS ;i++){
    destinations.push("destination"+i);
  }
  dispatch(getInitialDestinationsAction(destinations))
};

export const addDestination = (data) => (dispatch) => {
  dispatch(addDestinationAction(data));
};

export const vehicleSelected = (data) => (dispatch) => {
  dispatch(vehicleSelectedAction(data));
};


export const getTimeTaken = state => {
  let timetaken = 0;
  Object.keys(state.destinations).forEach((key) => {
    if (state.destinations[key]) {
      let curr_time = state.destinations[key].timetaken;
      if (curr_time) {
        timetaken += curr_time;
      }
    }
  });
  return timetaken;
}
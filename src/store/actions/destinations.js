import {getInitialDestinationsAction, addDestinationAction, vehicleSelectedAction} from "./actions";
import {NUMBER_OF_DESTINATIONS} from "../contants";

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



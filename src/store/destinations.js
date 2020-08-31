import { createReducer } from "@reduxjs/toolkit";

//actions
export const getInitialDestinations = () => (dispatch) => {
  dispatch({
    type: "getInitialDestinations",
    payload: ["destination1", "destination2", "destination3", "destination4"],
  });
};

export const addDestination = (data) => (dispatch) => {
  dispatch({
    type: "addDestination",
    payload: data,
  });
};

export const vehicleSelected = (data) => (dispatch) => {
  dispatch({
    type: "vehicleSelected",
    payload: data
  })
}

const reducer = createReducer(
  {},
  {
    getInitialDestinations: (destinations, action) => {
      action.payload.forEach((dest) => {
        destinations[dest] = {};
      });
    },
    addDestination: (destinations, action) => {
      destinations[action.payload.destination] = {
        selectedPlanet: action.payload.value,
        showVehicle: true,
      };
    },
    vehicleSelected : (destinations, action) => {
      const {timetaken, selectedVehicle, destination} = action.payload;
      destinations[destination].selectedVehicle = selectedVehicle;
      destinations[destination].timetaken = timetaken;
    }
  }
);

export default reducer;

//selectors

export const getDestination = state => {
  return state.destinations;
}
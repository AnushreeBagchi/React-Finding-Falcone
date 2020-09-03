import { createReducer } from "@reduxjs/toolkit";
import {
  getInitialDestinationsAction,
  addDestinationAction,
  vehicleSelectedAction,
} from "../actions/actions";

const reducer = createReducer(
  {},
  {
    [getInitialDestinationsAction.type]: (destinations, action) => {
      action.payload.forEach((dest) => {
        destinations[dest] = {};
      });
    },
    [addDestinationAction.type]: (destinations, action) => {
      destinations[action.payload.destination] = {
        selectedPlanet: action.payload.value,
        showVehicle: true,
      };
    },
    [vehicleSelectedAction.type]: (destinations, action) => {
      const { timetaken, selectedVehicle, destination } = action.payload;
      destinations[destination].selectedVehicle = selectedVehicle;
      destinations[destination].timetaken = timetaken;
    },
  }
);

export default reducer;

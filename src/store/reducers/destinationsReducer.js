import { createReducer} from "@reduxjs/toolkit";
import {getInitialDestinationsAction} from "../actions/actions";

const reducer = createReducer(
    {},
    {
      [getInitialDestinationsAction.type]: (destinations, action) => {
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
      vehicleSelected: (destinations, action) => {
        const { timetaken, selectedVehicle, destination } = action.payload;
        destinations[destination].selectedVehicle = selectedVehicle;
        destinations[destination].timetaken = timetaken;
      },
    }
  );
  
  export default reducer;
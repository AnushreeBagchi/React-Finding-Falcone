import { createAction} from "@reduxjs/toolkit";

export const fetchPlanetsAction = createAction("fetchPlanets");
export const fetchVehiclesAction = createAction("fetchVehicles");
export const getInitialDestinationsAction = createAction("getInitialDestinations");
export const addDestinationAction = createAction("addDestination");
export const vehicleSelectedAction = createAction("vehicleSelected");
export const findFalconeAction = createAction("findFalcone");
 
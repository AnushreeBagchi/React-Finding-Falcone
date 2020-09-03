import { createAction} from "@reduxjs/toolkit";

export const fetchPlanetsAction = createAction("fetchPlanetsAction");

export const fetchVehiclesAction = createAction("fetchVehiclesAction");

export const getInitialDestinationsAction = createAction("getInitialDestinations");
export const addDestinationAction = createAction("addDestination");
export const vehicleSelectedAction = createAction("vehicleSelected");

export const findFalconeAction = createAction("findFalconeAction");

export const fetchTokenAction = createAction("fetchTokenAction");

export const onError = createAction("onError");
export const resetErrorAction = createAction("resetErrorAction");

 
import { createAction} from "@reduxjs/toolkit";

export const fetchPlanetsAction = createAction("fetchPlanetsAction");
export const fetchPlanetsActionFailed = createAction("fetchPlanetsActionFailed");

export const fetchVehiclesAction = createAction("fetchVehiclesAction");
export const fetchVehiclesActionFailed = createAction("fetchVehiclesActionFailed");

export const getInitialDestinationsAction = createAction("getInitialDestinations");
export const addDestinationAction = createAction("addDestination");
export const vehicleSelectedAction = createAction("vehicleSelected");

export const findFalconeAction = createAction("findFalconeAction");
export const findFalconeActionFailed = createAction("findFalconeActionFailed");

export const fetchTokenAction = createAction("fetchTokenAction");
export const fetchTokenActionFailed = createAction("fetchTokenActionFailed");
 
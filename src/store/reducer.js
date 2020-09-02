import { combineReducers } from "redux";
import planetsReducer from "./planets/planets";
import vehiclesReducer from "./vehicles/vehicles";
import destinationReducer from "./destinations/destinations";
import findFalconeReducer from "./findFalcone";

export default combineReducers({
    planets : planetsReducer,
    vehicles : vehiclesReducer,
    destinations : destinationReducer,
    findFalcone : findFalconeReducer
});

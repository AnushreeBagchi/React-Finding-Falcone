import { combineReducers } from "redux";
import planetsReducer from "./planetsReducer";
import vehiclesReducer from "./vehiclesReducer";
import destinationReducer from "./destinationsReducer";
import findFalconeReducer from "./findFalconeReducer";

export default combineReducers({
    planets : planetsReducer,
    vehicles : vehiclesReducer,
    destinations : destinationReducer,
    findFalcone : findFalconeReducer
});
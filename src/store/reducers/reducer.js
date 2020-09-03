import { combineReducers } from "redux";
import planetsReducer from "./planetsReducer";
import vehiclesReducer from "./vehiclesReducer";
import destinationReducer from "./destinationsReducer";
import findFalconeReducer from "./findFalconeReducer";
import  errorReducer  from './errorReducer';

export default combineReducers({
    planets : planetsReducer,
    vehicles : vehiclesReducer,
    destinations : destinationReducer,
    findFalcone : findFalconeReducer,
    error: errorReducer
});
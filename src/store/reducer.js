import { combineReducers } from "redux";
import planetsReducer from "./planets";
import vehiclesReducer from "./vehicles";
import destinationReducer from "./destinations"

export default combineReducers({
    planets : planetsReducer,
    vehicles : vehiclesReducer,
    destinations : destinationReducer
});

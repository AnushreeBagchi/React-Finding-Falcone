import { createReducer} from "@reduxjs/toolkit";
import {fetchPlanetsAction} from "../actions/actions";

const reducer = createReducer([], {
    [fetchPlanetsAction.type]: (planets, action) => {
        planets.length = 0; //resetting the array
        action.payload.forEach(planet => {
            planets.push(planet);
        });
    }
    });

export default reducer;
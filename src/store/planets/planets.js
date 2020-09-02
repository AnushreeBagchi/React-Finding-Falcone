import axios from "axios";
import * as actions from "../api";
import { createAction, createReducer} from "@reduxjs/toolkit";
import * as url from "../config/remoteUrls";

//actions
const fetchPlanetsAction = createAction("fetchPlanets");

export const fetchPlanets = () => async (dispatch) => {
    try {
        const response = await axios.request({
          url : url.PLANET_API
        });

        dispatch(fetchPlanetsAction(response.data));
       
      } catch (error) {
        dispatch(actions.apiCallFailed(error.message));
      }
};

const reducer = createReducer([], {
[fetchPlanetsAction.type]: (planets, action) => {
    planets.length = 0; //resetting the array
    action.payload.forEach(planet => {
        planets.push(planet);
    });
}
});

//selector
export const getAvailablePlanets = state => {
  const selectedPlanets = [];
  Object.keys(state.destinations).forEach(dest => {
    const selectedPlanet = state.destinations[dest].selectedPlanet;
    if (selectedPlanet) {
      selectedPlanets.push(state.destinations[dest].selectedPlanet);
    }
  });
  // eslint-disable-next-line
  return state.planets.filter(planet => {
    const index = selectedPlanets.indexOf(planet.name);
    if (index === -1){
      return planet;
    } 
  });
}

export default reducer;

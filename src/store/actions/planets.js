import {FETCH_PLANETS_FAILED_MSG, PLANET_API} from "../constants";

import {fetchPlanetsAction} from "./actions";
// import {planetsReducer} from "../reducers/planetsReducer"

//actions

export const fetchPlanets = () => async (dispatch) => {
    return dispatch({
      type: "apiCallBegan",
      payload: {
        url : PLANET_API,
        onSuccess: fetchPlanetsAction.type,
        onError: FETCH_PLANETS_FAILED_MSG
      }
    })
};

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

export const getSelectedPlanets = state => {
  let selectedPlanets = [];
  let destinations = state.destinations;
    Object.keys(destinations).forEach(key => {
      let dest = destinations[key];
      if (dest.selectedPlanet ){
        selectedPlanets.push(dest.selectedPlanet);
      }
    });
    return selectedPlanets
}


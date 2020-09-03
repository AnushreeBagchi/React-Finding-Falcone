import axios from "axios";
import * as url from "../contants";
import {
  findFalconeAction,
  findFalconeActionFailed,
  fetchTokenAction,
  fetchTokenActionFailed,
} from "./actions";

//actions
import { NUMBER_OF_DESTINATIONS } from "../contants";

export const findFalcone = (requestPayload) => async (dispatch) => {
  if (
    requestPayload.planet_names &&
    requestPayload.planet_names.length !== NUMBER_OF_DESTINATIONS &&
    requestPayload.vehicle_names &&
    requestPayload.vehicle_names.length !== NUMBER_OF_DESTINATIONS
  ) {
    dispatch({
      type: findFalconeActionFailed.type
    })
  }

  return dispatch({
    type: "apiCallBegan",
    payload: {
      url: url.FIND_FALCONE_API,
      method: "post",
      data: requestPayload,
      onSuccess: findFalconeAction.type,
      onError: findFalconeActionFailed.type,
    },
  });
};

export const getToken = () => async (dispatch) => {
  axios.defaults.headers.common["Accept"] = "application/json";

  return await axios
    .post(url.AUTH_TOKEN_URL)
    .then((response) => {
      dispatch(fetchTokenAction(response.data));
    })
    .catch((error) => dispatch(fetchTokenActionFailed(error)));
};

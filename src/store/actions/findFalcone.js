import axios from "axios";
import * as url from "../contants";
import {
  findFalconeAction,
  findFalconeActionFailed,
  fetchTokenAction,
  fetchTokenActionFailed,
} from "./actions";

//actions

export const findFalcone = (requestPayload) => async (dispatch) => {
  // let responseToken = await getToken();
  // requestPayload.token = responseToken.token;

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

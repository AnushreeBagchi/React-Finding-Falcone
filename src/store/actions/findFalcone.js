import axios from "axios";
import * as actions from "../api";
import * as url from "../contants";
import {findFalconeAction} from "./actions"

//actions

export const findFalcone =  (requestPayload) => async (dispatch) => {
  let responseToken = await getToken();
  requestPayload.token = responseToken.token;

  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  return axios
    .post(url.FIND_FALCONE_API, requestPayload)
    .then((res) => { dispatch(findFalconeAction(res.data)) })
    .catch((error) => dispatch(actions.apiCallFailed(error.message)));
};

const getToken = async (dispatch) => {
  let token = {};

  const axios = require("axios");
  axios.defaults.headers.common["Accept"] = "application/json";

  await axios
    .post(url.AUTH_TOKEN_URL)
    .then((response) => {
      token = response.data;
    })
    .catch((error) => dispatch(actions.apiCallFailed(error.message)));

  return token;
};


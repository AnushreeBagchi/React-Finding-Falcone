import axios from "axios";
import * as actions from "./api";
import { createAction, createReducer } from "@reduxjs/toolkit";
import * as url from "./config/remoteUrls";

//actions

export const findFalcone =  (requestPayload) => async (dispatch) => {
  console.log("inside find falcone");
  let responseToken = await getToken();
  requestPayload.token = responseToken.token;

  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  return axios
    .post(url.FIND_FALCONE_API, requestPayload)
    .then((res) => {
      dispatch({
        type: "FIND_FALCONE",
        payload: res.data,
      });
    })
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

const reducer = createReducer(
  {},
  {
    FIND_FALCONE: (findFalcone, action) => {
      findFalcone.result = action.payload;
    },
  }
);

export default reducer;

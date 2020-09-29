import axios from "axios";
import {
  GET_CARD_REQUEST,
  GET_CARD_REQUESTS,
  API_URL,
  GET_IMAGES,
} from "./Types";

export const getCardReqeusts = () => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/card-requests`);
  dispatch({
    type: GET_CARD_REQUESTS,
    payload: res.data,
  });
};
export const getCardReqeust = (id) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/card-requests/${id}`);
  dispatch({
    type: GET_CARD_REQUEST,
    payload: res.data,
  });
};
export const getCardReqeustImage = (id) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/card-requests/sid/${id}`);
  dispatch({
    type: GET_IMAGES,
    payload: res.data,
  });
};
export const changeCardRequestStatus = (id, status, reqeust) => async (
  dispatch
) => {
  const res = await axios.put(
    `${API_URL}/api/card-requests/${id}/${status}`,
    reqeust
  );
  dispatch({
    type: GET_CARD_REQUEST,
    payload: res.data,
  });
};

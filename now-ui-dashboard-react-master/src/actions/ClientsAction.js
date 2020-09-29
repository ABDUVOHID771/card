import axios from "axios";
import {
  GET_ALL_CLIENTS,
  GET_CLIENT,
  API_URL,
  GET_CARDS,
  GET_LOANS,
} from "./Types";

export const getAllClients = () => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/clients`);
  dispatch({
    type: GET_CLIENT,
    payload: "",
  });
  dispatch({
    type: GET_ALL_CLIENTS,
    payload: res.data,
  });
};
export const getSingleClient = (id) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/clients/${id}`);
  dispatch({
    type: GET_CLIENT,
    payload: res.data,
  });
};

export const getSingleClientCards = (id) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/cards/${id}`);
  dispatch({
    type: GET_CARDS,
    payload: res.data,
  });
};

export const getSingleClientLoans = (id) => async (dispatch) => {
  const res = await axios.get(`${API_URL}/api/loans/${id}`);
  dispatch({
    type: GET_LOANS,
    payload: res.data,
  });
};

import { GET_ALL_CLIENTS, GET_CLIENT } from "../actions/Types";

const initialState = {
  clients: [],
  client: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
      };
    default:
      return state;
  }
}

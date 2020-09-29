import { GET_CARD_REQUESTS, GET_CARD_REQUEST } from "../actions/Types";

const initialState = {
  requests: [],
  request: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARD_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    case GET_CARD_REQUEST:
      return {
        ...state,
        request: action.payload,
      };
    default:
      return state;
  }
}

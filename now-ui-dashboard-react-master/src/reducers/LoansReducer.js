import { GET_LOANS } from "../actions/Types";

const initialState = {
  loans: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOANS:
      return {
        ...state,
        loans: action.payload,
      };
    default:
      return state;
  }
}

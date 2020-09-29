import { SET_CURRENT_USER } from "../actions/Types";

const initialState = {
  user: {},
  validToken: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload !== null,
        user: action.payload,
      };

    default:
      return state;
  }
}

import { GET_IMAGES } from "../actions/Types";

const initialState = {
  imagees: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES:
      return {
        ...state,
        imagees: action.payload,
      };
    default:
      return state;
  }
}

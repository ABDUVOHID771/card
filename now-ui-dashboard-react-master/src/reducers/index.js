import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer.js";
import SecurityReducer from "./SecurityReducer.js";
import CardRequests from "./CardRequests.js";
import ImageReducer from "./ImageReducer.js";
import ClientReducer from "./ClientReducer.js";
import CardsReducer from "./CardsReducer.js";
import LoansReducer from "./LoansReducer.js";

export default combineReducers({
  errors: ErrorReducer,
  security: SecurityReducer,
  cardRequests: CardRequests,
  imagess: ImageReducer,
  clients: ClientReducer,
  cards: CardsReducer,
  loans: LoansReducer,
});

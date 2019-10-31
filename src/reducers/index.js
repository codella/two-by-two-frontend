import { combineReducers } from "redux";

import routing from "./routing";
import player from "./player";
import awaitPage from "./awaitPage";
import playPage from "./playPage";

const reducers = combineReducers({
  routing,
  player,
  awaitPage,
  playPage
});

export default reducers;

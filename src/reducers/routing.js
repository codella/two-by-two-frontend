import * as actionTypes from "../actions/types";

const initialRoutingState = {
  playerId: undefined,
  page: "start"
};

export default function routing(state = initialRoutingState, action) {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
    case actionTypes.JOIN_GAME:
      return {
        ...state,
        playerId: action.playerId,
        page: "await"
      };
    case actionTypes.GAME_UPDATED:
      return {
        ...state,
        page: "play"
      };
    default:
      return state;
  }
}

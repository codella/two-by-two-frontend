import * as actionTypes from "../actions/types";

const initialAwaitPageState = {
  creator: undefined,
  gameId: undefined,
  players: []
};

export default function awaitPage(state = initialAwaitPageState, action) {
  switch (action.type) {
    case actionTypes.CREATE_GAME:
      return {
        ...state,
        gameId: action.gameId,
        creator: true
      };
    case actionTypes.JOIN_GAME:
      return {
        ...state,
        gameId: action.gameId,
        creator: false
      };
    case actionTypes.UPDATE_GAME_JOINERS:
      return {
        ...state,
        players: action.players
      };
    default:
      return state;
  }
}

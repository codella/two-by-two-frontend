import * as actionTypes from "../actions/types";

const initialPlayPageState = {
  playerOnTurn: undefined,
  board: undefined,
  boardSize: undefined,
  hasMatchOccurred: undefined
};

export default function playPage(state = initialPlayPageState, action) {
  switch (action.type) {
    case actionTypes.GAME_UPDATED:
      return {
        ...state,
        playerOnTurn: action.playerOnTurn,
        boardSize: action.boardSize,
        board: action.board,
        gameState: action.gameState,
        turnMetadata: action.turnMetadata,
        gameFinalStats: action.gameFinalStats
      };
    default:
      return state;
  }
}

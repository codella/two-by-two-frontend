import * as types from "./types";

export const createGame = payload => ({
  type: types.CREATE_GAME,
  ...payload
});

export const joinGame = payload => ({
  type: types.JOIN_GAME,
  ...payload
});

export const updateGameJoiners = payload => ({
  type: types.UPDATE_GAME_JOINERS,
  ...payload
});

export const gameUpdated = payload => ({
  type: types.GAME_UPDATED,
  ...payload
});

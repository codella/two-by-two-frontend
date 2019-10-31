import * as actionTypes from "../actions/types";

import { updateGameJoiners, gameUpdated } from "../actions";

export default function registerSocketEventHandlers(socket, dispatch) {
  socket.on(actionTypes.UPDATE_GAME_JOINERS, payload => {
    dispatch(updateGameJoiners(payload));
  });

  socket.on(actionTypes.GAME_UPDATED, payload => {
    dispatch(gameUpdated(payload));
  });

  socket.on(actionTypes.GAME_ERROR, ({ error, validation }) => {
    if (validation) {
      alert(error);
    } else {
      alert(`An internal error occurred`);
    }
  });
}

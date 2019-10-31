import { connect } from "react-redux";
import io from "socket.io-client";
import { createGame, joinGame } from "../../actions";
import { requestGameCreation, requestToJoinAnExistingGame, withErrorHandling } from "../../apis";
import registerSocketEventHandlers from "../../sockets/registerSocketEventHandlers";
import StartPage from "./index.jsx";

const initializeSocket = (gameId, playerId, dispatch) => {
  const socket = io();
  socket.on("connect", () => {
    registerSocketEventHandlers(socket, dispatch);
    socket.emit("JOIN", { playerId, gameId });
  });
  socket.on("disconnect", function() {
    console.info("socket disconnected");
  });
  return socket;
};

const mapDispatchToProps = dispatch => {
  return {
    async handleCreateGame(playerName, setSocket) {
      const response = await requestGameCreation(playerName);
      withErrorHandling(response, response => {
        const { gameId, playerId } = response;
        dispatch(createGame({ gameId, playerId }));
        setSocket(initializeSocket(gameId, playerId, dispatch));
      });
    },

    async handleJoinGame(playerName, gameId, setSocket) {
      const response = await requestToJoinAnExistingGame(playerName, gameId);
      withErrorHandling(response, response => {
        const { playerId } = response;
        dispatch(joinGame({ gameId, playerId }));
        setSocket(initializeSocket(gameId, playerId, dispatch));
      });
    }
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(StartPage);

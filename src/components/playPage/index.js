import { connect } from "react-redux";
import PlayPage from "./index.jsx";

const mapStateToProps = state => {
  return {
    ...state.player,
    ...state.playPage
  };
};

const mapDispatchToProps = () => {
  return {
    handleCardSeletion(socket, row, col) {
      socket.emit("FLIP_CARD", { row, col });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPage);

import { connect } from "react-redux";
import AwaitPage from "./index.jsx";

const mapStateToProps = state => {
  return state.awaitPage;
};

const mapDispatchToProps = () => {
  return {
    handleBegin(socket) {
      socket.emit("BEGIN");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AwaitPage);

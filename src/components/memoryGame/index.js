import { connect } from "react-redux";
import MemoryGame from "./index.jsx";

const mapStateToProps = state => {
  return {
    page: state.routing.page
  };
};

export default connect(mapStateToProps)(MemoryGame);

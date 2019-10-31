import React from "react";
import StartPage from "../startPage";
import AwaitPage from "../awaitPage";
import PlayPage from "../playPage";

import SocketContext from "../../contexts/SocketContext";

import "./index.css";

class MemoryGame extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderPage = this.renderPage.bind(this);

    this.state = {
      socket: undefined
    };
  }

  renderPage() {
    const { page } = this.props;

    switch (page) {
      case "start":
        return <StartPage />;
      case "await":
        return <AwaitPage />;
      case "play":
        return <PlayPage />;
      default:
        throw Error(`unknown page '${page}'`);
    }
  }

  render() {
    const socketContextValue = {
      socket: this.state.socket,
      setSocket: socket => {
        this.setState({ socket });
      }
    };
    return (
      <SocketContext.Provider value={socketContextValue}>
        <div className="memoryGame">{this.renderPage()}</div>
      </SocketContext.Provider>
    );
  }
}

export default MemoryGame;

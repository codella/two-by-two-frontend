import React from "react";
import SocketContext from "../../contexts/SocketContext";

import "./index.css";

class StartPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleCreate(setSocket) {
    const playerName = document.getElementsByName("playerName")[0].value;
    this.props.handleCreateGame(playerName, setSocket);
  }

  handleJoin(setSocket) {
    const playerName = document.getElementsByName("playerName")[0].value;
    const gameId = document.getElementsByName("gameId")[0].value;
    this.props.handleJoinGame(playerName, gameId, setSocket);
  }

  render() {
    return (
      <SocketContext.Consumer>
        {({ setSocket }) => (
          <div className="startPage">
            <div className="startPage__nameField">
              <label>
                Your Name:
                <input name="playerName" type="text" placeholder="Please enter your name" />
              </label>
            </div>
            <div className="startPage__actions">
              <button onClick={() => this.handleCreate(setSocket)}>Create a new game!</button>
              <div>... or ...</div>
              <button onClick={() => this.handleJoin(setSocket)}>Join an existing game!</button>
              <label>
                Game ID to join:
                <input name="gameId" type="text" placeholder="Please enter a Game ID" />
              </label>
            </div>
          </div>
        )}
      </SocketContext.Consumer>
    );
  }
}

export default StartPage;

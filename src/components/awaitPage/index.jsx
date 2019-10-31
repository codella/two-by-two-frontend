import React from "react";
import SocketContext from "../../contexts/SocketContext";

import "./index.css";

class AwaitPage extends React.PureComponent {
  renderActions(socket) {
    const { players, creator, handleBegin } = this.props;

    if (players.length > 1 && creator) {
      /* the creator has at least a joiner */
      return <button onClick={() => handleBegin(socket)}>Begin to play with the players listed above!</button>;
    } else if (creator) {
      /* the creator needs to wait for at least a joiner */
      return <span>... Waiting for at least another player to join the game ...</span>;
    } else {
      /* joiners have no actions */
      return <span>... Waiting for the creator of the game to start the game ...</span>;
    }
  }

  render() {
    const { players, gameId } = this.props;

    return (
      <SocketContext.Consumer>
        {({ socket }) => (
          <div className="awaitPage">
            <div className="awaitPage__gameId">
              Game ID to share with other players: <code>{gameId}</code>
            </div>
            <div className="awaitPage__playersList">
              <ul>
                {players.map(({ name }) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div className="awaitPage__actions">{this.renderActions(socket)}</div>
          </div>
        )}
      </SocketContext.Consumer>
    );
  }
}

export default AwaitPage;

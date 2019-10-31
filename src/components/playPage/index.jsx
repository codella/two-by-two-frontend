import React from "react";
import SocketContext from "../../contexts/SocketContext";

import {
  GAME_STATUS_WAITING_FOR_FIRST_FLIP,
  GAME_STATUS_WAITING_FOR_SECOND_FLIP,
  GAME_STATUS_FINISHED,
  GAME_STATUS_TURN_ENDED
} from "../../protocol/game";

import "./index.css";

class PlayPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.renderBoard = this.renderBoard.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.renderCardBack = this.renderCardBack.bind(this);
    this.renderTurn = this.renderTurn.bind(this);
    this.renderFeedback = this.renderFeedback.bind(this);
    this.renderEvent = this.renderEvent.bind(this);
    this.renderFinalStats = this.renderFinalStats.bind(this);
  }

  renderCardBack(socket, row, col) {
    const { playerOnTurn, playerId, handleCardSeletion } = this.props;
    const isMyTurn = playerOnTurn.id === playerId;
    const onClick = isMyTurn ? () => handleCardSeletion(socket, row, col) : () => alert("This is not yet your turn :(");

    return (
      <div
        key={`${row}-${col}`}
        className="playPage__board__card"
        style={{ backgroundImage: "radial-gradient(#e66465, #9198e5)" }}
        onClick={onClick}
      ></div>
    );
  }

  renderCard({ row, col, type }) {
    return <div key={`${row}-${col}`} className="playPage__board__card" style={{ backgroundColor: type }}></div>;
  }

  renderBoard(socket) {
    const { board, boardSize } = this.props;
    const columnsTemplate = Array(boardSize)
      .fill("auto")
      .join(" ");

    const cards = [];
    for (let currentRow = 0; currentRow < boardSize; currentRow++) {
      for (let currentCol = 0; currentCol < boardSize; currentCol++) {
        const flippedCard = board.find(({ row, col }) => row === currentRow && col === currentCol);
        cards.push(flippedCard ? this.renderCard(flippedCard) : this.renderCardBack(socket, currentRow, currentCol));
      }
    }
    return (
      <div className="playPage__board" style={{ gridTemplateColumns: columnsTemplate }}>
        {cards}
      </div>
    );
  }

  renderTurn() {
    const { playerOnTurn, playerId } = this.props;
    const isMyTurn = playerOnTurn.id === playerId;

    return isMyTurn ? (
      <div className="playPage__turn playPage__turn--active">It's YOUR turn 🧠</div>
    ) : (
      <div className="playPage__turn playPage__turn--inactive">{`It's ${playerOnTurn.name}'s turn 👀`}</div>
    );
  }

  renderFeedback() {
    const { playerOnTurn, playerId, gameState, turnMetadata } = this.props;
    const isMyTurn = playerOnTurn.id === playerId;

    switch (gameState) {
      case GAME_STATUS_WAITING_FOR_FIRST_FLIP:
        return "Waiting for the first selection 🃏";
      case GAME_STATUS_WAITING_FOR_SECOND_FLIP:
        return "Waiting for the second selection 🃏🃏";
      case GAME_STATUS_FINISHED:
        return "🎉 THE GAME HAS ENDED 🎉 Refresh the page to start a new match.";
      case GAME_STATUS_TURN_ENDED:
        if (turnMetadata.theSecondCardMatchesTheFirst) {
          return isMyTurn ? "🎉 The cards match! 🎉 YOU GET AN EXTRA TURN!" : "Unfortinately that was a match ... 🤷🏻";
        } else {
          return isMyTurn ? "No match occurred ... 🤷🏻" : "The cards did not match! 🎉";
        }
      default:
    }
  }

  renderEvent(event) {
    const { id, type, payload } = event;
    const { playerOnTurn, flippedCard, turnMetadata } = payload;

    switch (type) {
      case "FIRST_CARD_FLIPPED":
        return (
          <li key={id}>{`Player '${playerOnTurn.name}' flipped the first card of type '${flippedCard.type}'.`}</li>
        );
      case "GAME_STATUS_FINISHED":
      case "SECOND_CARD_FLIPPED":
        if (turnMetadata.theSecondCardMatchesTheFirst) {
          return (
            <li
              key={id}
            >{`Player '${playerOnTurn.name}' flipped the second card of type '${flippedCard.type}' AND MADE A MATCH!`}</li>
          );
        } else {
          return (
            <li
              key={id}
            >{`Player '${playerOnTurn.name}' flipped the second card of type '${flippedCard.type}' but didn't match :(`}</li>
          );
        }
    }
  }

  renderFinalStats() {
    const { gameFinalStats } = this.props;

    if (!gameFinalStats) {
      return null;
    }

    const { history, winners } = gameFinalStats;

    const winnersList = winners.join(" AND ");

    return (
      <div className="playPage__stats">
        <div className="playPage__stats__label">Winners:</div>
        <div className="playPage__stats__winners">{winnersList}</div>
        <div className="playPage__stats__label">History (earliest events on top):</div>
        <div className="playPage__stats__history">
          <ol>{history.map(this.renderEvent)}</ol>
        </div>
      </div>
    );
  }

  render() {
    return (
      <SocketContext.Consumer>
        {({ socket }) => (
          <div className="playPage">
            <div className="playPage__turn">{this.renderTurn()}</div>
            {this.renderBoard(socket)}
            <div className="playPage__feedback">{this.renderFeedback()}</div>
            {this.renderFinalStats()}
          </div>
        )}
      </SocketContext.Consumer>
    );
  }
}

export default PlayPage;

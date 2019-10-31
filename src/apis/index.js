//
// API call handlers
//

const headers = {
  "Content-Type": "application/json;charset=utf-8"
};

export async function requestGameCreation(playerName) {
  return await fetch("/games", {
    method: "POST",
    headers,
    body: JSON.stringify({ playerName })
  });
}

export async function requestToJoinAnExistingGame(playerName, gameId) {
  return await fetch(`/games/${gameId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ gameId, playerName })
  });
}

//
// Utility functions
//

/**
 * Extremely simplified error handling. The status codes check can be more specific,
 * but for the sake of simplicity it has been left out.
 */
export async function withErrorHandling(response, fn) {
  const { status, ok } = response;
  const body = await response.json();

  if (ok) {
    fn(body);
  } else if (status === 422) {
    alert(`${body.error}`);
  } else if (status >= 500) {
    alert(`An internal error occurred`);
  }
}

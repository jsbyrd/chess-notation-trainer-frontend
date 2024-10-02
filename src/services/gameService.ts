const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export interface CreateGameRequestDTO {
  playerId: string;
  color: string;
}

export interface JoinGameRequestDTO {
  gameId: string;
  playerId: string;
}

export interface MakeMoveDTO {
  gameId: string;
  playerId: string;
  move: string;
}

export const createGame = async (body: CreateGameRequestDTO) => {
  try {
    const response = await fetch(`${BASE_URL}/game/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const joinGame = async (body: JoinGameRequestDTO) => {
  try {
    const response = await fetch(`${BASE_URL}/game/join`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export const makeMove = async (body: MakeMoveDTO) => {
  try {
    const response = await fetch(`${BASE_URL}/game/move`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

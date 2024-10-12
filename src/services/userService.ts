const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export type UserResponse = {
  username: string;
  password: string;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<UserResponse | Error> => {
  const url = new URL(`${BASE_URL}/api/users/login`);
  url.searchParams.append("username", username);
  url.searchParams.append("password", password);

  try {
    const response = await fetch(url.toString(), {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as UserResponse;
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
};

export const createUser = async (
  username: string,
  password: string
): Promise<UserResponse | Error> => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return (await response.json()) as UserResponse;
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
};

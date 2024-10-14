const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export type NnAnalyticsResponse = {
  gameId: string;
  username: string;
  date: Date;
  score: number;
  total: number;
  skips: number;
  accuracy: string;
  incorrect: number;
};

export const createNnAnalytics = async (
  username: string,
  password: string,
  score: number,
  total: number,
  skips: number
): Promise<NnAnalyticsResponse | Error> => {
  try {
    const response = await fetch(`${BASE_URL}/api/nn-analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      body: JSON.stringify({
        username: username,
        score: score,
        total: total,
        skips: skips,
      }),
    });

    return (await response.json()) as NnAnalyticsResponse;
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
};

export const getNnAnalyticsByUsername = async (
  username: string,
  password: string
): Promise<NnAnalyticsResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/nn-analytics/${username}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    return (await response.json()) as NnAnalyticsResponse[];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return [];
  }
};

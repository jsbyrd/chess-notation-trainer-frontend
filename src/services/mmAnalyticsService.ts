const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export type MmAnalyticsResponse = {
  gameId: string;
  username: string;
  date: Date;
  score: number;
  total: number;
  accuracy: string;
  skips: number; // Currently not used
};

export const createMmAnalytics = async (
  username: string,
  password: string,
  score: number,
  total: number
): Promise<MmAnalyticsResponse | Error> => {
  try {
    const response = await fetch(`${BASE_URL}/api/mm-analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      body: JSON.stringify({
        username: username,
        score: score,
        total: total,
      }),
    });

    return (await response.json()) as MmAnalyticsResponse;
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An unknown error occurred");
  }
};

export const getMmAnalyticsByUsername = async (
  username: string,
  password: string
): Promise<MmAnalyticsResponse[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/mm-analytics/${username}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    return (await response.json()) as MmAnalyticsResponse[];
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return [];
  }
};

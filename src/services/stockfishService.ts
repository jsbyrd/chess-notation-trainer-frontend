import axios, { AxiosError } from "axios";

type StockfishQueryParams = {
  fen: string;
  depth: number;
  mode: string;
};

export type StockfishQueryReturn = {
  success: boolean;
  bestmove: string;
  evaluation: number;
  mate: number | null;
  continuation: string;
  error: string;
};

const stockfishUri = "https://stockfish.online/api/s/v2.php";

export const getStockfishEval = async (
  fen: string
): Promise<Partial<StockfishQueryReturn>> => {
  const queryParams: StockfishQueryParams = {
    fen: fen,
    depth: 14,
    mode: "bestmove",
  };

  try {
    const queryResponse = await axios.get(stockfishUri, {
      params: queryParams,
    });
    return queryResponse.data;
  } catch (err) {
    const errorResponse: Partial<StockfishQueryReturn> = {
      success: false,
      error: axios.isAxiosError(err)
        ? (err as AxiosError).message
        : "Unknown error",
    };

    console.error("Something went wrong with the stockfish API request:", err);

    return errorResponse;
  }
};

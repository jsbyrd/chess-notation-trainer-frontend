import { Chess } from "chess.js";

export function processPGN(pgnContent: string): string[] {
  const games = pgnContent.split(/\n\n(?=\[Event)/);
  const fenStringsSet = new Set<string>();

  games.forEach((game) => {
    const chess = new Chess();
    const moves = game
      .replace(/\[.*?\]\s*/g, "")
      .replace(/\d+\.+/g, "")
      .trim()
      .split(/\s+/);

    fenStringsSet.add(chess.fen()); // Initial position

    moves.forEach((move) => {
      if (move.match(/1-0|0-1|1\/2-1\/2|\*/)) return; // Game result, skip

      try {
        chess.move(move);
        fenStringsSet.add(chess.fen());
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.error(`Invalid move: ${move}`);
      }
    });
  });

  return Array.from(fenStringsSet);
}

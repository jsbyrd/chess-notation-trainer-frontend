const Learn = () => {
  return (
    <div className="flex-grow overflow-auto mx-[20px] md:ml-[60px] mt-[30px] m-4">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Learning Chess Algebraic Notation
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Introduction to Algebraic Notation
        </h2>
        <p className="mb-4">
          Algebraic notation is the standard method for recording and describing
          moves in chess. It provides a concise and unambiguous way to
          communicate chess moves, making it essential for studying games,
          solving puzzles, and discussing chess with others.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          The Chessboard Coordinates
        </h2>
        <p className="mb-4">
          In algebraic notation, each square on the chessboard is identified by
          a unique coordinate:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Files (columns) are labeled with letters a through h, from left to
            right.
          </li>
          <li>Ranks (rows) are numbered 1 through 8, from bottom to top.</li>
        </ul>
        <p className="mb-4">
          From white's perspective, the bottom-left square is a1, and the
          top-right square is h8.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Piece Notation
        </h2>
        <p className="mb-4">Each piece is represented by a capital letter:</p>
        <ul className="list-disc list-inside mb-4">
          <li>K = King</li>
          <li>Q = Queen</li>
          <li>R = Rook</li>
          <li>B = Bishop</li>
          <li>N = Knight (K is already used for King)</li>
          <li>Pawns are not represented by a letter</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Basic Move Notation
        </h2>
        <p className="mb-4">To notate a move:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>Write the piece letter (except for pawns)</li>
          <li>Write the destination square</li>
        </ol>
        <p className="mb-4">Examples:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Bc4 - Bishop moves to c4</li>
          <li>Nf3 - Knight moves to f3</li>
          <li>e4 - Pawn moves to e4 (no piece letter needed)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Special Notations
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Castling: O-O for kingside, O-O-O for queenside</li>
          <li>Captures: Use 'x'. Example: Bxe5 (Bishop captures on e5)</li>
          <li>
            Check: Add '+'. Example: Qd8+ (Queen moves to d8, giving check)
          </li>
          <li>
            Checkmate: Add '#'. Example: Qh7# (Queen moves to h7, checkmate)
          </li>
          <li>
            Pawn promotion: Add '=' and the new piece. Example: e8=Q (Pawn
            promotes to Queen on e8)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Disambiguation
        </h2>
        <p className="mb-4">
          When two identical pieces can move to the same square, add the file
          (column) or rank (row) of the starting square to distinguish them:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Nbd7 - The Knight on the b-file moves to d7</li>
          <li>R1e3 - The Rook on the first rank moves to e3</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Practice Exercise
        </h2>
        <p className="mb-4">Try to notate the following moves:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>Move the pawn in front of the king two squares forward</li>
          <li>Move the knight to f3</li>
          <li>Castle on the kingside</li>
          <li>Capture a pawn on e5 with your bishop</li>
          <li>Promote a pawn to a queen on d8, giving checkmate</li>
        </ol>
        <p className="mt-4">
          Answers: 1. e4, 2. Nf3, 3. O-O, 4. Bxe5, 5. d8=Q#
        </p>
      </section>
    </div>
  );
};

export default Learn;

<AlertDialog open={showPopup} onOpenChange={setShowPopup}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Time's up!</AlertDialogTitle>
      <AlertDialogDescription>
        Your final score: {score.correct} / {score.total}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={restartGame}>Restart Game</AlertDialogAction>
      <AlertDialogAction onClick={() => navigate("/make-move/instructions")}>
        Back to Instructions
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>;

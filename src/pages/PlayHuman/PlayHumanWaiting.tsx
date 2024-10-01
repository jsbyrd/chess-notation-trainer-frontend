import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlayHumanWaitingProps {
  gameId: string | undefined;
}

const PlayHumanWaiting: React.FC<PlayHumanWaitingProps> = (props) => {
  const { gameId } = props;
  const [dots, setDots] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(gameId as string)
      .then(() => {
        toast({
          title: "Success!",
          description:
            "The Game ID has been successfully copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title:
            "Error: Something went wrong when trying to copy the Game ID onto your clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Waiting for player to join
          {".".repeat(dots)}
        </h1>

        <div className="flex justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm text-gray-600 mb-2">Game ID:</p>
          <div className="flex items-center space-x-2">
            <code className="flex-grow p-2 bg-white rounded border border-gray-300 font-mono text-sm">
              {gameId}
            </code>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="whitespace-nowrap"
            >
              Copy ID
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Share this Game ID with your opponent to start the game.
        </p>
      </div>
    </div>
  );
};

export default PlayHumanWaiting;

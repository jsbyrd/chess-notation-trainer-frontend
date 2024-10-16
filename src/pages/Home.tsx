import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Welcome to NotationChess
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Minigames</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Test your chess skills with our fun minigames:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Make that Move: Practice your ability to execute chess moves
              </li>
              <li>
                Name that Notation: Improve your chess notation recognition
              </li>
            </ul>
            <Link to="/make-move">
              <Button className="m-1">Make that Move</Button>
            </Link>
            <Link to="/name-notation">
              <Button className="m-1">Name that Notation</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Play Chess</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Choose your opponent and start playing:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Play against another human player</li>
              <li>Challenge our AI bot for a game</li>
            </ul>
            <Link to="/play-human">
              <Button className="m-1">Play vs Human</Button>
            </Link>
            <Link to="/play-bot">
              <Button className="m-1">Play vs Bot</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learn Chess</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Improve your chess skills with our comprehensive learning
              resources:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Learn more about chess algebraic notation</li>
            </ul>
            <Link to="/learn">
              <Button className="m-1">Start Learning</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Track your progress and analyze your games:</p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Track how well you do when playing games or completing minigames
              </li>
            </ul>
            <Link to="/analytics">
              <Button className="m-1">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="mb-4">
          Need help or found a bug? We're here to assist you!
        </p>
        <Link to="/settings">
          <Button className="m-1">Settings</Button>
        </Link>
        <Button className="m-1">Report Bug</Button>
      </div>
    </div>
  );
};

export default Home;

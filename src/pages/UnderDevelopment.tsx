import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UnderDevelopment = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Feature is not yet developed :(
      </h1>

      <h3 className="text-center font-bold px-4 pb-4">
        In the meantime, feel free to check out these other cool features
      </h3>

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
              <Button className="mr-2">Make that Move</Button>
            </Link>
            <Link to="/name-notation">
              <Button>Name that Notation</Button>
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
              <Button className="mr-2">Play vs Human</Button>
            </Link>
            <Link to="/play-bot">
              <Button>Play vs Bot</Button>
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
              <Button>Start Learning</Button>
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
              <Button>View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnderDevelopment;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - replace with your actual data
const gameMode1Data = [
  {
    game: 1,
    date: "2024-10-01",
    rawScore: 80,
    totalAttempts: 100,
    accuracy: 80,
  },
  {
    game: 2,
    date: "2024-10-02",
    rawScore: 85,
    totalAttempts: 100,
    accuracy: 85,
  },
  {
    game: 3,
    date: "2024-10-03",
    rawScore: 90,
    totalAttempts: 100,
    accuracy: 90,
  },
  {
    game: 4,
    date: "2024-10-04",
    rawScore: 88,
    totalAttempts: 100,
    accuracy: 88,
  },
  {
    game: 5,
    date: "2024-10-04",
    rawScore: 92,
    totalAttempts: 100,
    accuracy: 92,
  },
];

const gameMode2Data = [
  {
    game: 1,
    date: "2024-10-01",
    rawScore: 70,
    totalAttempts: 100,
    accuracy: 70,
  },
  {
    game: 2,
    date: "2024-10-02",
    rawScore: 75,
    totalAttempts: 100,
    accuracy: 75,
  },
  {
    game: 3,
    date: "2024-10-03",
    rawScore: 80,
    totalAttempts: 100,
    accuracy: 80,
  },
  {
    game: 4,
    date: "2024-10-04",
    rawScore: 78,
    totalAttempts: 100,
    accuracy: 78,
  },
  {
    game: 5,
    date: "2024-10-05",
    rawScore: 82,
    totalAttempts: 100,
    accuracy: 82,
  },
];

const GameModeTab = ({ data, title }) => {
  const totalCorrect = data.reduce((sum, game) => sum + game.rawScore, 0);
  const totalAttempts = data.reduce((sum, game) => sum + game.totalAttempts, 0);
  const pieData = [
    { name: "Correct", value: totalCorrect },
    { name: "Incorrect", value: totalAttempts - totalCorrect },
  ];
  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} syncId="anyId">
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="game" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="rawScore"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} syncId="anyId">
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="game" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorAccuracy)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Game Details</h3>
        <div className="h-80 overflow-auto">
          <Table>
            <TableCaption>A list of your recent games.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Date Played</TableHead>
                <TableHead>Raw Score</TableHead>
                <TableHead>Total Attempts</TableHead>
                <TableHead>Accuracy (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((game) => (
                <TableRow key={game.game}>
                  <TableCell>{game.game}</TableCell>
                  <TableCell>{game.date}</TableCell>
                  <TableCell>{game.rawScore}</TableCell>
                  <TableCell>{game.totalAttempts}</TableCell>
                  <TableCell>{game.accuracy}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Game Analytics</h1>
      <Tabs defaultValue="makemove">
        <TabsList>
          <TabsTrigger value="makemove">Make that Move</TabsTrigger>
          <TabsTrigger value="namenotation">Name that Notation</TabsTrigger>
        </TabsList>
        <TabsContent value="makemove">
          <GameModeTab data={gameMode1Data} title="Make that Move Statistics" />
        </TabsContent>
        <TabsContent value="namenotation">
          <GameModeTab
            data={gameMode2Data}
            title="Name that Notation Statistics"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

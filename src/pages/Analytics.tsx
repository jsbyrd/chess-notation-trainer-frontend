import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
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
import { useEffect, useState } from "react";
import { useUser } from "@/components/UserProvider";
import {
  getMmAnalyticsByUsername,
  MmAnalyticsResponse,
} from "@/services/mmAnalyticsService";
import {
  getNnAnalyticsByUsername,
  NnAnalyticsResponse,
} from "@/services/nnAnalyticsService";

interface GameModeTabProps {
  data: MmAnalyticsResponse[] | NnAnalyticsResponse[];
  title: string;
}

const MAKE_MOVE_TITLE = "Make that Move Statistics";
const NAME_NOTATION_TITLE = "Name that Notation Statistics";

const GameModeTab = (props: GameModeTabProps) => {
  const { data, title } = props;

  const totalCorrect = data.reduce((sum, game) => sum + game.score, 0);
  const totalSkips = data.reduce((sum, game) => sum + game.skips, 0);
  const totalAttempts = data.reduce((sum, game) => sum + game.total, 0);
  const pieData = [
    { name: "Correct", value: totalCorrect },
    { name: "Incorrect", value: totalAttempts - totalCorrect },
    { name: "Skips", value: totalSkips },
  ];
  const COLORS = ["#47B39C", "#EC6B56", "#FFC154"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} syncId="anyId">
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="score"
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
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
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

      {title === NAME_NOTATION_TITLE && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">
            Correct vs Incorrect Answers vs Skips
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-2">Game Details</h3>
        <div className="h-80 overflow-auto">
          <Table>
            <TableCaption>A list of your recent games.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Date Played</TableHead>
                <TableHead>Correct Guesses</TableHead>
                <TableHead>Total Attempts</TableHead>
                {data[0]?.skips !== undefined && <TableHead>Skips</TableHead>}
                <TableHead>Accuracy (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((game, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{new Date(game.date).toDateString()}</TableCell>
                  <TableCell>{game.score}</TableCell>
                  <TableCell>{game.total}</TableCell>
                  {game.skips !== undefined && (
                    <TableCell>{game.skips}</TableCell>
                  )}
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
  const user = useUser();
  const [mmAnalyticsData, setMmAnalyticsData] = useState<MmAnalyticsResponse[]>(
    []
  );
  const [nnAnalyticsData, setNnAnalyticsData] = useState<NnAnalyticsResponse[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!user.isLoggedIn) return;
      let [mmData, nnData] = await Promise.all([
        getMmAnalyticsByUsername(user.username, user.password),
        getNnAnalyticsByUsername(user.username, user.password),
      ]);
      // Calculate accuracy (score / total) %
      if (mmData) {
        mmData = mmData.map((game) => {
          return {
            ...game,
            accuracy:
              game.total === 0
                ? "0.00"
                : ((game.score / game.total) * 100).toFixed(2),
          };
        });
      } else {
        mmData = [];
      }
      // Calculate accuracy
      if (nnData) {
        nnData = nnData.map((game) => {
          return {
            ...game,
            accuracy:
              game.total === 0
                ? "0.00"
                : ((game.score / game.total) * 100).toFixed(2),
            incorrect: game.total - game.score - game.skips,
          };
        });
      } else {
        nnData = [];
      }

      setMmAnalyticsData(mmData);
      setNnAnalyticsData(nnData);
    };

    fetchData();
  }, [user.isLoggedIn, user.password, user.username]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Game Analytics</h1>
      <Tabs defaultValue="makemove">
        <TabsList>
          <TabsTrigger value="makemove">Make that Move</TabsTrigger>
          <TabsTrigger value="namenotation">Name that Notation</TabsTrigger>
        </TabsList>
        <TabsContent value="makemove">
          <GameModeTab data={mmAnalyticsData} title={MAKE_MOVE_TITLE} />
        </TabsContent>
        <TabsContent value="namenotation">
          <GameModeTab data={nnAnalyticsData} title={NAME_NOTATION_TITLE} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

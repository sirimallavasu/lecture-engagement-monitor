
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PersonalEngagementStatsProps {
  stats: {
    attentionScore: number;
    understandingLevel: number;
    questions: number;
    distractions: number;
    timeEngaged: string;
  };
}

const PersonalEngagementStats: React.FC<PersonalEngagementStatsProps> = ({ stats }) => {
  // Mock data for charts
  const engagementData = [
    { time: '10:00', score: 75 },
    { time: '10:10', score: 85 },
    { time: '10:20', score: 65 },
    { time: '10:30', score: 90 },
    { time: '10:40', score: 85 },
    { time: '10:50', score: 80 },
  ];

  const understandingData = [
    { topic: 'Introduction', level: 90 },
    { topic: 'Data Types', level: 75 },
    { topic: 'Arrays', level: 80 },
    { topic: 'Linked Lists', level: 60 },
    { topic: 'Trees', level: 50 },
  ];

  const focusData = [
    { name: 'Focused', value: 45 },
    { name: 'Distracted', value: 15 },
  ];

  const COLORS = ['#10B981', '#EF4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Engagement Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-background p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Attention Score</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold mr-1">{stats.attentionScore}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Understanding</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold mr-1">{stats.understandingLevel}</span>
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Time Focused</h3>
            <div className="flex items-end">
              <span className="text-2xl font-bold">{stats.timeEngaged}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="engagement">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="understanding">Understanding</TabsTrigger>
            <TabsTrigger value="focus">Focus Time</TabsTrigger>
          </TabsList>
          <TabsContent value="engagement" className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={engagementData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  activeDot={{ r: 8 }} 
                  name="Engagement" 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="understanding" className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={understandingData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="level" fill="#2563EB" name="Understanding Level" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="focus" className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {focusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PersonalEngagementStats;

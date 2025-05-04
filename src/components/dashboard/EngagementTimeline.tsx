
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EngagementTimelineProps {
  data: {
    time: string;
    happy: number;
    neutral: number;
    sad: number;
    distracted: number;
  }[];
}

const EngagementTimeline: React.FC<EngagementTimelineProps> = ({ data }) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Engagement Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
            <Legend />
            <Line type="monotone" dataKey="happy" stroke="#10B981" activeDot={{ r: 8 }} name="Happy" />
            <Line type="monotone" dataKey="neutral" stroke="#F59E0B" name="Neutral" />
            <Line type="monotone" dataKey="sad" stroke="#EF4444" name="Sad" />
            <Line type="monotone" dataKey="distracted" stroke="#9333EA" name="Distracted" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EngagementTimeline;

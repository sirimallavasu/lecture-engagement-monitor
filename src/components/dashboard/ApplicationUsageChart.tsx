
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ApplicationUsageChartProps {
  data: {
    name: string;
    count: number;
    isLectureRelated: boolean;
  }[];
}

const ApplicationUsageChart: React.FC<ApplicationUsageChartProps> = ({ data }) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Application Usage</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar 
              dataKey="count" 
              fill="#2563EB"
              name="Users"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fillOpacity={entry.isLectureRelated ? 1 : 0.6}
                  stroke={entry.isLectureRelated ? "#2563EB" : "#EF4444"}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ApplicationUsageChart;

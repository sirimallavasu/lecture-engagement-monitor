
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/dashboard/StatCard';
import ExpressionChart from '@/components/dashboard/ExpressionChart';
import ApplicationUsageChart from '@/components/dashboard/ApplicationUsageChart';
import EngagementTimeline from '@/components/dashboard/EngagementTimeline';
import StudentGrid from '@/components/dashboard/StudentGrid';
import AlertLog from '@/components/dashboard/AlertLog';
import { Smile, Meh, Frown, Monitor, Users } from 'lucide-react';

const Index = () => {
  // Mock data for demonstration purposes
  const [expressionData] = useState([
    { name: 'Happy', value: 18, color: '#10B981' },
    { name: 'Neutral', value: 10, color: '#F59E0B' },
    { name: 'Sad', value: 4, color: '#EF4444' },
  ]);

  const [appUsageData] = useState([
    { name: 'Lecture Slides', count: 24, isLectureRelated: true },
    { name: 'Note-Taking', count: 20, isLectureRelated: true },
    { name: 'Social Media', count: 7, isLectureRelated: false },
    { name: 'Email', count: 5, isLectureRelated: false },
    { name: 'Gaming', count: 2, isLectureRelated: false },
  ]);

  const [timelineData] = useState([
    { time: '10:00', happy: 15, neutral: 12, sad: 5, distracted: 3 },
    { time: '10:10', happy: 17, neutral: 10, sad: 5, distracted: 4 },
    { time: '10:20', happy: 20, neutral: 8, sad: 4, distracted: 2 },
    { time: '10:30', happy: 18, neutral: 10, sad: 4, distracted: 7 },
    { time: '10:40', happy: 15, neutral: 13, sad: 4, distracted: 8 },
    { time: '10:50', happy: 16, neutral: 12, sad: 4, distracted: 5 },
  ]);

  const [students] = useState([
    { id: 1, name: 'Alex Johnson', expression: 'happy', isDistracted: false },
    { id: 2, name: 'Jamie Smith', expression: 'neutral', isDistracted: true, lastActivity: 'Twitter' },
    { id: 3, name: 'Taylor Brown', expression: 'happy', isDistracted: false },
    { id: 4, name: 'Morgan Williams', expression: 'sad', isDistracted: true, lastActivity: 'YouTube' },
    { id: 5, name: 'Casey Garcia', expression: 'neutral', isDistracted: false },
    { id: 6, name: 'Jordan Lee', expression: 'happy', isDistracted: false },
    { id: 7, name: 'Riley Davis', expression: 'happy', isDistracted: false },
    { id: 8, name: 'Quinn Martinez', expression: 'neutral', isDistracted: true, lastActivity: 'Messenger' },
  ] as const);

  const [alerts] = useState([
    { 
      id: 1, 
      timestamp: '10:45 AM', 
      student: 'Jamie Smith', 
      type: 'distraction' as const, 
      message: 'Switched to Twitter for more than 2 minutes' 
    },
    { 
      id: 2, 
      timestamp: '10:42 AM', 
      student: 'Morgan Williams', 
      type: 'distraction' as const, 
      message: 'Opened YouTube during lecture' 
    },
    { 
      id: 3, 
      timestamp: '10:38 AM', 
      student: 'Morgan Williams', 
      type: 'expression' as const, 
      message: 'Showing signs of disengagement (sad expression)' 
    },
    { 
      id: 4, 
      timestamp: '10:30 AM', 
      student: 'Quinn Martinez', 
      type: 'distraction' as const, 
      message: 'Using Messenger during lecture' 
    },
  ]);

  // Calculate engagement score (simple demonstration)
  const totalStudents = students.length;
  const engagedStudents = students.filter(s => !s.isDistracted).length;
  const engagementScore = Math.round((engagedStudents / totalStudents) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Current Lecture Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Students" 
              value={totalStudents} 
              icon={<Users className="h-5 w-5" />} 
              description="Students in attendance"
            />
            <StatCard 
              title="Engagement Score" 
              value={`${engagementScore}%`} 
              description="Based on expressions and focus"
              className={engagementScore > 80 ? "border-engagement-positive" : 
                         engagementScore > 60 ? "border-engagement-neutral" : 
                         "border-engagement-negative"}
            />
            <StatCard 
              title="Positive Expressions" 
              value={expressionData[0].value}
              icon={<Smile className="h-5 w-5 text-engagement-positive" />} 
              description="Happy students"
              className="border-engagement-positive"
            />
            <StatCard 
              title="Distracted Students" 
              value={students.filter(s => s.isDistracted).length} 
              icon={<Monitor className="h-5 w-5 text-engagement-distracted" />}
              description="Using non-lecture applications"
              className="border-engagement-distracted"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <ExpressionChart data={expressionData} />
          <ApplicationUsageChart data={appUsageData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <EngagementTimeline data={timelineData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          <StudentGrid students={students} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <AlertLog alerts={alerts} />
        </div>
      </main>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentHeader from '@/components/student/StudentHeader';
import PersonalEngagementStats from '@/components/student/PersonalEngagementStats';
import CurrentLectureView from '@/components/student/CurrentLectureView';
import QuestionPanel from '@/components/student/QuestionPanel';
import FeedbackWidget from '@/components/student/FeedbackWidget';
import NotificationsPanel from '@/components/student/NotificationsPanel';
import JoinClassModal from '@/components/student/JoinClassModal';
import LectureMaterials from '@/components/student/LectureMaterials';
import SettingsPanel from '@/components/student/SettingsPanel';

const StudentDashboard = () => {
  // Mock data for student view
  const [studentName] = useState('Alex Johnson');
  const [currentLecture, setCurrentLecture] = useState({
    title: 'Introduction to Data Structures',
    instructor: 'Dr. Vasu',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    progress: 65, // percentage of lecture completed
  });

  const [personalEngagement] = useState({
    attentionScore: 85,
    understandingLevel: 72,
    questions: 2,
    distractions: 1,
    timeEngaged: '45 minutes',
  });

  const [notifications] = useState([
    {
      id: 1,
      message: 'You seem distracted. Try to focus on the lecture.',
      timestamp: '10:25 AM',
      type: 'attention' as const,
    },
    {
      id: 2,
      message: 'Great focus for the last 10 minutes!',
      timestamp: '10:35 AM',
      type: 'positive' as const,
    },
  ]);

  const [materials] = useState([
    { id: 1, title: 'Lecture Slides', type: 'pdf' },
    { id: 2, title: 'Additional Reading', type: 'link' },
    { id: 3, title: 'Practice Examples', type: 'pdf' },
  ]);

  // Handler for successful class join
  const handleJoinClassSuccess = (classDetails: { id: string; name: string }) => {
    setCurrentLecture({
      ...currentLecture,
      title: classDetails.name,
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 transition-colors">
      <StudentHeader 
        studentName={studentName} 
        currentLecture={currentLecture}
        notifications={notifications}
      />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <JoinClassModal onJoinSuccess={handleJoinClassSuccess} />
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CurrentLectureView 
                  lecture={currentLecture} 
                  materials={materials} 
                />
                <PersonalEngagementStats 
                  stats={personalEngagement} 
                />
              </div>
              
              <div className="space-y-6">
                <FeedbackWidget />
                <QuestionPanel />
                <NotificationsPanel notifications={notifications} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="materials" className="space-y-6">
            <LectureMaterials />
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <PersonalEngagementStats stats={personalEngagement} />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;

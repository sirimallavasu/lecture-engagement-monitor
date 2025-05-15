
import React, { useState, useEffect } from 'react';
import StudentHeader from '@/components/student/StudentHeader';
import PersonalEngagementStats from '@/components/student/PersonalEngagementStats';
import CurrentLectureView from '@/components/student/CurrentLectureView';
import QuestionPanel from '@/components/student/QuestionPanel';
import FeedbackWidget from '@/components/student/FeedbackWidget';
import NotificationsPanel from '@/components/student/NotificationsPanel';
import JoinClassModal from '@/components/student/JoinClassModal';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme/ThemeProvider';

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

  // Fixed the type to be a specific union type instead of a general string
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

  const [materials, setMaterials] = useState([
    { id: 1, title: 'Lecture Slides', type: 'pdf' },
    { id: 2, title: 'Additional Reading', type: 'link' },
    { id: 3, title: 'Practice Examples', type: 'pdf' },
  ]);

  const { theme, setTheme } = useTheme();

  // Handler for successful class join
  const handleJoinClassSuccess = (classDetails: { id: string; name: string }) => {
    setCurrentLecture({
      ...currentLecture,
      title: classDetails.name,
    });
  };

  // Function to add new lecture material
  const handleAddMaterial = (material: { title: string; type: string }) => {
    setMaterials(prev => [...prev, { ...material, id: prev.length + 1 }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader 
        studentName={studentName} 
        currentLecture={currentLecture}
        notifications={notifications}
      />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
            <JoinClassModal onJoinSuccess={handleJoinClassSuccess} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentLectureView 
              lecture={currentLecture} 
              materials={materials} 
              onAddMaterial={handleAddMaterial}
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
      </main>
    </div>
  );
};

export default StudentDashboard;

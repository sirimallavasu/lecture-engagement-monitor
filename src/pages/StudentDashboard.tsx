
import React, { useState } from 'react';
import StudentHeader from '@/components/student/StudentHeader';
import PersonalEngagementStats from '@/components/student/PersonalEngagementStats';
import CurrentLectureView from '@/components/student/CurrentLectureView';
import QuestionPanel from '@/components/student/QuestionPanel';
import FeedbackWidget from '@/components/student/FeedbackWidget';
import NotificationsPanel from '@/components/student/NotificationsPanel';

const StudentDashboard = () => {
  // Mock data for student view
  const [studentName] = useState('Alex Johnson');
  const [currentLecture] = useState({
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

  const [materials] = useState([
    { id: 1, title: 'Lecture Slides', type: 'pdf' },
    { id: 2, title: 'Additional Reading', type: 'link' },
    { id: 3, title: 'Practice Examples', type: 'pdf' },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader 
        studentName={studentName} 
        currentLecture={currentLecture}
        notifications={notifications}
      />
      
      <main className="container py-6">
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
      </main>
    </div>
  );
};

export default StudentDashboard;

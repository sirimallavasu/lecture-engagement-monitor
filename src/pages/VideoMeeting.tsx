
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StudentExpressions from '@/components/meeting/StudentExpressions';
import ApplicationMonitor from '@/components/meeting/ApplicationMonitor';
import { Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react';

// Mock student data for expressions
const mockStudents = [
  { id: 1, name: 'Alex Johnson', expression: 'happy' as const },
  { id: 2, name: 'Jamie Smith', expression: 'neutral' as const },
  { id: 3, name: 'Casey Brown', expression: 'sad' as const },
  { id: 4, name: 'Taylor Wilson', expression: 'happy' as const },
  { id: 5, name: 'Jordan Lee', expression: 'neutral' as const },
  { id: 6, name: 'Morgan Davis', expression: 'neutral' as const },
];

// Mock application usage data
const mockApplications = [
  { id: 1, studentId: 2, studentName: 'Jamie Smith', applicationName: 'Instagram', timestamp: '10:15 AM', isLectureRelated: false },
  { id: 2, studentId: 3, studentName: 'Casey Brown', applicationName: 'YouTube', timestamp: '10:18 AM', isLectureRelated: false },
  { id: 3, studentId: 1, studentName: 'Alex Johnson', applicationName: 'Google Docs', timestamp: '10:20 AM', isLectureRelated: true },
  { id: 4, studentId: 5, studentName: 'Jordan Lee', applicationName: 'WhatsApp', timestamp: '10:25 AM', isLectureRelated: false },
];

const VideoMeeting = () => {
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [students, setStudents] = useState(mockStudents);
  const [applications, setApplications] = useState(mockApplications);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate getting video feed
  useEffect(() => {
    let stream: MediaStream | null = null;

    const getVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: videoEnabled,
          audio: micEnabled
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    getVideo();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoEnabled, micEnabled]);

  // Simulate random expression changes for students
  useEffect(() => {
    const expressionTypes = ['happy', 'neutral', 'sad'] as const;
    
    const interval = setInterval(() => {
      setStudents(currentStudents => 
        currentStudents.map(student => {
          // 30% chance to change expression
          if (Math.random() > 0.7) {
            const newExpression = expressionTypes[Math.floor(Math.random() * expressionTypes.length)];
            return { ...student, expression: newExpression };
          }
          return student;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate random application usage
  useEffect(() => {
    const appNames = ['Instagram', 'YouTube', 'WhatsApp', 'TikTok', 'Games', 'Google Docs', 'Zoom Notes'];
    
    const interval = setInterval(() => {
      // 20% chance to add new application usage
      if (Math.random() > 0.8) {
        const studentIndex = Math.floor(Math.random() * students.length);
        const student = students[studentIndex];
        const appIndex = Math.floor(Math.random() * appNames.length);
        const appName = appNames[appIndex];
        const isRelated = appIndex >= 5; // Last two are related to lecture
        
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        const newApp = {
          id: Date.now(),
          studentId: student.id,
          studentName: student.name,
          applicationName: appName,
          timestamp: timeString,
          isLectureRelated: isRelated
        };
        
        setApplications(apps => [...apps, newApp]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [students]);

  const toggleMic = () => setMicEnabled(!micEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const endCall = () => window.location.href = '/';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Data Structures - Live Class</h1>
        
        {/* Video Container */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover ${!videoEnabled ? 'hidden' : ''}`}
          />
          
          {!videoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-xl">Camera Off</div>
            </div>
          )}
          
          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button 
              variant={micEnabled ? "default" : "secondary"}
              size="icon"
              onClick={toggleMic}
            >
              {micEnabled ? <Mic /> : <MicOff />}
            </Button>
            
            <Button 
              variant={videoEnabled ? "default" : "secondary"}
              size="icon"
              onClick={toggleVideo}
            >
              {videoEnabled ? <Video /> : <VideoOff />}
            </Button>
            
            <Button 
              variant="destructive"
              size="icon"
              onClick={endCall}
            >
              <Phone className="rotate-225" />
            </Button>
          </div>
        </div>
        
        {/* Analytics and Monitoring Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <StudentExpressions students={students} />
          <ApplicationMonitor applications={applications} />
        </div>
      </div>
    </div>
  );
};

export default VideoMeeting;

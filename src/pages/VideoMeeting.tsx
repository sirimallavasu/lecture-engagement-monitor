import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, VideoOff, Mic, MicOff, Smile, Meh, Frown } from 'lucide-react';
import StudentExpressions from '@/components/meeting/StudentExpressions';

const VideoMeeting = () => {
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [currentExpression, setCurrentExpression] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [expressionLog, setExpressionLog] = useState<{
    timestamp: string;
    expression: 'happy' | 'neutral' | 'sad';
  }[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock lecture data
  const lectureData = {
    title: "Introduction to Data Structures",
    instructor: "Dr. Vasu",
    startTime: "10:00 AM",
    duration: "90 minutes",
    participants: 24,
  };
  
  // Simulating random expression changes for demo
  useEffect(() => {
    const expressionTypes: ('happy' | 'neutral' | 'sad')[] = ['happy', 'neutral', 'sad'];
    
    const intervalId = setInterval(() => {
      const newExpression = expressionTypes[Math.floor(Math.random() * expressionTypes.length)];
      setCurrentExpression(newExpression);
      
      // Log the expression change
      setExpressionLog(prev => [
        {
          timestamp: new Date().toLocaleTimeString(),
          expression: newExpression
        },
        ...prev.slice(0, 9) // Keep only the 10 most recent logs
      ]);
    }, 8000); // Change expression roughly every 8 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Mock participants with random expressions
  const students = [
    { id: 1, name: "Alex Johnson", expression: 'happy' as const },
    { id: 2, name: "Priya Sharma", expression: 'neutral' as const },
    { id: 3, name: "Michael Lee", expression: 'sad' as const },
    { id: 4, name: "Sophia Chen", expression: 'happy' as const },
    { id: 5, name: "Emma Wilson", expression: 'neutral' as const },
    { id: 6, name: "David Brown", expression: 'happy' as const },
    { id: 7, name: "Sarah Miller", expression: 'neutral' as const },
    { id: 8, name: "James Taylor", expression: 'sad' as const },
  ];
  
  useEffect(() => {
    // Access webcam if camera is on
    if (cameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          setCameraOn(false);
        });
    }
  }, [cameraOn]);
  
  const toggleCamera = () => {
    if (cameraOn && videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(!cameraOn);
  };
  
  const getExpressionEmoji = (expression: 'happy' | 'neutral' | 'sad') => {
    switch (expression) {
      case 'happy': return <Smile className="h-6 w-6 text-engagement-positive" />;
      case 'neutral': return <Meh className="h-6 w-6 text-engagement-neutral" />;
      case 'sad': return <Frown className="h-6 w-6 text-engagement-negative" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{lectureData.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">{lectureData.instructor}</Badge>
            <Badge variant="outline">Started: {lectureData.startTime}</Badge>
            <Badge variant="outline">Duration: {lectureData.duration}</Badge>
            <Badge>{lectureData.participants} participants</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Live Lecture</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={toggleCamera}
                    >
                      {cameraOn ? <Video /> : <VideoOff />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setMicOn(!micOn)}
                    >
                      {micOn ? <Mic /> : <MicOff />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                  {cameraOn ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <VideoOff className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Camera is off</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Your current expression indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-md backdrop-blur">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">Your expression:</span>
                      {getExpressionEmoji(currentExpression)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <StudentExpressions students={students} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Expression Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {expressionLog.length === 0 ? (
                    <p className="text-muted-foreground">No expressions recorded yet.</p>
                  ) : (
                    expressionLog.map((log, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          {getExpressionEmoji(log.expression)}
                          <span>{log.expression}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Other content like chat could go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoMeeting;

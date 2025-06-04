
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, TrendingUp, Clock, Eye, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EngagementReportsProps {
  classData: any;
}

const EngagementReports = ({ classData }: EngagementReportsProps) => {
  const [reports, setReports] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch enrolled students
      const { data: studentsData, error: studentsError } = await supabase
        .from('student_classes')
        .select(`
          student_id,
          joined_at,
          profiles:student_id (
            id,
            name
          )
        `)
        .eq('class_id', classData.id);

      if (studentsError) throw studentsError;

      // Fetch engagement reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('engagement_reports')
        .select(`
          *,
          profiles:student_id (
            id,
            name
          )
        `)
        .eq('class_id', classData.id)
        .order('session_date', { ascending: false });

      if (reportsError) throw reportsError;

      setStudents(studentsData || []);
      setReports(reportsData || []);
    } catch (error) {
      console.error('Error fetching engagement data:', error);
      toast.error('Failed to load engagement reports');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classData.id]);

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Students</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.length > 0 
                ? Math.round(reports.reduce((sum: number, report: any) => sum + (report.engagement_score || 0), 0) / reports.length)
                : '--'
              }%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Engagement</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter((report: any) => (report.engagement_score || 0) < 60).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
          <CardDescription>
            Students enrolled in {classData.title}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No students enrolled</h3>
              <p className="text-muted-foreground">
                Share your class ID ({classData.class_id}) with students to let them join.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {students.map((student: any) => {
                const studentReports = reports.filter((report: any) => report.student_id === student.student_id);
                const avgEngagement = studentReports.length > 0 
                  ? Math.round(studentReports.reduce((sum: number, report: any) => sum + (report.engagement_score || 0), 0) / studentReports.length)
                  : 0;
                const engagement = getEngagementLevel(avgEngagement);

                return (
                  <div key={student.student_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {student.profiles?.name?.charAt(0) || 'S'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{student.profiles?.name || 'Unknown Student'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Joined {new Date(student.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{studentReports.length} sessions</p>
                        <p className="text-sm text-muted-foreground">Total sessions</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{avgEngagement}%</span>
                          <Badge variant="secondary" className={`${engagement.color} ${engagement.bgColor}`}>
                            {engagement.level}
                          </Badge>
                        </div>
                        <Progress value={avgEngagement} className="w-20 mt-1" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Engagement Sessions</CardTitle>
          <CardDescription>
            Latest student engagement data for your class
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <BarChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No engagement data yet</h3>
              <p className="text-muted-foreground">
                Engagement reports will appear here when students attend your classes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.slice(0, 10).map((report: any) => {
                const engagement = getEngagementLevel(report.engagement_score || 0);
                return (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {report.profiles?.name?.charAt(0) || 'S'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{report.profiles?.name || 'Unknown Student'}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.session_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{report.focus_score || 0}%</div>
                        <div className="text-xs text-muted-foreground">Focus</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{report.engagement_score || 0}%</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm font-medium">{report.participation_score || 0}%</div>
                        <div className="text-xs text-muted-foreground">Participation</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{report.attention_duration || 0}m</span>
                      </div>
                      
                      <Badge variant="secondary" className={`${engagement.color} ${engagement.bgColor}`}>
                        {engagement.level}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementReports;

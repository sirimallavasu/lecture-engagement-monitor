
-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.engagement_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lecture_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Lectures policies
CREATE POLICY "Everyone can view lectures" ON public.lectures
    FOR SELECT USING (true);

CREATE POLICY "Teachers can create lectures" ON public.lectures
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'teacher'
        )
    );

CREATE POLICY "Teachers can update own lectures" ON public.lectures
    FOR UPDATE USING (
        instructor_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'teacher'
        )
    );

CREATE POLICY "Teachers can delete own lectures" ON public.lectures
    FOR DELETE USING (
        instructor_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'teacher'
        )
    );

-- Student lectures policies
CREATE POLICY "Students can view own enrollments" ON public.student_lectures
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll in lectures" ON public.student_lectures
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can view their lecture enrollments" ON public.student_lectures
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.lectures 
            WHERE id = lecture_id AND instructor_id = auth.uid()
        )
    );

-- Engagement metrics policies
CREATE POLICY "Students can view own metrics" ON public.engagement_metrics
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Teachers can view metrics for their lectures" ON public.engagement_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.lectures 
            WHERE id = lecture_id AND instructor_id = auth.uid()
        )
    );

CREATE POLICY "System can insert metrics" ON public.engagement_metrics
    FOR INSERT WITH CHECK (true);

-- Lecture materials policies
CREATE POLICY "Everyone can view lecture materials" ON public.lecture_materials
    FOR SELECT USING (true);

CREATE POLICY "Teachers can manage materials for own lectures" ON public.lecture_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.lectures 
            WHERE id = lecture_id AND instructor_id = auth.uid()
        )
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- Questions policies
CREATE POLICY "Students can view own questions" ON public.questions
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create questions" ON public.questions
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Teachers can view questions for their lectures" ON public.questions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.lectures 
            WHERE id = lecture_id AND instructor_id = auth.uid()
        )
    );

CREATE POLICY "Teachers can answer questions for their lectures" ON public.questions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.lectures 
            WHERE id = lecture_id AND instructor_id = auth.uid()
        )
    );

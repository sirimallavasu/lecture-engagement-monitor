
-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get lecture with materials
CREATE OR REPLACE FUNCTION get_lecture_with_materials(lecture_uuid UUID)
RETURNS TABLE (
    lecture_id UUID,
    title TEXT,
    description TEXT,
    instructor_id UUID,
    instructor_name TEXT,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    materials JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.id,
        l.title,
        l.description,
        l.instructor_id,
        p.name,
        l.start_time,
        l.end_time,
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', lm.id,
                        'title', lm.title,
                        'type', lm.type,
                        'url', lm.url,
                        'file_path', lm.file_path,
                        'description', lm.description
                    )
                )
                FROM public.lecture_materials lm
                WHERE lm.lecture_id = l.id
            ),
            '[]'::jsonb
        ) as materials
    FROM public.lectures l
    LEFT JOIN public.profiles p ON l.instructor_id = p.id
    WHERE l.id = lecture_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get student engagement summary
CREATE OR REPLACE FUNCTION get_student_engagement_summary(student_uuid UUID, lecture_uuid UUID)
RETURNS TABLE (
    avg_focus_score NUMERIC,
    total_metrics_count BIGINT,
    latest_metric_time TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        AVG(em.focus_score),
        COUNT(*),
        MAX(em.timestamp)
    FROM public.engagement_metrics em
    WHERE em.student_id = student_uuid 
    AND em.lecture_id = lecture_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
    user_uuid UUID,
    message_text TEXT,
    notification_type TEXT
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (user_id, message, type)
    VALUES (user_uuid, message_text, notification_type)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

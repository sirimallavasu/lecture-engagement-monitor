
-- Insert sample data for development and testing

-- Sample teacher profile (you'll need to replace with actual user ID after signup)
-- INSERT INTO public.profiles (id, name, role) 
-- VALUES ('00000000-0000-0000-0000-000000000001', 'Dr. Vasu', 'teacher');

-- Sample lectures
-- INSERT INTO public.lectures (id, title, description, instructor_id, start_time, end_time)
-- VALUES 
--     ('11111111-1111-1111-1111-111111111111', 'Introduction to Data Structures', 'Learn fundamental data structures and algorithms', '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day 1.5 hours'),
--     ('22222222-2222-2222-2222-222222222222', 'Advanced Calculus', 'Mathematical concepts for advanced students', '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days 2 hours'),
--     ('33333333-3333-3333-3333-333333333333', 'Quantum Physics', 'Introduction to quantum mechanics', '00000000-0000-0000-0000-000000000001', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 1.5 hours');

-- Sample lecture materials
-- INSERT INTO public.lecture_materials (lecture_id, title, type, url, description)
-- VALUES 
--     ('11111111-1111-1111-1111-111111111111', 'Lecture Slides', 'pdf', '/materials/ds_slides.pdf', 'Main presentation slides'),
--     ('11111111-1111-1111-1111-111111111111', 'Additional Reading', 'link', 'https://example.com/reading', 'Supplementary reading material'),
--     ('11111111-1111-1111-1111-111111111111', 'Practice Examples', 'pdf', '/materials/ds_examples.pdf', 'Code examples and exercises'),
--     ('22222222-2222-2222-2222-222222222222', 'Calculus Textbook Chapter', 'pdf', '/materials/calc_chapter.pdf', 'Required reading'),
--     ('33333333-3333-3333-3333-333333333333', 'Quantum Mechanics Primer', 'link', 'https://example.com/quantum', 'Introduction video');

-- Note: Uncomment the above INSERT statements after you have actual user IDs from Supabase Auth
-- You can get user IDs by signing up users through your app and then checking the auth.users table

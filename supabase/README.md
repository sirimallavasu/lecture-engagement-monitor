
# Supabase Database Setup

This directory contains SQL migration files to set up your complete database schema for the Student Engagement Platform.

## Migration Files

1. **001_initial_schema.sql** - Creates all the main tables and relationships
2. **002_rls_policies.sql** - Sets up Row Level Security policies for data protection
3. **003_functions_and_triggers.sql** - Creates helpful functions and triggers
4. **004_sample_data.sql** - Sample data for testing (commented out)

## How to Apply Migrations

### Option 1: Through Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste each migration file content in order (001, 002, 003, 004)
4. Run each migration one by one

### Option 2: Using Supabase CLI (if installed)
```bash
supabase db push
```

## Tables Created

- **profiles** - User profiles with roles (student/teacher)
- **lectures** - Lecture information and scheduling
- **student_lectures** - Junction table for student enrollments
- **engagement_metrics** - Student engagement data and analytics
- **lecture_materials** - Files and resources for lectures
- **notifications** - System notifications for users
- **questions** - Q&A system for lectures

## Security Features

- Row Level Security (RLS) enabled on all tables
- Students can only access their own data
- Teachers can only manage their own lectures and see related data
- Automatic profile creation on user signup

## Functions Available

- `get_lecture_with_materials(lecture_id)` - Get lecture details with materials
- `get_student_engagement_summary(student_id, lecture_id)` - Get engagement stats
- `create_notification(user_id, message, type)` - Create notifications

## Next Steps

1. Apply all migrations to your Supabase database
2. Test user signup to verify profile creation
3. Create some test lectures and materials
4. Verify that RLS policies are working correctly

## Important Notes

- Replace the sample UUIDs in 004_sample_data.sql with real user IDs after testing
- Make sure to uncomment sample data only after you have valid user accounts
- Always test RLS policies thoroughly before going to production

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nvyxhwynxlnkqdcqvneg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eXhod3lueGxua3FkY3F2bmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDc3MDcsImV4cCI6MjA2NTQ4MzcwN30.masc20c9DRzzCGR2tfgM50YdMEqeGaD1lcSQ0AUk-_o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

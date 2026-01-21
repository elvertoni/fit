import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rowssxpmqahtwlswarmr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvd3NzeHBtcWFodHdsc3dhcm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMjQ4NDcsImV4cCI6MjA4NDYwMDg0N30.0Y3Cm1k_mMbg2tHyx13lY0MlPEvCA8UUxyC0zKBO7CY';

export const supabase = createClient(supabaseUrl, supabaseKey);
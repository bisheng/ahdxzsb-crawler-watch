// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xxwlupdikyuohegccnrz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4d2x1cGRpa3l1b2hlZ2NjbnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTIyNDMsImV4cCI6MjA2NTQ2ODI0M30.UqbvNazmJrG-drrhdy0QLlQvgi7zFE8p_gfWR_DshCI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
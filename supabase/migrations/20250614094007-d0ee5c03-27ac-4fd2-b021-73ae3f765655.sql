
-- Create a table for storing academic papers
CREATE TABLE public.papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL DEFAULT '{}',
  issue TEXT NOT NULL,
  pages TEXT NOT NULL,
  publication_date DATE NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  abstract TEXT,
  url TEXT,
  is_new BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;

-- Create policy that allows all authenticated users to view papers
CREATE POLICY "Authenticated users can view papers" 
  ON public.papers 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Create policy that allows all authenticated users to insert papers (for crawler functionality)
CREATE POLICY "Authenticated users can insert papers" 
  ON public.papers 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Create policy that allows all authenticated users to update papers
CREATE POLICY "Authenticated users can update papers" 
  ON public.papers 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Create an index on title for better search performance
CREATE INDEX idx_papers_title ON public.papers USING gin(to_tsvector('english', title));

-- Create an index on publication_date for sorting
CREATE INDEX idx_papers_publication_date ON public.papers (publication_date DESC);

-- Create an index on is_new for filtering new papers
CREATE INDEX idx_papers_is_new ON public.papers (is_new);

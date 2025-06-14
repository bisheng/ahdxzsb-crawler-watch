
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewPaper {
  title: string;
  authors: string[];
  issue: string;
  pages: string;
  publication_date: string;
  keywords?: string[];
  abstract?: string;
  url?: string;
}

export const usePapers = () => {
  const queryClient = useQueryClient();

  const addPaper = useMutation({
    mutationFn: async (paper: NewPaper) => {
      const { data, error } = await supabase
        .from('papers')
        .insert([paper])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['papers'] });
      toast.success("论文已添加", {
        description: "新论文已成功保存到数据库"
      });
    },
    onError: (error) => {
      console.error('添加论文失败:', error);
      toast.error("添加论文失败", {
        description: "请稍后重试"
      });
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (paperId: string) => {
      const { error } = await supabase
        .from('papers')
        .update({ is_new: false })
        .eq('id', paperId);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['papers'] });
    },
    onError: (error) => {
      console.error('标记论文失败:', error);
      toast.error("操作失败", {
        description: "请稍后重试"
      });
    },
  });

  return {
    addPaper,
    markAsRead,
  };
};

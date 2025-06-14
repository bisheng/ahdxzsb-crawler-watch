
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, User, Tag, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  issue: string;
  pages: string;
  publication_date: string;
  keywords?: string[];
  is_new?: boolean;
  abstract?: string;
  url?: string;
}

const PaperList = () => {
  const { data: papers = [], isLoading, error } = useQuery({
    queryKey: ['papers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('papers')
        .select('*')
        .order('publication_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>已收录论文</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-slate-600">加载中...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>已收录论文</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600">加载论文数据时出错</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>已收录论文</span>
          <Badge variant="secondary">{papers.length} 篇</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {papers.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">暂无论文数据</p>
            <p className="text-slate-400 text-sm">启动爬虫开始收集论文</p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    paper.is_new 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-slate-900 leading-tight flex-1 mr-3">
                      {paper.title}
                    </h3>
                    {paper.is_new && (
                      <Badge className="bg-red-500 text-white shrink-0">
                        新收录
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{paper.issue}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs">页码: {paper.pages}</span>
                      <span className="text-xs">{new Date(paper.publication_date).toLocaleDateString('zh-CN')}</span>
                    </div>
                    
                    {paper.keywords && paper.keywords.length > 0 && (
                      <div className="flex items-center space-x-1 flex-wrap">
                        <Tag className="h-3 w-3" />
                        <div className="flex flex-wrap gap-1">
                          {paper.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                      <ExternalLink className="h-3 w-3" />
                      <span>查看详情</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default PaperList;

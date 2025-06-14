
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Calendar, User, Tag, ExternalLink } from "lucide-react";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  issue: string;
  pages: string;
  date: string;
  keywords?: string[];
  isNew?: boolean;
}

const PaperList = () => {
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    // 模拟论文数据
    const mockPapers: Paper[] = [
      {
        id: "1",
        title: "数字化转型背景下的高等教育治理现代化研究",
        authors: ["张三", "李四"],
        issue: "2024年第1期",
        pages: "1-8",
        date: "2024-01-15",
        keywords: ["数字化转型", "高等教育", "治理现代化"],
        isNew: true
      },
      {
        id: "2", 
        title: "新时代大学生思想政治教育创新路径探析",
        authors: ["王五", "赵六"],
        issue: "2024年第1期",
        pages: "9-16",
        date: "2024-01-15",
        keywords: ["思想政治教育", "创新路径", "大学生"]
      },
      {
        id: "3",
        title: "文化自信视域下的传统文化传承与发展",
        authors: ["孙七", "周八"],
        issue: "2023年第6期",
        pages: "17-24",
        date: "2023-12-15",
        keywords: ["文化自信", "传统文化", "传承发展"]
      },
      {
        id: "4",
        title: "乡村振兴战略下的农村基层治理现代化",
        authors: ["吴九", "郑十"],
        issue: "2023年第6期", 
        pages: "25-32",
        date: "2023-12-15",
        keywords: ["乡村振兴", "基层治理", "现代化"]
      }
    ];
    
    setPapers(mockPapers);
  }, []);

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
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  paper.isNew 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-slate-900 leading-tight flex-1 mr-3">
                    {paper.title}
                  </h3>
                  {paper.isNew && (
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
                    <span className="text-xs">{paper.date}</span>
                  </div>
                  
                  {paper.keywords && (
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
      </CardContent>
    </Card>
  );
};

export default PaperList;

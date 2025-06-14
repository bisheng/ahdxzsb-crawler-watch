
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const CrawlerStatus = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [crawlerStatus, setCrawlerStatus] = useState<'idle' | 'crawling' | 'monitoring' | 'error'>('idle');
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null);

  const startCrawler = () => {
    setIsRunning(true);
    setCrawlerStatus('crawling');
    setLastCheck(new Date());
    
    toast.success("爬虫已启动", {
      description: "开始爬取期刊目录数据"
    });

    // 模拟爬取过程
    setTimeout(() => {
      setCrawlerStatus('monitoring');
      toast.success("初始爬取完成", {
        description: "开始定时监控新论文"
      });
      
      // 设置定时检查
      const interval = setInterval(() => {
        setLastCheck(new Date());
        console.log("执行定时检查...");
        
        // 模拟检查结果
        if (Math.random() > 0.8) {
          toast.info("发现新论文", {
            description: "检测到期刊有新的论文收录"
          });
        }
      }, 30000); // 30秒检查一次
      
      setCheckInterval(interval);
    }, 3000);
  };

  const stopCrawler = () => {
    setIsRunning(false);
    setCrawlerStatus('idle');
    
    if (checkInterval) {
      clearInterval(checkInterval);
      setCheckInterval(null);
    }
    
    toast.info("爬虫已停止", {
      description: "监控服务已暂停"
    });
  };

  const resetCrawler = () => {
    stopCrawler();
    setLastCheck(null);
    toast.info("爬虫已重置", {
      description: "所有状态已清空"
    });
  };

  useEffect(() => {
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [checkInterval]);

  const getStatusColor = () => {
    switch (crawlerStatus) {
      case 'crawling': return 'bg-blue-500';
      case 'monitoring': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (crawlerStatus) {
      case 'crawling': return '正在爬取';
      case 'monitoring': return '监控中';
      case 'error': return '错误';
      default: return '空闲';
    }
  };

  const getStatusIcon = () => {
    switch (crawlerStatus) {
      case 'crawling': return <RotateCcw className="h-4 w-4 animate-spin" />;
      case 'monitoring': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>爬虫控制面板</span>
          <Badge className={`${getStatusColor()} text-white`}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            onClick={isRunning ? stopCrawler : startCrawler}
            variant={isRunning ? "destructive" : "default"}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                停止监控
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                启动爬虫
              </>
            )}
          </Button>
          <Button onClick={resetCrawler} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            重置
          </Button>
        </div>
        
        {lastCheck && (
          <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>最后检查时间: {lastCheck.toLocaleString('zh-CN')}</span>
            </div>
          </div>
        )}
        
        <div className="text-xs text-slate-500 space-y-1">
          <p>• 目标网站: https://ahdxzsb.ahu.edu.cn/oa/Dlistnum.aspx</p>
          <p>• 检查频率: 每30秒一次</p>
          <p>• 监控内容: 《安徽大学学报(哲学社会科学版)》新论文</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrawlerStatus;

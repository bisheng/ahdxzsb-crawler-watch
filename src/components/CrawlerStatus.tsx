
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useCrawler } from "@/hooks/useCrawler";

const CrawlerStatus = () => {
  const {
    isRunning,
    lastCheck,
    crawlerStatus,
    settings,
    startCrawler,
    stopCrawler,
    resetCrawler,
    isLoading
  } = useCrawler();

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
            disabled={isLoading}
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
          <Button onClick={resetCrawler} variant="outline" disabled={isLoading}>
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
          <p>• 目标网站: {settings.targetUrl}</p>
          <p>• 检查频率: 每{settings.checkInterval}秒一次</p>
          <p>• 监控内容: 《安徽大学学报(哲学社会科学版)》新论文</p>
          <p>• 状态: {isRunning ? '运行中' : '已停止'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrawlerStatus;

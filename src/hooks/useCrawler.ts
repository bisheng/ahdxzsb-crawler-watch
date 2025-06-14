
import { useState, useEffect, useCallback } from 'react';
import { crawlerService } from '@/services/crawlerService';
import { usePapers } from './usePapers';
import { toast } from 'sonner';

interface CrawlerSettings {
  targetUrl: string;
  checkInterval: number;
  enableNotifications: boolean;
  maxRetries: number;
  timeout: number;
  userAgent: string;
}

export const useCrawler = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [crawlerStatus, setCrawlerStatus] = useState<'idle' | 'crawling' | 'monitoring' | 'error'>('idle');
  const [settings, setSettings] = useState<CrawlerSettings>({
    targetUrl: "https://ahdxzsb.ahu.edu.cn/oa/Dlistnum.aspx",
    checkInterval: 30,
    enableNotifications: true,
    maxRetries: 3,
    timeout: 10,
    userAgent: "AcademicCrawler/1.0"
  });

  const { addPaper } = usePapers();

  const handleNewPapers = useCallback(async (papers: any[]) => {
    for (const paper of papers) {
      try {
        await addPaper.mutateAsync(paper);
        
        if (settings.enableNotifications) {
          toast.success("发现新论文", {
            description: paper.title.length > 50 ? 
              paper.title.substring(0, 50) + "..." : 
              paper.title
          });
        }
      } catch (error) {
        console.error('保存论文失败:', error);
        toast.error("保存论文失败", {
          description: "请检查网络连接或稍后重试"
        });
      }
    }
  }, [addPaper, settings.enableNotifications]);

  const startCrawler = useCallback(async () => {
    if (isRunning) return;

    try {
      setIsRunning(true);
      setCrawlerStatus('crawling');
      setLastCheck(new Date());

      toast.success("爬虫已启动", {
        description: "开始爬取期刊目录数据"
      });

      // 执行初始爬取
      const initialPapers = await crawlerService.crawlPapers();
      if (initialPapers.length > 0) {
        await handleNewPapers(initialPapers);
      }

      // 开始定时监控
      crawlerService.startMonitoring(
        handleNewPapers,
        settings.checkInterval * 1000
      );

      setCrawlerStatus('monitoring');
      toast.success("初始爬取完成", {
        description: "开始定时监控新论文"
      });

    } catch (error) {
      console.error('启动爬虫失败:', error);
      setCrawlerStatus('error');
      setIsRunning(false);
      toast.error("启动爬虫失败", {
        description: "请检查网络连接或目标网站是否可访问"
      });
    }
  }, [isRunning, settings.checkInterval, handleNewPapers]);

  const stopCrawler = useCallback(() => {
    crawlerService.stopMonitoring();
    setIsRunning(false);
    setCrawlerStatus('idle');
    
    toast.info("爬虫已停止", {
      description: "监控服务已暂停"
    });
  }, []);

  const resetCrawler = useCallback(() => {
    stopCrawler();
    setLastCheck(null);
    setCrawlerStatus('idle');
    
    toast.info("爬虫已重置", {
      description: "所有状态已清空"
    });
  }, [stopCrawler]);

  const updateSettings = useCallback((newSettings: Partial<CrawlerSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    if (newSettings.targetUrl) {
      crawlerService.updateTargetUrl(newSettings.targetUrl);
    }
    
    if (newSettings.checkInterval && isRunning) {
      // 重启爬虫以应用新的间隔
      stopCrawler();
      setTimeout(() => startCrawler(), 1000);
    }
    
    toast.success("设置已更新", {
      description: "爬虫配置已保存"
    });
  }, [isRunning, stopCrawler, startCrawler]);

  // 定期更新最后检查时间
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && crawlerStatus === 'monitoring') {
      interval = setInterval(() => {
        setLastCheck(new Date());
      }, settings.checkInterval * 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, crawlerStatus, settings.checkInterval]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (isRunning) {
        crawlerService.stopMonitoring();
      }
    };
  }, [isRunning]);

  return {
    isRunning,
    lastCheck,
    crawlerStatus,
    settings,
    startCrawler,
    stopCrawler,
    resetCrawler,
    updateSettings,
    isLoading: addPaper.isPending
  };
};

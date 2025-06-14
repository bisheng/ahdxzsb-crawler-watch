
interface CrawledPaper {
  title: string;
  authors: string[];
  issue: string;
  pages: string;
  publication_date: string;
  keywords?: string[];
  abstract?: string;
  url?: string;
}

export class CrawlerService {
  private targetUrl: string;
  private isRunning: boolean = false;
  private checkInterval: number = 30000; // 30 seconds
  private intervalId: NodeJS.Timeout | null = null;

  constructor(targetUrl: string = "https://ahdxzsb.ahu.edu.cn/oa/Dlistnum.aspx") {
    this.targetUrl = targetUrl;
  }

  async crawlPapers(): Promise<CrawledPaper[]> {
    try {
      console.log('开始爬取论文数据...');
      
      // 由于浏览器CORS限制，这里模拟真实的爬取过程
      // 在实际部署中，这应该通过后端服务或Edge Function完成
      const mockPapers: CrawledPaper[] = [
        {
          title: "数字化转型背景下的高等教育治理现代化研究",
          authors: ["张三", "李四"],
          issue: "2024年第2期",
          pages: "1-8",
          publication_date: new Date().toISOString().split('T')[0],
          keywords: ["数字化转型", "高等教育", "治理现代化"],
          abstract: "本文分析了数字化转型背景下高等教育治理现代化的路径和挑战...",
          url: "https://ahdxzsb.ahu.edu.cn/oa/darticle.aspx?type=view&id=123"
        },
        {
          title: "新时代大学生思想政治教育创新路径探析",
          authors: ["王五", "赵六"],
          issue: "2024年第2期",
          pages: "9-16",
          publication_date: new Date().toISOString().split('T')[0],
          keywords: ["思想政治教育", "创新路径", "大学生"],
          abstract: "探讨新时代背景下大学生思想政治教育的创新发展路径...",
          url: "https://ahdxzsb.ahu.edu.cn/oa/darticle.aspx?type=view&id=124"
        },
        {
          title: "人工智能时代的高等教育变革与发展",
          authors: ["刘七", "陈八", "杨九"],
          issue: "2024年第2期",
          pages: "17-24",
          publication_date: new Date().toISOString().split('T')[0],
          keywords: ["人工智能", "高等教育", "教育变革"],
          abstract: "分析人工智能技术对高等教育带来的机遇与挑战...",
          url: "https://ahdxzsb.ahu.edu.cn/oa/darticle.aspx?type=view&id=125"
        }
      ];

      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

      // 随机返回1-3篇论文，模拟真实爬取结果
      const randomCount = Math.floor(Math.random() * 3) + 1;
      return mockPapers.slice(0, randomCount);

    } catch (error) {
      console.error('爬取论文失败:', error);
      throw new Error('爬取论文数据时发生错误');
    }
  }

  async parseHtmlContent(html: string): Promise<CrawledPaper[]> {
    // 这里应该实现真实的HTML解析逻辑
    // 使用DOMParser或其他HTML解析库来提取论文信息
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const papers: CrawledPaper[] = [];
    
    // 示例解析逻辑（需要根据实际网站结构调整）
    const paperElements = doc.querySelectorAll('.paper-item, .article-item, tr');
    
    paperElements.forEach(element => {
      try {
        const titleElement = element.querySelector('.title, .paper-title, td:first-child');
        const authorsElement = element.querySelector('.authors, .paper-authors, td:nth-child(2)');
        
        if (titleElement && authorsElement) {
          const title = titleElement.textContent?.trim() || '';
          const authorsText = authorsElement.textContent?.trim() || '';
          const authors = authorsText.split(/[,，、]/).map(a => a.trim()).filter(a => a);
          
          if (title && authors.length > 0) {
            papers.push({
              title,
              authors,
              issue: "2024年第2期",
              pages: "1-10",
              publication_date: new Date().toISOString().split('T')[0],
              keywords: [],
              url: this.targetUrl
            });
          }
        }
      } catch (error) {
        console.warn('解析单个论文元素失败:', error);
      }
    });
    
    return papers;
  }

  startMonitoring(onNewPapers: (papers: CrawledPaper[]) => void, interval: number = 30000) {
    if (this.isRunning) {
      console.log('爬虫已在运行中');
      return;
    }

    this.isRunning = true;
    this.checkInterval = interval;

    console.log(`开始监控，检查间隔: ${interval / 1000}秒`);

    this.intervalId = setInterval(async () => {
      try {
        console.log('执行定时爬取检查...');
        const papers = await this.crawlPapers();
        
        if (papers.length > 0) {
          console.log(`发现 ${papers.length} 篇新论文`);
          onNewPapers(papers);
        } else {
          console.log('本次检查未发现新论文');
        }
      } catch (error) {
        console.error('定时爬取出错:', error);
      }
    }, this.checkInterval);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('爬虫监控已停止');
  }

  isMonitoring(): boolean {
    return this.isRunning;
  }

  updateTargetUrl(url: string) {
    this.targetUrl = url;
  }

  updateInterval(interval: number) {
    this.checkInterval = interval;
    if (this.isRunning) {
      // 重启监控以应用新的间隔
      this.stopMonitoring();
      // 注意：这里需要外部重新调用startMonitoring
    }
  }
}

// 单例模式
export const crawlerService = new CrawlerService();

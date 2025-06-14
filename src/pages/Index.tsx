
import { useEffect } from "react";
import Header from "@/components/Header";
import StatusCard from "@/components/StatusCard";
import CrawlerStatus from "@/components/CrawlerStatus";
import PaperList from "@/components/PaperList";
import CrawlerSettings from "@/components/CrawlerSettings";
import { Activity, FileText, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  useEffect(() => {
    // 欢迎消息
    toast.success("学术期刊爬虫系统已启动", {
      description: "可以开始监控安徽大学学报论文收录情况"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* 状态卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="总论文数"
            value="4"
            icon={FileText}
            color="bg-blue-500"
            trend="较上期增长 25%"
          />
          <StatusCard
            title="新收录"
            value="1"
            icon={TrendingUp}
            color="bg-green-500"
            trend="本期新增"
          />
          <StatusCard
            title="监控状态"
            value="正常"
            icon={Activity}
            color="bg-purple-500"
          />
          <StatusCard
            title="最后检查"
            value="实时"
            icon={Clock}
            color="bg-orange-500"
          />
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：控制面板和设置 */}
          <div className="space-y-6">
            <CrawlerStatus />
            <CrawlerSettings />
          </div>

          {/* 右侧：论文列表 */}
          <div className="lg:col-span-2">
            <PaperList />
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              关于本系统
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              这是一个专为《安徽大学学报(哲学社会科学版)》设计的智能爬虫监控系统。
              系统能够自动爬取期刊目录，实时监控新论文收录情况，并及时发送通知提醒。
              采用现代化的技术栈，确保高效稳定的监控服务。
            </p>
            <div className="mt-4 text-sm text-slate-500">
              <p>技术栈: React + TypeScript + Tailwind CSS + shadcn/ui</p>
              <p>目标网站: https://ahdxzsb.ahu.edu.cn/oa/Dlistnum.aspx</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;


import { BookOpen, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white shadow-xl border-b border-blue-500/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">学术期刊爬虫监控</h1>
              <p className="text-blue-200 text-sm">安徽大学学报(哲学社会科学版) 自动监控系统</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg">
            <Search className="h-4 w-4 text-blue-300" />
            <span className="text-sm text-blue-200">智能监控中</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

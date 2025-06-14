
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('已退出登录', { description: '感谢使用爬虫监控系统' });
    } catch (error) {
      toast.error('退出失败', { description: '请稍后重试' });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-blue-200 hover:text-white hover:bg-slate-800">
            <User className="h-4 w-4" />
            <span>{user?.email}</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>用户信息</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">邮箱</label>
              <p className="text-slate-900">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">注册时间</label>
              <p className="text-slate-900">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('zh-CN') : '未知'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleSignOut}
        className="flex items-center space-x-2 text-blue-200 hover:text-white hover:bg-slate-800"
      >
        <LogOut className="h-4 w-4" />
        <span>退出</span>
      </Button>
    </div>
  );
};

export default UserMenu;

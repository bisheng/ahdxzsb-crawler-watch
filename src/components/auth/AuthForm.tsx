
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast.error('登录失败', { description: error.message });
        } else {
          toast.success('登录成功', { description: '欢迎回到爬虫监控系统' });
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast.error('注册失败', { description: error.message });
        } else {
          toast.success('注册成功', { 
            description: '请检查您的邮箱以验证账户'
          });
        }
      }
    } catch (error) {
      toast.error('操作失败', { description: '请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-slate-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-blue-600 p-3 rounded-lg w-fit">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              学术期刊爬虫监控
            </CardTitle>
            <p className="text-slate-600 mt-2">
              {isLogin ? '登录您的账户' : '创建新账户'}
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>姓名</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="请输入您的姓名"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>邮箱</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>密码</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入您的密码"
                required
                minLength={6}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full flex items-center space-x-2"
              disabled={loading}
            >
              {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              <span>{loading ? '处理中...' : (isLogin ? '登录' : '注册')}</span>
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              {isLogin ? '还没有账户？' : '已有账户？'}
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 p-0 h-auto text-blue-600"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;

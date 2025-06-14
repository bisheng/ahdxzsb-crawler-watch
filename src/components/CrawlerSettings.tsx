
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Bell, Clock, Globe, Link2, Brain } from "lucide-react";
import { toast } from "sonner";

const CrawlerSettings = () => {
  const [settings, setSettings] = useState({
    // 网址配置
    targetUrl: "https://ahdxzsb.ahu.edu.cn/oa/Dlistnum.aspx",
    backupUrls: [],
    
    // 自然语言配置
    crawlDescription: "爬取《安徽大学学报(哲学社会科学版)》的所有论文标题、作者、摘要和发布日期",
    targetElements: "论文列表中的标题链接、作者信息、发布时间",
    excludePatterns: "广告、导航菜单、页脚信息",
    
    // 原有配置
    checkInterval: "30",
    enableNotifications: true,
    enableEmailAlerts: false,
    maxRetries: "3",
    timeout: "10",
    userAgent: "AcademicCrawler/1.0"
  });

  const [newBackupUrl, setNewBackupUrl] = useState("");

  const handleSave = () => {
    toast.success("设置已保存", {
      description: "爬虫配置已更新，将根据新设置执行爬取任务"
    });
  };

  const addBackupUrl = () => {
    if (newBackupUrl.trim() && !settings.backupUrls.includes(newBackupUrl)) {
      setSettings({
        ...settings,
        backupUrls: [...settings.backupUrls, newBackupUrl.trim()]
      });
      setNewBackupUrl("");
      toast.success("备用网址已添加");
    }
  };

  const removeBackupUrl = (url: string) => {
    setSettings({
      ...settings,
      backupUrls: settings.backupUrls.filter(u => u !== url)
    });
    toast.info("备用网址已移除");
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-slate-600" />
          <span>爬虫配置</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* 网址配置 */}
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium flex items-center space-x-2 text-blue-800">
            <Link2 className="h-4 w-4" />
            <span>目标网址配置</span>
          </h4>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="targetUrl">主要目标网址</Label>
              <Input
                id="targetUrl"
                value={settings.targetUrl}
                onChange={(e) => setSettings({...settings, targetUrl: e.target.value})}
                placeholder="https://example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label>备用网址</Label>
              <div className="flex space-x-2">
                <Input
                  value={newBackupUrl}
                  onChange={(e) => setNewBackupUrl(e.target.value)}
                  placeholder="添加备用网址"
                />
                <Button onClick={addBackupUrl} variant="outline" size="sm">
                  添加
                </Button>
              </div>
              {settings.backupUrls.length > 0 && (
                <div className="space-y-1">
                  {settings.backupUrls.map((url, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <span className="text-sm text-slate-600 truncate">{url}</span>
                      <Button 
                        onClick={() => removeBackupUrl(url)}
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        移除
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 自然语言配置 */}
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-medium flex items-center space-x-2 text-green-800">
            <Brain className="h-4 w-4" />
            <span>智能爬取配置</span>
          </h4>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crawlDescription">爬取任务描述</Label>
              <Textarea
                id="crawlDescription"
                value={settings.crawlDescription}
                onChange={(e) => setSettings({...settings, crawlDescription: e.target.value})}
                placeholder="用自然语言描述你想要爬取的内容..."
                rows={3}
              />
              <p className="text-xs text-green-600">
                详细描述爬取目标，AI将根据描述智能识别页面元素
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetElements">目标元素描述</Label>
              <Textarea
                id="targetElements"
                value={settings.targetElements}
                onChange={(e) => setSettings({...settings, targetElements: e.target.value})}
                placeholder="描述需要提取的具体页面元素..."
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excludePatterns">排除内容描述</Label>
              <Textarea
                id="excludePatterns"
                value={settings.excludePatterns}
                onChange={(e) => setSettings({...settings, excludePatterns: e.target.value})}
                placeholder="描述需要忽略的内容..."
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* 原有配置保留 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interval" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>检查间隔 (秒)</span>
            </Label>
            <Select
              value={settings.checkInterval}
              onValueChange={(value) => setSettings({...settings, checkInterval: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15秒</SelectItem>
                <SelectItem value="30">30秒</SelectItem>
                <SelectItem value="60">1分钟</SelectItem>
                <SelectItem value="300">5分钟</SelectItem>
                <SelectItem value="600">10分钟</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">请求超时 (秒)</Label>
            <Input
              id="timeout"
              type="number"
              value={settings.timeout}
              onChange={(e) => setSettings({...settings, timeout: e.target.value})}
              min="5"
              max="60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retries">最大重试次数</Label>
            <Select
              value={settings.maxRetries}
              onValueChange={(value) => setSettings({...settings, maxRetries: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1次</SelectItem>
                <SelectItem value="3">3次</SelectItem>
                <SelectItem value="5">5次</SelectItem>
                <SelectItem value="10">10次</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userAgent" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>User Agent</span>
            </Label>
            <Input
              id="userAgent"
              value={settings.userAgent}
              onChange={(e) => setSettings({...settings, userAgent: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h4 className="font-medium flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>通知设置</span>
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="cursor-pointer">
                启用浏览器通知
              </Label>
              <Switch
                id="notifications"
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => setSettings({...settings, enableNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="email" className="cursor-pointer">
                启用邮件提醒
              </Label>
              <Switch
                id="email"
                checked={settings.enableEmailAlerts}
                onCheckedChange={(checked) => setSettings({...settings, enableEmailAlerts: checked})}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>保存配置</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrawlerSettings;

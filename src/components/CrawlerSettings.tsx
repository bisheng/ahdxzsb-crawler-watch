
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Bell, Clock, Globe, Link2, Brain } from "lucide-react";
import { useCrawler } from "@/hooks/useCrawler";
import { useState } from "react";

const CrawlerSettings = () => {
  const { settings, updateSettings } = useCrawler();
  const [localSettings, setLocalSettings] = useState(settings);
  const [newBackupUrl, setNewBackupUrl] = useState("");
  const [backupUrls, setBackupUrls] = useState<string[]>([]);

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const addBackupUrl = () => {
    if (newBackupUrl.trim() && !backupUrls.includes(newBackupUrl)) {
      setBackupUrls([...backupUrls, newBackupUrl.trim()]);
      setNewBackupUrl("");
    }
  };

  const removeBackupUrl = (url: string) => {
    setBackupUrls(backupUrls.filter(u => u !== url));
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
                value={localSettings.targetUrl}
                onChange={(e) => setLocalSettings({...localSettings, targetUrl: e.target.value})}
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
              {backupUrls.length > 0 && (
                <div className="space-y-1">
                  {backupUrls.map((url, index) => (
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

        {/* 基本配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interval" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>检查间隔 (秒)</span>
            </Label>
            <Select
              value={localSettings.checkInterval.toString()}
              onValueChange={(value) => setLocalSettings({...localSettings, checkInterval: parseInt(value)})}
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
              value={localSettings.timeout}
              onChange={(e) => setLocalSettings({...localSettings, timeout: parseInt(e.target.value)})}
              min="5"
              max="60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retries">最大重试次数</Label>
            <Select
              value={localSettings.maxRetries.toString()}
              onValueChange={(value) => setLocalSettings({...localSettings, maxRetries: parseInt(value)})}
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
              value={localSettings.userAgent}
              onChange={(e) => setLocalSettings({...localSettings, userAgent: e.target.value})}
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
                checked={localSettings.enableNotifications}
                onCheckedChange={(checked) => setLocalSettings({...localSettings, enableNotifications: checked})}
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

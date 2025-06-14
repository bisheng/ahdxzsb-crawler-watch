
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";
import { useState } from "react";

interface UrlConfigurationProps {
  targetUrl: string;
  onUrlChange: (url: string) => void;
}

const UrlConfiguration = ({ targetUrl, onUrlChange }: UrlConfigurationProps) => {
  const [newBackupUrl, setNewBackupUrl] = useState("");
  const [backupUrls, setBackupUrls] = useState<string[]>([]);

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
            value={targetUrl}
            onChange={(e) => onUrlChange(e.target.value)}
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
  );
};

export default UrlConfiguration;

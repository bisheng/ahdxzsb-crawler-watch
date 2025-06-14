
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Save } from "lucide-react";
import { useCrawler } from "@/hooks/useCrawler";
import { useState } from "react";
import UrlConfiguration from "@/components/crawler/UrlConfiguration";
import BasicSettings from "@/components/crawler/BasicSettings";
import NotificationSettings from "@/components/crawler/NotificationSettings";

const CrawlerSettings = () => {
  const { settings, updateSettings } = useCrawler();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const updateLocalSetting = (key: keyof typeof localSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
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
        
        <UrlConfiguration
          targetUrl={localSettings.targetUrl}
          onUrlChange={(url) => updateLocalSetting('targetUrl', url)}
        />

        <BasicSettings
          checkInterval={localSettings.checkInterval}
          timeout={localSettings.timeout}
          maxRetries={localSettings.maxRetries}
          userAgent={localSettings.userAgent}
          onIntervalChange={(interval) => updateLocalSetting('checkInterval', interval)}
          onTimeoutChange={(timeout) => updateLocalSetting('timeout', timeout)}
          onRetriesChange={(retries) => updateLocalSetting('maxRetries', retries)}
          onUserAgentChange={(userAgent) => updateLocalSetting('userAgent', userAgent)}
        />

        <NotificationSettings
          enableNotifications={localSettings.enableNotifications}
          onNotificationChange={(enabled) => updateLocalSetting('enableNotifications', enabled)}
        />

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

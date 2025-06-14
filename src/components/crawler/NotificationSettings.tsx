
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface NotificationSettingsProps {
  enableNotifications: boolean;
  onNotificationChange: (enabled: boolean) => void;
}

const NotificationSettings = ({ enableNotifications, onNotificationChange }: NotificationSettingsProps) => {
  return (
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
            checked={enableNotifications}
            onCheckedChange={onNotificationChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;

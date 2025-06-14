
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Globe } from "lucide-react";

interface BasicSettingsProps {
  checkInterval: number;
  timeout: number;
  maxRetries: number;
  userAgent: string;
  onIntervalChange: (interval: number) => void;
  onTimeoutChange: (timeout: number) => void;
  onRetriesChange: (retries: number) => void;
  onUserAgentChange: (userAgent: string) => void;
}

const BasicSettings = ({
  checkInterval,
  timeout,
  maxRetries,
  userAgent,
  onIntervalChange,
  onTimeoutChange,
  onRetriesChange,
  onUserAgentChange
}: BasicSettingsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="interval" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>检查间隔 (秒)</span>
        </Label>
        <Select
          value={checkInterval.toString()}
          onValueChange={(value) => onIntervalChange(parseInt(value))}
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
          value={timeout}
          onChange={(e) => onTimeoutChange(parseInt(e.target.value))}
          min="5"
          max="60"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="retries">最大重试次数</Label>
        <Select
          value={maxRetries.toString()}
          onValueChange={(value) => onRetriesChange(parseInt(value))}
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
          value={userAgent}
          onChange={(e) => onUserAgentChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BasicSettings;

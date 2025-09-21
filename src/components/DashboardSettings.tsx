import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Bell,
  Moon,
  Sun,
  Monitor,
  Palette,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Trash2,
  ChevronRight
} from "lucide-react";

interface DashboardSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSettings = ({ isOpen, onClose }: DashboardSettingsProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  if (!isOpen) return null;

  const handleExportData = () => {
    // Mock export functionality
    console.log("Exporting dashboard data...");
  };

  const handleClearCache = () => {
    // Mock clear cache functionality
    console.log("Clearing cache...");
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Dashboard Settings</h3>
            <p className="text-xs text-muted-foreground">Customize your experience</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {/* Appearance Settings */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium text-sm text-foreground">Appearance</h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Moon className="h-4 w-4 text-blue-400" /> :
                 theme === "light" ? <Sun className="h-4 w-4 text-yellow-500" /> :
                 <Monitor className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
                </div>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <div>
                  <p className="text-sm font-medium">Compact Mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing and padding</p>
                </div>
              </div>
              <Switch checked={compactMode} onCheckedChange={setCompactMode} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Settings */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium text-sm text-foreground">Notifications</h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive notifications</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? <Volume2 className="h-4 w-4 text-blue-500" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-medium">Sound Effects</p>
                  <p className="text-xs text-muted-foreground">Play notification sounds</p>
                </div>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </div>
        </div>

        <Separator />

        {/* Performance Settings */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <h4 className="font-medium text-sm text-foreground">Performance</h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Auto Refresh</p>
                  <p className="text-xs text-muted-foreground">Automatically update data</p>
                </div>
              </div>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4 text-indigo-500" />
                <div>
                  <p className="text-sm font-medium">Animations</p>
                  <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <Separator />

        {/* Language Settings */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 text-green-500">🌐</div>
            <h4 className="font-medium text-sm text-foreground">Language</h4>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 bg-blue-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                EN
              </div>
              <div>
                <p className="text-sm font-medium">Display Language</p>
                <p className="text-xs text-muted-foreground">Choose your language</p>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Data & Privacy */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 text-red-500">🔒</div>
            <h4 className="font-medium text-sm text-foreground">Data & Privacy</h4>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              onClick={handleExportData}
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between"
              onClick={handleClearCache}
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Clear Cache</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* About */}
        <div className="p-4">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              CampBuzz Dashboard v2.1.0
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 CampBuzz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;

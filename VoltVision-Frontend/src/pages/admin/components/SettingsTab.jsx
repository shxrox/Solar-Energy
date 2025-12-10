
import { useState } from "react";
import { Settings, Bell, Lock, Database, Loader2, Save } from "lucide-react";

export function SettingsTab() {
  const [settings, setSettings] = useState({
    appName: "Aelora Admin",
    maintenanceMode: false,
    emailNotifications: true,
    logRetention: "30",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Settings saved:", settings);
      setIsSaving(false);
      // alert("Settings saved successfully!"); 
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-base-content">Settings</h2>
        <p className="text-sm text-base-content/60 mt-1">
          Configure admin panel and system-wide settings
        </p>
      </div>

      {/* General Settings */}
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">
            General Settings
          </h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/80 block">
              Application Name
            </label>
            <input
              value={settings.appName}
              onChange={(e) => handleChange("appName", e.target.value)}
              placeholder="Enter application name"
              className="w-full px-4 py-2.5 rounded-lg border border-base-300 bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base-content placeholder:text-base-content/30"
            />
          </div>

          {/* Maintenance Mode Toggle */}
          <label className="flex items-center justify-between p-4 rounded-xl border border-base-200 bg-base-200/30 cursor-pointer hover:bg-base-200/50 transition-colors">
            <div>
              <p className="font-medium text-base-content">Maintenance Mode</p>
              <p className="text-sm text-base-content/60">
                Disable access for regular users
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                handleChange("maintenanceMode", e.target.checked)
              }
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">
            Notifications
          </h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-xl border border-base-200 bg-base-200/30 cursor-pointer hover:bg-base-200/50 transition-colors">
            <div>
              <p className="font-medium text-base-content">Email Notifications</p>
              <p className="text-sm text-base-content/60">
                Receive email alerts for system events
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                handleChange("emailNotifications", e.target.checked)
              }
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>

      {/* Data Settings */}
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">Data</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-2">
          <label className="text-sm font-medium text-base-content/80 block">
            Log Retention (days)
          </label>
          <input
            type="number"
            value={settings.logRetention}
            onChange={(e) => handleChange("logRetention", e.target.value)}
            placeholder="Enter days"
            className="w-full px-4 py-2.5 rounded-lg border border-base-300 bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base-content placeholder:text-base-content/30"
          />
          <p className="text-xs text-base-content/50 mt-1">
            Logs older than this duration will be automatically deleted
          </p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">Security</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-3">
          <button className="w-full flex items-center justify-start px-4 py-3 rounded-lg border border-base-200 hover:bg-base-200/50 hover:border-base-300 transition-all text-sm font-medium text-base-content text-left">
            Reset Admin Passwords
          </button>
          <button className="w-full flex items-center justify-start px-4 py-3 rounded-lg border border-base-200 hover:bg-base-200/50 hover:border-base-300 transition-all text-sm font-medium text-base-content text-left">
            View Audit Logs
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pb-8">
        <button 
          className="px-6 py-2.5 rounded-lg border border-base-300 text-base-content/70 hover:bg-base-200 hover:text-base-content transition-colors font-medium text-sm"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-content font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
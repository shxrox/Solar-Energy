
import { SettingsTab } from "./components/SettingsTab";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 opacity-80" />
          System Settings
        </h1>
        <p className="text-lg opacity-60">
          Configure global application preferences and admin controls.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="mt-8">
        <SettingsTab />
      </div>
      
    </div>
  );
}
import { SettingsTab } from "./components/SettingsTab";

export default function SettingsPage() {
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Settings</h1>
      <p className="text-gray-600 mt-2">Configure system and admin settings</p>
      <div className="mt-8">
        <SettingsTab />
      </div>
    </main>
  );
}

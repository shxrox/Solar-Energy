import { SolarUnitsTab } from "./components/SolarUnitsTab";

export default function SolarUnitsPage() {
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Solar Units</h1>
      <p className="text-gray-600 mt-2">Manage and monitor all solar units</p>
      <div className="mt-8">
        <SolarUnitsTab />
      </div>
    </main>
  );
}

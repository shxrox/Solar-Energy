import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading: isLoadingSolarUnits, isError: isErrorSolarUnits, error: errorSolarUnits } = useGetSolarUnitsQuery();

  if (isLoadingSolarUnits) {
    return <div>Loading...</div>;
  }

  if (isErrorSolarUnits) {
    return <div>Error: {errorSolarUnits.message}</div>;
  }

  console.log(solarUnits);


  const filteredUnits = searchTerm !== "" ? solarUnits.filter(
    (unit) =>
      unit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())) : solarUnits;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button asChild>
          <Link to="/admin/solar-units/create">Add New Unit</Link>
        </Button>
      </div>

      <div className="w-full max-w-md">
        <Input
          placeholder="Search solar units..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => (
          <Card key={unit._id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-semibold text-foreground">{unit.serialNumber}</h3>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${unit.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
                  }`}
              >
                {unit.status}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                <p className="text-lg font-semibold text-foreground">
                  {unit.capacity}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                >
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUnits.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No solar units found matching "{searchTerm}"
          </p>
        </Card>
      )}
    </div>
  );
}

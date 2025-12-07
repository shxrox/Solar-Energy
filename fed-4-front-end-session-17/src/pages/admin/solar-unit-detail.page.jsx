// import { useParams, useNavigate } from "react-router";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { ArrowLeft, Zap, Calendar, Gauge, Activity } from "lucide-react";
// import { format } from "date-fns";
// import { useGetSolarUnitByIdQuery } from "@/lib/redux/query";

// export default function SolarUnitDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: solarUnit, isLoading: isLoadingSolarUnit, isError: isErrorSolarUnit, error: errorSolarUnit } = useGetSolarUnitByIdQuery(id);
  
//   if (isLoadingSolarUnit) {
//     return <div>Loading...</div>;
//   }

//   if (isErrorSolarUnit) {
//     return <div>Error: {errorSolarUnit.message}</div>;
//   }

//   const handleEdit = () => {
//     navigate(`/admin/solar-units/${solarUnit._id}/edit`);
//   };

//   const handleDelete = () => {
//     // TODO: Implement delete with confirmation
//     console.log("Delete solar unit:", solarUnit._id);
//   };

//   return (
//     <main className="mt-4">
//       <div className="flex items-center gap-4 mb-6">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => navigate("/admin/solar-units")}
//           className="gap-2"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </Button>
//         <h1 className="text-4xl font-bold text-foreground">
//           {solarUnit.serialNumber}
//         </h1>
//       </div>

//       <p className="text-gray-600 mb-8">
//         View and manage solar unit details and performance
//       </p>

//       <div className="grid gap-6 lg:grid-cols-3">
//         {/* Main Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Status Card */}
//           <Card className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold text-foreground">Status</h2>
//               <div
//                 className={`px-4 py-2 rounded-full text-sm font-medium ${
//                   solarUnit.status === "ACTIVE"
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {solarUnit.status}
//               </div>
//             </div>
//             <Separator className="my-4" />
//             <p className="text-muted-foreground">
//               {solarUnit.status === "ACTIVE"
//                 ? "This solar unit is currently operational and generating energy."
//                 : "This solar unit is currently inactive."}
//             </p>
//           </Card>

//           {/* Technical Specifications */}
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold text-foreground mb-4">
//               Technical Specifications
//             </h2>
//             <Separator className="my-4" />

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Gauge className="w-5 h-5 text-blue-500" />
//                   <p className="text-sm text-muted-foreground">Capacity</p>
//                 </div>
//                 <p className="text-2xl font-bold text-foreground">
//                   {(solarUnit.capacity / 1000).toFixed(1)} kW
//                 </p>
//               </div>

//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Zap className="w-5 h-5 text-yellow-500" />
//                   <p className="text-sm text-muted-foreground">Serial Number</p>
//                 </div>
//                 <p className="text-2xl font-bold text-foreground font-mono">
//                   {solarUnit.serialNumber}
//                 </p>
//               </div>
//             </div>
//           </Card>

//           {/* Installation Information */}
//           <Card className="p-6">
//             <h2 className="text-xl font-semibold text-foreground mb-4">
//               Installation Information
//             </h2>
//             <Separator className="my-4" />

//             <div className="space-y-4">
//               <div>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Calendar className="w-5 h-5 text-purple-500" />
//                   <p className="text-sm text-muted-foreground">
//                     Installation Date
//                   </p>
//                 </div>
//                 <p className="text-lg font-semibold text-foreground">
//                   {format(new Date(solarUnit.installationDate), "MMMM d, yyyy")}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">Unit ID</p>
//                 <p className="text-sm font-mono text-foreground">
//                   {solarUnit._id}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-sm text-muted-foreground mb-1">User ID</p>
//                 <p className="text-sm font-mono text-foreground">
//                   {solarUnit.userId ?? "No User Assigned"}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Actions Sidebar */}
//         <div>
//           <Card className="p-6 sticky top-4">
//             <h3 className="font-semibold text-foreground mb-4">Actions</h3>
//             <div className="space-y-3">
//               <Button onClick={handleEdit} className="w-full">
//                 Edit Details
//               </Button>
//               <Button variant="outline" className="w-full">
//                 View Performance
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={handleDelete}
//                 className="w-full text-red-600 hover:text-red-700"
//               >
//                 Delete Unit
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </main>
//   );
// }



import { useParams, useNavigate } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Zap, Calendar, Gauge } from "lucide-react";
import { format } from "date-fns";
// ✅ Import the new delete mutation hook here
import { useGetSolarUnitByIdQuery, useDeleteSolarUnitMutation } from "@/lib/redux/query";

export default function SolarUnitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch the unit details
  const { 
    data: solarUnit, 
    isLoading: isLoadingSolarUnit, 
    isError: isErrorSolarUnit, 
    error: errorSolarUnit 
  } = useGetSolarUnitByIdQuery(id);

  // 2. Initialize the Delete Mutation
  const [deleteSolarUnit, { isLoading: isDeleting }] = useDeleteSolarUnitMutation();

  if (isLoadingSolarUnit) {
    return <div className="p-8">Loading solar unit details...</div>;
  }

  if (isErrorSolarUnit) {
    return <div className="p-8 text-red-500">Error: {errorSolarUnit.message}</div>;
  }

  const handleEdit = () => {
    navigate(`/admin/solar-units/${solarUnit._id}/edit`);
  };

  // ✅ 3. Implement the actual delete logic
  const handleDelete = async () => {
    // A. Confirmation Popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this solar unit? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        // B. Call the API
        await deleteSolarUnit(solarUnit._id).unwrap();
        
        // C. Redirect to list on success
        navigate("/admin/solar-units");
      } catch (error) {
        console.error("Failed to delete solar unit:", error);
        alert("Failed to delete solar unit. Please try again.");
      }
    }
  };

  return (
    <main className="mt-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/admin/solar-units")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-foreground">
          {solarUnit.serialNumber}
        </h1>
      </div>

      <p className="text-gray-600 mb-8">
        View and manage solar unit details and performance
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Details Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Status</h2>
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  solarUnit.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {solarUnit.status}
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-muted-foreground">
              {solarUnit.status === "ACTIVE"
                ? "This solar unit is currently operational and generating energy."
                : "This solar unit is currently inactive."}
            </p>
          </Card>

          {/* Technical Specifications */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Technical Specifications
            </h2>
            <Separator className="my-4" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-blue-500" />
                  <p className="text-sm text-muted-foreground">Capacity</p>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {(solarUnit.capacity / 1000).toFixed(1)} kW
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm text-muted-foreground">Serial Number</p>
                </div>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {solarUnit.serialNumber}
                </p>
              </div>
            </div>
          </Card>

          {/* Installation Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Installation Information
            </h2>
            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <p className="text-sm text-muted-foreground">
                    Installation Date
                  </p>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {format(new Date(solarUnit.installationDate), "MMMM d, yyyy")}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Unit ID</p>
                <p className="text-sm font-mono text-foreground">
                  {solarUnit._id}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">User ID</p>
                <p className="text-sm font-mono text-foreground">
                  {solarUnit.userId ?? "No User Assigned"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div>
          <Card className="p-6 sticky top-4">
            <h3 className="font-semibold text-foreground mb-4">Actions</h3>
            <div className="space-y-3">
              <Button onClick={handleEdit} className="w-full">
                Edit Details
              </Button>
              <Button variant="outline" className="w-full">
                View Performance
              </Button>
              
              {/* Delete Button with Loading State */}
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting} 
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                {isDeleting ? "Deleting..." : "Delete Unit"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
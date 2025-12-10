

import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Zap, Calendar, Gauge, Loader2, AlertCircle, Trash2, Edit, Activity } from "lucide-react";
import { format } from "date-fns";
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

  // --- LOADING STATE ---
  if (isLoadingSolarUnit) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin opacity-50" />
            <p className="text-sm opacity-60 font-medium">Loading unit details...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isErrorSolarUnit) {
    return (
      <div className="p-8 flex justify-center">
        <div className="max-w-lg w-full rounded-lg border border-opacity-20 p-4 shadow-sm flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 opacity-80" />
          <div>
            <h3 className="font-semibold text-sm">Error loading unit</h3>
            <div className="text-xs mt-1 opacity-70">
              {errorSolarUnit?.message || "Please check your connection."}
            </div>
          </div>
        </div>
      </div>
    );
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
    <main className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/admin/solar-units")}
          className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Fleet
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              {solarUnit.serialNumber}
            </h1>
            <p className="opacity-60 mt-1">
                Unit ID: <span className="font-mono text-xs opacity-80">{solarUnit._id}</span>
            </p>
          </div>
          
          {/* Status Badge - Using borders and opacity instead of colors */}
          <div className="px-4 py-2 rounded-full border border-opacity-20 flex items-center gap-2 font-medium text-sm w-fit">
              <div className={`w-2 h-2 rounded-full ${solarUnit.status === 'ACTIVE' ? 'bg-current opacity-100 animate-pulse' : 'bg-current opacity-40'}`} />
              <span className="opacity-90">{solarUnit.status}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- LEFT COLUMN: INFO CARDS --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status & Health */}
          <div className="rounded-xl border border-current border-opacity-10 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-current">
                    <Activity className="h-5 w-5 " />
                </div>
                <h2 className="text-lg font-semibold ">System Status</h2>
            </div>
            <div className="h-px w-full bg-current opacity-10 mb-4" />
            <p className="opacity-70 leading-relaxed text-sm">
              {solarUnit.status === "ACTIVE"
                ? "This solar unit is currently operational and generating energy. Real-time telemetry is active."
                : "This solar unit is currently flagged as inactive or in maintenance mode. Check physical connections."}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="rounded-xl border border-current border-opacity-10 p-6 shadow-sm">
            <h2 className="text-lg font-semibold opacity-90 mb-4">Technical Specifications</h2>
            <div className="h-px w-full bg-current opacity-10 mb-6" />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-60">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Capacity</span>
                </div>
                <p className="text-3xl font-bold">
                  {(solarUnit.capacity / 1000).toFixed(1)} <span className="text-lg font-normal opacity-50">kW</span>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 ">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Serial Number</span>
                </div>
                <p className="text-xl font-bold font-mono   p-2 rounded-md inline-block">
                  {solarUnit.serialNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Installation Information */}
          <div className="rounded-xl border border-current border-opacity-10 p-6 shadow-sm">
            <h2 className="text-lg font-semibold opacity-90 mb-4">Installation Details</h2>
            <div className="h-px w-full  opacity-10 mb-6" />

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-60">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Installation Date</span>
                </div>
                <p className="text-lg font-medium opacity-90">
                  {format(new Date(solarUnit.installationDate), "MMMM d, yyyy")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="p-3  rounded-lg border border-current border-opacity-5">
                    <p className="text-xs opacity-50 uppercase tracking-wider mb-1">Assigned User ID</p>
                    <p className="text-xs font-mono opacity-80 break-all">
                        {solarUnit.userId ? (typeof solarUnit.userId === 'object' ? solarUnit.userId._id : solarUnit.userId) : "No User Assigned"}
                    </p>
                </div>
                <div className="p-3  rounded-lg border border-current border-opacity-5">
                     <p className="text-xs opacity-50 uppercase tracking-wider mb-1">System ID</p>
                    <p className="text-xs font-mono opacity-80 break-all">
                        {solarUnit._id}
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ACTIONS --- */}
        <div>
          <div className="sticky top-24 rounded-xl border border-current border-opacity-10 p-6 shadow-lg">
            <h3 className="font-bold opacity-90 mb-6 flex items-center gap-2">
                <div className="w-1 h-5  rounded-full opacity-50" />
                Actions
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={handleEdit} 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg   font-medium hover:opacity-90 transition-opacity shadow-sm"
                style={{ color: 'var(--fallback-b1,oklch(var(--b1)))' }} // Invert text color based on background
              >
                <Edit className="w-4 h-4" /> Edit Details
              </button>
              
           
          
              
              <div className="h-px w-full bg-current opacity-10 my-2" />

              <button
                onClick={handleDelete}
                disabled={isDeleting} 
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors font-medium text-sm"
              >
                {isDeleting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                    </>
                ) : (
                    <>
                        <Trash2 className="w-4 h-4" /> Delete Unit
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
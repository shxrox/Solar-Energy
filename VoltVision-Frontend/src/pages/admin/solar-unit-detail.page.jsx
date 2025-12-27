

import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Zap, Calendar, Gauge, Loader2, AlertCircle, Trash2, Edit, Activity } from "lucide-react";
import { format } from "date-fns";
import { useGetSolarUnitByIdQuery, useDeleteSolarUnitMutation } from "@/lib/redux/query";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // ✅ 2. Get 'isSuccess' (renamed to isDeleted) to fix the bug
  const [deleteSolarUnit, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteSolarUnitMutation();

  // --- LOADING STATE ---
  if (isLoadingSolarUnit) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-base-content/40" />
            <p className="text-sm text-base-content/60 font-medium">Loading unit details...</p>
        </div>
      </div>
    );
  }

  // ✅ FIX: Don't show error if we just deleted the unit
  if (isErrorSolarUnit && !isDeleted) {
    return (
      <div className="p-8 flex justify-center">
        <div className="alert alert-error shadow-sm max-w-lg">
          <AlertCircle className="h-5 w-5" />
          <div>
            <h3 className="font-bold text-sm">Error loading unit</h3>
            <div className="text-xs opacity-90">
              {errorSolarUnit?.status === 404 ? "Unit not found." : "Please check your connection."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Prevent rendering if deleted (waiting for redirect)
  if (isDeleted || !solarUnit) return null;

  const handleEdit = () => {
    navigate(`/admin/solar-units/${solarUnit._id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this solar unit? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteSolarUnit(solarUnit._id).unwrap();
        
        toast.success("Solar Unit Deleted Successfully", {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
            onClose: () => navigate("/admin/solar-units")
        });

      } catch (error) {
        console.error("Failed to delete solar unit:", error);
        toast.error("Failed to delete unit. Please try again.", {
            position: "top-right",
            theme: "colored"
        });
      }
    }
  };

  return (
    <main className="p-4 md:p-8 space-y-8 max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
      
      <ToastContainer />

      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/admin/solar-units")}
          className="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content transition-opacity w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Fleet
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-base-content">
              {solarUnit.serialNumber}
            </h1>
            <p className="text-base-content/60 mt-1 text-sm">
                Unit ID: <span className="font-mono text-xs opacity-80">{solarUnit._id}</span>
            </p>
          </div>
          
          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-medium text-sm w-fit ${
              solarUnit.status === 'ACTIVE' 
              ? 'border-success/20 bg-success/10 text-success' 
              : 'border-warning/20 bg-warning/10 text-warning'
          }`}>
              <div className={`w-2 h-2 rounded-full ${
                  solarUnit.status === 'ACTIVE' ? 'bg-success animate-pulse' : 'bg-warning'
              }`} />
              <span>{solarUnit.status}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- LEFT COLUMN: INFO CARDS --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status & Health */}
          <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-base-200 text-base-content">
                    <Activity className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-base-content">System Status</h2>
            </div>
            <div className="h-px w-full bg-base-200 mb-4" />
            <p className="text-base-content/70 leading-relaxed text-sm">
              {solarUnit.status === "ACTIVE"
                ? "This solar unit is currently operational and generating energy. Real-time telemetry is active."
                : "This solar unit is currently flagged as inactive or in maintenance mode. Check physical connections."}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-base-content/90 mb-4">Technical Specifications</h2>
            <div className="h-px w-full bg-base-200 mb-6" />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-2 text-base-content/60">
                  <Gauge className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Capacity</span>
                </div>
                <p className="text-3xl font-bold text-base-content">
                  {(solarUnit.capacity / 1000).toFixed(1)} <span className="text-lg font-normal opacity-50">kW</span>
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-base-content/60">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Serial Number</span>
                </div>
                <p className="text-xl font-bold font-mono text-base-content bg-base-200/50 px-2 py-1 rounded-md inline-block">
                  {solarUnit.serialNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Installation Information */}
          <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-base-content/90 mb-4">Installation Details</h2>
            <div className="h-px w-full bg-base-200 mb-6" />

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-base-content/60">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">Installation Date</span>
                </div>
                <p className="text-lg font-medium text-base-content">
                  {format(new Date(solarUnit.installationDate), "MMMM d, yyyy")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-lg border border-base-200 bg-base-50/50">
                    <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">Assigned User ID</p>
                    <p className="text-xs font-mono text-base-content/80 break-all">
                        {solarUnit.userId ? (typeof solarUnit.userId === 'object' ? solarUnit.userId._id : solarUnit.userId) : "No User Assigned"}
                    </p>
                </div>
                <div className="p-3 rounded-lg border border-base-200 bg-base-50/50">
                      <p className="text-xs text-base-content/50 uppercase tracking-wider mb-1">System ID</p>
                    <p className="text-xs font-mono text-base-content/80 break-all">
                        {solarUnit._id}
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ACTIONS --- */}
        <div>
          <div className="sticky top-24 rounded-xl border border-base-200 bg-base-100 p-6 shadow-lg">
            <h3 className="font-bold text-base-content/90 mb-6 flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full opacity-50" />
                Actions
            </h3>
            
            <div className="space-y-3">
              <button 
                onClick={handleEdit} 
                className="btn btn-outline btn-primary w-full gap-2"
              >
                <Edit className="w-4 h-4" /> Edit Details
              </button>
              
              <div className="h-px w-full bg-base-200 my-2" />

              <button
                onClick={handleDelete}
                disabled={isDeleting} 
                className="btn btn-error btn-outline w-full gap-2 hover:bg-error/10"
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
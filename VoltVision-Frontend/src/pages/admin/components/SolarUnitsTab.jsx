
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Zap, Search, Plus, Calendar, Loader2, AlertCircle, Edit, Eye, User, MoreHorizontal } from "lucide-react";

export function SolarUnitsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: solarUnits, isLoading, isError, error } = useGetSolarUnitsQuery();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-base-content/20" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-sm rounded-xl">
        <AlertCircle className="h-5 w-5" />
        <span className="font-medium">{error?.message || "Error loading units"}</span>
      </div>
    );
  }

  // Filter Logic
  const filteredUnits = (solarUnits || []).filter((unit) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    const matchesSerial = unit?.serialNumber?.toLowerCase().includes(term);
    const matchesId = unit?._id?.toLowerCase().includes(term);
    const user = unit?.userId;
    const matchesFirstName = user?.firstName?.toLowerCase().includes(term);
    const matchesLastName = user?.lastName?.toLowerCase().includes(term);
    const matchesEmail = user?.email?.toLowerCase().includes(term);
    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.toLowerCase();
    
    return matchesSerial || matchesId || matchesFirstName || matchesLastName || matchesEmail || fullName.includes(term);
  });

  return (
    <div className="space-y-8">
      
      {/* --- CONTROLS BAR --- */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
            <input
                type="text"
                placeholder="Search serial, user, or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm w-full pl-10 rounded-lg focus:input-primary transition-all"
            />
        </div>

        <Link 
            to="/admin/solar-units/create"
            className="btn btn-sm btn-primary rounded-lg font-bold uppercase tracking-wide"
        >
            <Plus className="h-4 w-4" />
            Add New Unit
        </Link>
      </div>

      {/* --- UNITS GRID --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.map((unit) => (
          // ✅ Card Container: Added border, background, shadow, and hover lift
          <div 
            key={unit._id} 
            className="group relative flex flex-col bg-base-100 border border-base-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            
            {/* Top Stripe (Decoration) */}
            <div className={`h-1.5 w-full ${
                unit.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'
            }`}></div>

            <div className="p-6 flex flex-col flex-1 gap-5">
                
                {/* Header: Icon & Serial */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-base-200 text-warning">
                            <Zap className="h-5 w-5 fill-current" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-base-content leading-tight">
                                {unit.serialNumber}
                            </h3>
                            <p className="text-xs font-mono text-base-content/40 mt-0.5">
                                ID: {unit._id?.slice(-8)}
                            </p>
                        </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`badge font-bold border-0 ${
                        unit.status === 'ACTIVE' ? 'badge-success/10 text-success' : 'badge-warning/10 text-warning'
                    }`}>
                        {unit.status}
                    </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200/50 border border-base-200">
                
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold text-base-content truncate">
                            {unit.userId?.firstName ? `${unit.userId.firstName} ${unit.userId.lastName || ""}` : "Unassigned"}
                        </span>
                        {unit.userId?.email && (
                            <span className="text-[10px] text-base-content/50 truncate">
                                {unit.userId.email}
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">Capacity</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-base-content">{unit.capacity}</span>
                            <span className="text-xs font-bold text-base-content/40">W</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">Installed</p>
                        <div className="flex items-center justify-end gap-1.5 text-sm font-medium text-base-content/70">
                            <Calendar className="h-3.5 w-3.5 opacity-50" />
                            <span>{new Date(unit.installationDate).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Action Footer */}
            <div className="mt-auto border-t border-base-200 bg-base-50/50 p-3 grid grid-cols-2 gap-3">
                <button
                    onClick={() => navigate(`/admin/solar-units/${unit._id}/edit`)}
                    className="btn btn-sm btn-ghost w-full text-base-content/60 hover:text-primary hover:bg-primary/10 font-medium"
                >
                    <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                    onClick={() => navigate(`/admin/solar-units/${unit._id}`)}
                    className="btn btn-sm btn-ghost w-full text-base-content/60 hover:text-primary hover:bg-primary/10 font-medium"
                >
                    <Eye className="h-4 w-4" /> Details
                </button>
            </div>

          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUnits.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-base-200 rounded-2xl bg-base-100/50">
            <Search className="h-10 w-10 text-base-content/20 mx-auto mb-3" />
            <p className="text-base-content/60 font-medium">No units found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
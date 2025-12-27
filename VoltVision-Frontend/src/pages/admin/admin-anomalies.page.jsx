

// import React, { useState } from "react";
// import { useGetAllAnomaliesAdminQuery, useResolveAnomalyMutation } from "@/lib/redux/query";
// import { 
//   ShieldAlert, 
//   Loader2, 
//   Filter, 
//   Search, 
//   CheckCircle, 
//   AlertTriangle, 
//   Info,
//   Download // ✅ Used for the Export Button
// } from "lucide-react";

// const AdminAnomaliesPage = () => {
//   const [filterSeverity, setFilterSeverity] = useState("ALL");
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // 1. Fetch ALL anomalies
//   const { data: anomalies, isLoading, isError } = useGetAllAnomaliesAdminQuery(undefined, {
//     pollingInterval: 5000, 
//   });
  
//   // 2. Resolve Mutation
//   const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

//   // 3. Filter Logic
//   const filteredAnomalies = anomalies?.filter((item) => {
//     const matchesSeverity = filterSeverity === "ALL" || item.severity === filterSeverity;
    
//     const term = searchTerm.toLowerCase().trim();
//     if (!term) return matchesSeverity;

//     const matchesSearch = 
//         item.solarUnitId?.serialNumber?.toLowerCase().includes(term) ||
//         item.solarUnitId?.userId?.email?.toLowerCase().includes(term) ||
//         item.type.toLowerCase().includes(term);

//     return matchesSeverity && matchesSearch;
//   });

//   // ✅ 4. CSV Export Function
//   const downloadCSV = () => {
//     if (!filteredAnomalies || filteredAnomalies.length === 0) return;

//     // Define Headers
//     const headers = ["Serial Number", "Anomaly Type", "Severity", "User Email", "Detected At", "Status", "Description"];
    
//     // Map Data to CSV Format
//     const rows = filteredAnomalies.map(item => [
//       item.solarUnitId?.serialNumber || "N/A",
//       item.type,
//       item.severity,
//       item.solarUnitId?.userId?.email || "N/A",
//       new Date(item.timestamp).toLocaleString(), // Readable Date
//       item.status,
//       `"${(item.description || "").replace(/"/g, '""')}"` // Escape quotes for CSV safety
//     ]);

//     // Combine Headers and Rows
//     const csvContent = [
//       headers.join(","),
//       ...rows.map(e => e.join(","))
//     ].join("\n");

//     // Create Download Link
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", `anomaly_report_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // --- LOADING STATE ---
//   if (isLoading) {
//     return (
//       <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
//         <Loader2 className="h-10 w-10 animate-spin text-primary" />
//         <p className="text-muted-foreground text-sm">Loading system health logs...</p>
//       </div>
//     );
//   }

//   // --- ERROR STATE ---
//   if (isError) {
//     return (
//       <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
//         <ShieldAlert className="w-10 h-10 mx-auto mb-2" />
//         <p className="font-semibold">Failed to load anomaly data.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
//       {/* 1. Header & Stats */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Health Overview</h1>
//           <p className="text-sm text-gray-500">
//             Monitoring <span className="font-medium text-gray-900">{anomalies?.length || 0}</span> detected anomalies across the fleet.
//           </p>
//         </div>
        
//         <div className="flex gap-2">
//             <div className="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm font-medium flex items-center gap-2">
//                 <AlertTriangle className="w-4 h-4" />
//                 {anomalies?.filter(a => a.severity === 'Critical' && a.status === 'OPEN').length} Critical
//             </div>
//             <div className="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-md text-sm font-medium flex items-center gap-2">
//                 <Info className="w-4 h-4" />
//                 {anomalies?.filter(a => a.severity === 'Warning' && a.status === 'OPEN').length} Warnings
//             </div>
//         </div>
//       </div>

//       {/* 2. Controls Bar (Filters & Search & Export) */}
//       <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        
//         {/* Left: Severity Filters */}
//         <div className="flex items-center gap-2 overflow-x-auto">
//             <Filter className="w-4 h-4 text-gray-500 shrink-0" />
//             <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
//             {['ALL', 'Critical', 'Warning', 'Info'].map((sev) => (
//                 <button
//                     key={sev}
//                     onClick={() => setFilterSeverity(sev)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
//                         filterSeverity === sev 
//                         ? 'bg-slate-900 text-white' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                 >
//                     {sev}
//                 </button>
//             ))}
//         </div>

//         {/* Right: Search & Export */}
//         <div className="flex items-center gap-3 w-full md:w-auto">
//             {/* Search Input */}
//             <div className="relative w-full md:w-64">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//                 <input 
//                     type="text"
//                     placeholder="Search serial, email, or type..."
//                     className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </div>

//             {/* ✅ Export Button */}
//             <button
//                 onClick={downloadCSV}
//                 title="Export filtered data to CSV"
//                 className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm whitespace-nowrap"
//             >
//                 <Download className="w-4 h-4" />
//                 <span className="hidden sm:inline">Export</span>
//             </button>
//         </div>
//       </div>

//       {/* 3. Data Table */}
//       <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//                 <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs">
//                     <tr>
//                         <th className="px-6 py-3 font-semibold">Serial / User</th>
//                         <th className="px-6 py-3 font-semibold">Issue</th>
//                         <th className="px-6 py-3 font-semibold">Severity</th>
//                         <th className="px-6 py-3 font-semibold">Detected</th>
//                         <th className="px-6 py-3 font-semibold text-right">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                     {filteredAnomalies?.length > 0 ? (
//                         filteredAnomalies.map((item) => (
//                             <tr key={item._id} className="hover:bg-gray-50 transition-colors">
//                                 {/* Serial & Email */}
//                                 <td className="px-6 py-4">
//                                     <div className="font-mono font-medium text-gray-700">
//                                         {item.solarUnitId?.serialNumber || "N/A"}
//                                     </div>
//                                     <div className="text-xs text-gray-400">
//                                         {item.solarUnitId?.userId?.email || "Unknown"}
//                                     </div>
//                                 </td>
                                
//                                 <td className="px-6 py-4 font-medium text-gray-900">{item.type}</td>

//                                 <td className="px-6 py-4">
//                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//                                         item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
//                                         item.severity === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' :
//                                         'bg-blue-50 text-blue-700 border-blue-200'
//                                     }`}>
//                                         {item.severity}
//                                     </span>
//                                 </td>

//                                 <td className="px-6 py-4 text-gray-500">
//                                     {new Date(item.timestamp).toLocaleDateString()}
//                                 </td>

//                                 <td className="px-6 py-4 text-right">
//                                     {item.status === 'OPEN' ? (
//                                         <button
//                                             onClick={() => resolveAnomaly(item._id)}
//                                             disabled={isResolving}
//                                             className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors"
//                                         >
//                                             Mark Resolved
//                                         </button>
//                                     ) : (
//                                         <span className="text-xs font-bold text-green-600 flex items-center justify-end gap-1">
//                                             <CheckCircle className="w-3 h-3" /> Resolved
//                                         </span>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
//                                 No anomalies found matching your criteria.
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAnomaliesPage;


import React, { useState, useEffect } from "react";
import { useGetAllAnomaliesAdminQuery, useResolveAnomalyMutation } from "@/lib/redux/query";
import { 
  ShieldAlert, 
  Loader2, 
  Filter, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Download,
  Activity
} from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAnomaliesPage = () => {
  const [filterSeverity, setFilterSeverity] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Fetch Data
  const { data: anomalies, isLoading } = useGetAllAnomaliesAdminQuery(undefined, {
    pollingInterval: 5000, 
  });
  
  // 2. Mutation
  const [resolveAnomaly, { isLoading: isResolving, isSuccess, isError }] = useResolveAnomalyMutation();

  // Toast Feedback
  useEffect(() => {
    if (isSuccess) {
        toast.success("Anomaly marked as resolved", { position: "top-right", theme: "colored", autoClose: 2000 });
    }
    if (isError) {
        toast.error("Failed to resolve anomaly", { position: "top-right", theme: "colored" });
    }
  }, [isSuccess, isError]);

  // Calculate Stats for KPI Cards
  const allAnomalies = anomalies || [];
  const criticalCount = allAnomalies.filter(a => a.severity === 'Critical' && a.status === 'OPEN').length;
  const warningCount = allAnomalies.filter(a => a.severity === 'Warning' && a.status === 'OPEN').length;
  const totalOpen = allAnomalies.filter(a => a.status === 'OPEN').length;

  // Filter Logic
  const filteredAnomalies = allAnomalies.filter((item) => {
    const matchesSeverity = filterSeverity === "ALL" || item.severity === filterSeverity;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = 
        item.solarUnitId?.serialNumber?.toLowerCase().includes(term) ||
        item.solarUnitId?.userId?.email?.toLowerCase().includes(term) ||
        item.type.toLowerCase().includes(term);

    return matchesSeverity && matchesSearch;
  });

  const downloadCSV = () => {
    if (!filteredAnomalies.length) return;
    const headers = ["Serial", "Type", "Severity", "User", "Date", "Status"];
    const rows = filteredAnomalies.map(item => [
      item.solarUnitId?.serialNumber || "N/A",
      item.type,
      item.severity,
      item.solarUnitId?.userId?.email || "N/A",
      new Date(item.timestamp).toLocaleString(),
      item.status
    ]);
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `anomalies_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-base-content/40 mr-2" />
        <p className="text-base-content/60">Loading system health logs...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3 text-base-content">
            <Activity className="w-8 h-8 opacity-80" />
            System Health
          </h1>
          <p className="text-base-content/60 mt-1">
            Real-time monitoring of all detected anomalies across the fleet.
          </p>
        </div>
        <button onClick={downloadCSV} className="btn btn-sm btn-outline gap-2">
            <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* KPI Cards (Matches Invoices Style) */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* Critical Issues */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm border-l-4 border-l-error overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Critical Issues</p>
               <div className="text-2xl font-bold mt-1 text-base-content">{criticalCount}</div>
               <p className="text-xs text-base-content/50 mt-1">Immediate attention required</p>
            </div>
            <div className="p-3 rounded-full bg-error/10 text-error">
               <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm border-l-4 border-l-warning overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Active Warnings</p>
               <div className="text-2xl font-bold mt-1 text-base-content">{warningCount}</div>
               <p className="text-xs text-base-content/50 mt-1">Performance degradation detected</p>
            </div>
            <div className="p-3 rounded-full bg-warning/10 text-warning">
               <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Total Active */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm border-l-4 border-l-info overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Total Open Cases</p>
               <div className="text-2xl font-bold mt-1 text-base-content">{totalOpen}</div>
               <p className="text-xs text-base-content/50 mt-1">Unresolved incidents</p>
            </div>
            <div className="p-3 rounded-full bg-info/10 text-info">
               <Info className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & List Container */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border-b border-base-200">
            {/* Left: Filters */}
            <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-base-content/50" />
                <span className="text-sm font-medium mr-2 text-base-content/70">Severity:</span>
                {['ALL', 'Critical', 'Warning', 'Info'].map((sev) => (
                    <button
                        key={sev}
                        onClick={() => setFilterSeverity(sev)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            filterSeverity === sev 
                            ? 'border-base-content font-bold opacity-100 bg-base-content/10 text-base-content' 
                            : 'border-transparent opacity-60 hover:opacity-100 hover:bg-base-content/5 text-base-content'
                        }`}
                    >
                        {sev}
                    </button>
                ))}
            </div>

            {/* Right: Search */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
                <input
                    type="text"
                    placeholder="Search serial, email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-sm input-bordered w-full pl-10 rounded-lg focus:input-primary transition-all bg-transparent"
                />
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="border-b border-base-200 bg-base-100 text-base-content/70 font-medium">
                    <tr>
                        <th className="p-4">Serial / User</th>
                        <th className="p-4">Issue Type</th>
                        <th className="p-4">Severity</th>
                        <th className="p-4">Detected At</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                    {filteredAnomalies.length > 0 ? (
                        filteredAnomalies.map((item) => (
                            <tr key={item._id} className="hover:bg-base-200/50 transition-colors">
                                {/* Serial & User */}
                                <td className="p-4">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-base-content font-mono">{item.solarUnitId?.serialNumber || "N/A"}</span>
                                        <span className="text-xs text-base-content/50">{item.solarUnitId?.userId?.email || "Unknown"}</span>
                                    </div>
                                </td>
                                
                                <td className="p-4 font-medium text-base-content">
                                    {item.type}
                                </td>

                                {/* Severity Badge */}
                                <td className="p-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                        item.severity === 'Critical' ? 'border-error/20 text-error bg-error/10' :
                                        item.severity === 'Warning' ? 'border-warning/20 text-warning bg-warning/10' :
                                        'border-info/20 text-info bg-info/10'
                                    }`}>
                                        {item.severity}
                                    </span>
                                </td>

                                <td className="p-4 text-base-content/70 text-xs">
                                    {new Date(item.timestamp).toLocaleString()}
                                </td>

                                {/* Status */}
                                <td className="p-4">
                                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                                        item.status === 'OPEN' ? 'text-warning' : 'text-success'
                                    }`}>
                                        {item.status === 'OPEN' ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-4 text-right">
                                    {item.status === 'OPEN' ? (
                                        <button
                                            onClick={() => resolveAnomaly(item._id)}
                                            disabled={isResolving}
                                            className="btn btn-xs btn-outline btn-primary"
                                        >
                                            {isResolving ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Resolved"}
                                        </button>
                                    ) : (
                                        <span className="text-xs text-base-content/40 italic">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-8 text-center text-base-content/40 italic">
                                No anomalies found matching criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnomaliesPage;
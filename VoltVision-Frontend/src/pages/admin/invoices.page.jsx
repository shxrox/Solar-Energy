

// import { useState } from "react";
// import { useGetAllInvoicesQuery, useUpdateInvoiceStatusMutation } from "@/lib/redux/query";
// import { format } from "date-fns";
// import { DollarSign, FileText, CheckCircle, Clock, Filter, Receipt, Loader2 } from "lucide-react";

// export default function AdminInvoicesPage() {
//   const [filter, setFilter] = useState("ALL"); // ALL, PENDING, PAID
  
//   // 1. Fetch All Invoices (Admin API)
//   const { data: invoices, isLoading } = useGetAllInvoicesQuery(filter);
  
//   // 2. Mutation to update status manually
//   const [updateStatus, { isLoading: isUpdating }] = useUpdateInvoiceStatusMutation();

//   // Calculate Totals (Revenue Logic)
//   const allInvoices = invoices || []; 
  
//   const totalRevenue = allInvoices
//     .filter(i => i.paymentStatus === 'PAID')
//     .reduce((sum, i) => sum + (i.totalEnergyGenerated * 0.05), 0);
    
//   const pendingAmount = allInvoices
//     .filter(i => i.paymentStatus === 'PENDING')
//     .reduce((sum, i) => sum + (i.totalEnergyGenerated * 0.05), 0);

//   const handleMarkPaid = async (id) => {
//     if (window.confirm("Mark this invoice as PAID manually? This action is for cash/check payments.")) {
//       try {
//         await updateStatus({ id, status: "PAID" }).unwrap();
//       } catch (err) {
//         console.error("Failed to update", err);
//         alert("Error updating invoice status");
//       }
//     }
//   };

//   // --- LOADING STATE ---
//   if (isLoading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin opacity-50 mr-2" />
//         <p className="opacity-60">Loading financial data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//             <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
//               <Receipt className="w-8 h-8 opacity-80" />
//               Financial Overview
//             </h1>
//             <p className="opacity-60 mt-1">Track revenue and manage billing across all users.</p>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         {/* Total Revenue */}
//         <div className="rounded-xl border shadow-sm border-l-4 border-l-green-500 overflow-hidden">
//           <div className="p-6 flex items-center justify-between">
//             <div>
//                <p className="text-sm font-medium opacity-70">Total Revenue</p>
//                <div className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</div>
//                <p className="text-xs opacity-50 mt-1">Collected from {allInvoices.filter(i => i.paymentStatus === 'PAID').length} invoices</p>
//             </div>
//             <div className="p-3 rounded-full bg-green-500/10 text-green-600">
//                <DollarSign className="h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         {/* Outstanding Pending */}
//         <div className="rounded-xl border shadow-sm border-l-4 border-l-orange-500 overflow-hidden">
//           <div className="p-6 flex items-center justify-between">
//             <div>
//                <p className="text-sm font-medium opacity-70">Outstanding Pending</p>
//                <div className="text-2xl font-bold mt-1">${pendingAmount.toFixed(2)}</div>
//                <p className="text-xs opacity-50 mt-1">{allInvoices.filter(i => i.paymentStatus === 'PENDING').length} unpaid invoices</p>
//             </div>
//             <div className="p-3 rounded-full bg-orange-500/10 text-orange-600">
//                <Clock className="h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         {/* Total Invoices */}
//         <div className="rounded-xl border shadow-sm border-l-4 border-l-blue-500 overflow-hidden">
//           <div className="p-6 flex items-center justify-between">
//             <div>
//                <p className="text-sm font-medium opacity-70">Total Invoices</p>
//                <div className="text-2xl font-bold mt-1">{allInvoices.length}</div>
//                <p className="text-xs opacity-50 mt-1">Lifetime generated bills</p>
//             </div>
//             <div className="p-3 rounded-full bg-blue-500/10 text-blue-600">
//                <FileText className="h-4 w-4" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filters & List */}
//       <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
//         <div className="flex items-center gap-2 p-6 border-b border-opacity-10 border-current">
//             <Filter className="w-4 h-4 opacity-50" />
//             <span className="text-sm font-medium mr-2 opacity-70">Filter Status:</span>
//             {['ALL', 'PENDING', 'PAID'].map(status => (
//                 <button
//                     key={status}
//                     onClick={() => setFilter(status)}
//                     className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
//                         filter === status 
//                         ? 'border-current font-bold opacity-100 bg-current/10' 
//                         : 'border-transparent opacity-60 hover:opacity-100 hover:bg-current/5'
//                     }`}
//                 >
//                     {status}
//                 </button>
//             ))}
//         </div>

//         <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//                 <thead className="border-b border-opacity-10 border-current opacity-70 font-medium">
//                     <tr>
//                         <th className="p-4">Invoice ID</th>
//                         <th className="p-4">Date Issued</th>
//                         <th className="p-4">Usage (kWh)</th>
//                         <th className="p-4">Amount</th>
//                         <th className="p-4">Status</th>
//                         <th className="p-4 text-right">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className="divide-y divide-current/10">
//                     {invoices?.map((invoice) => (
//                         <tr key={invoice._id} className="hover:bg-current/5 transition-colors">
//                             <td className="p-4 font-mono text-xs opacity-60">
//                               {invoice._id.slice(-8).toUpperCase()}
//                             </td>
//                             <td className="p-4">
//                               {format(new Date(invoice.createdAt), "MMM d, yyyy")}
//                             </td>
//                             <td className="p-4">
//                               {invoice.totalEnergyGenerated.toFixed(1)}
//                             </td>
//                             <td className="p-4 font-bold">
//                               ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
//                             </td>
//                             <td className="p-4">
//                                 <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
//                                     invoice.paymentStatus === 'PAID' 
//                                     ? 'border-green-200 text-green-700 bg-green-500/10' 
//                                     : 'border-orange-200 text-orange-700 bg-orange-500/10'
//                                 }`}>
//                                     {invoice.paymentStatus}
//                                 </span>
//                             </td>
//                             <td className="p-4 text-right">
//                                 {invoice.paymentStatus === 'PENDING' && (
//                                     <button 
//                                         className="px-3 py-1.5 rounded-md border border-blue-500/30 text-blue-600 hover:bg-blue-500/10 text-xs font-medium transition-colors"
//                                         onClick={() => handleMarkPaid(invoice._id)}
//                                         disabled={isUpdating}
//                                     >
//                                         Mark Paid
//                                     </button>
//                                 )}
//                                 {invoice.paymentStatus === 'PAID' && (
//                                     <span className="text-xs opacity-60 flex items-center justify-end gap-1 font-medium">
//                                         <CheckCircle className="w-3 h-3 text-green-500" /> Paid
//                                     </span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
            
//             {/* Empty State */}
//             {invoices?.length === 0 && (
//                 <div className="p-12 text-center opacity-60">
//                     <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
//                     <p>No invoices found matching filter.</p>
//                 </div>
//             )}
//         </div>
//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import { useGetAllInvoicesQuery, useUpdateInvoiceStatusMutation } from "@/lib/redux/query";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { DollarSign, FileText, CheckCircle, Clock, Filter, Receipt, Loader2, User as UserIcon } from "lucide-react";

export default function AdminInvoicesPage() {
  const [filter, setFilter] = useState("ALL"); 
  const { user: currentUser, isLoaded } = useUser();
  
  const { data: invoices, isLoading } = useGetAllInvoicesQuery(filter);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateInvoiceStatusMutation();

  const allInvoices = invoices || []; 
  
  const totalRevenue = allInvoices
    .filter(i => i.paymentStatus === 'PAID')
    .reduce((sum, i) => sum + (i.totalEnergyGenerated * 0.05), 0);
    
  const pendingAmount = allInvoices
    .filter(i => i.paymentStatus === 'PENDING')
    .reduce((sum, i) => sum + (i.totalEnergyGenerated * 0.05), 0);

  const handleMarkPaid = async (id) => {
    if (window.confirm("Mark this invoice as PAID manually? This action is for cash/check payments.")) {
      try {
        await updateStatus({ id, status: "PAID" }).unwrap();
      } catch (err) {
        console.error("Failed to update", err);
        alert("Error updating invoice status");
      }
    }
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin opacity-50 mr-2" />
        <p className="opacity-60">Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Receipt className="w-8 h-8 opacity-80" />
              Financial Overview
            </h1>
            <p className="opacity-60 mt-1">
               Welcome, {currentUser?.firstName || "Admin"}. Track revenue and manage billing across all users.
            </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border shadow-sm border-l-4 border-l-green-500 overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium opacity-70">Total Revenue</p>
               <div className="text-2xl font-bold mt-1">${totalRevenue.toFixed(2)}</div>
               <p className="text-xs opacity-50 mt-1">Collected from {allInvoices.filter(i => i.paymentStatus === 'PAID').length} invoices</p>
            </div>
            <div className="p-3 rounded-full bg-green-500/10 text-green-600">
               <DollarSign className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border shadow-sm border-l-4 border-l-orange-500 overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium opacity-70">Outstanding Pending</p>
               <div className="text-2xl font-bold mt-1">${pendingAmount.toFixed(2)}</div>
               <p className="text-xs opacity-50 mt-1">{allInvoices.filter(i => i.paymentStatus === 'PENDING').length} unpaid invoices</p>
            </div>
            <div className="p-3 rounded-full bg-orange-500/10 text-orange-600">
               <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border shadow-sm border-l-4 border-l-blue-500 overflow-hidden">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium opacity-70">Total Invoices</p>
               <div className="text-2xl font-bold mt-1">{allInvoices.length}</div>
               <p className="text-xs opacity-50 mt-1">Lifetime generated bills</p>
            </div>
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-600">
               <FileText className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & List */}
      <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 p-6 border-b border-opacity-10 border-current">
            <Filter className="w-4 h-4 opacity-50" />
            <span className="text-sm font-medium mr-2 opacity-70">Filter Status:</span>
            {['ALL', 'PENDING', 'PAID'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        filter === status 
                        ? 'border-current font-bold opacity-100 bg-current/10' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:bg-current/5'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="border-b border-opacity-10 border-current opacity-70 font-medium">
                    <tr>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Date Issued</th>
                        <th className="p-4">Usage (kWh)</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-current/10">
                    {allInvoices.map((invoice) => (
                        <tr key={invoice._id} className="hover:bg-current/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 opacity-40" />
                                <div>
                                  {/* Displays firstName from the populated userId object */}
                                  <p className="font-medium">
                                    {invoice.userId?.firstName} {invoice.userId?.lastName || ""}
                                  </p>
                                  <p className="text-[10px] opacity-40 font-mono uppercase">
                                    ID: {invoice.userId?._id?.slice(-6) || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-xs opacity-60">
                              {invoice._id.slice(-8).toUpperCase()}
                            </td>
                            <td className="p-4">
                              {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                            </td>
                            <td className="p-4">
                              {invoice.totalEnergyGenerated.toFixed(1)}
                            </td>
                            <td className="p-4 font-bold">
                              ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
                            </td>
                            <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                    invoice.paymentStatus === 'PAID' 
                                    ? 'border-green-200 text-green-700 bg-green-500/10' 
                                    : 'border-orange-200 text-orange-700 bg-orange-500/10'
                                }`}>
                                    {invoice.paymentStatus}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                {invoice.paymentStatus === 'PENDING' && (
                                    <button 
                                        className="px-3 py-1.5 rounded-md border border-blue-500/30 text-blue-600 hover:bg-blue-500/10 text-xs font-medium transition-colors"
                                        onClick={() => handleMarkPaid(invoice._id)}
                                        disabled={isUpdating}
                                    >
                                        Mark Paid
                                    </button>
                                )}
                                {invoice.paymentStatus === 'PAID' && (
                                    <span className="text-xs opacity-60 flex items-center justify-end gap-1 font-medium">
                                        <CheckCircle className="w-3 h-3 text-green-500" /> Paid
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
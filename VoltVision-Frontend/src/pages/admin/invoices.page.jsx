

import { useState } from "react";
import { useGetAllInvoicesQuery, useUpdateInvoiceStatusMutation } from "@/lib/redux/query";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock, 
  Filter, 
  Receipt, 
  Loader2, 
  User as UserIcon,
  Download 
} from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    try {
      await updateStatus({ id, status: "PAID" }).unwrap();
      toast.success("Invoice marked as PAID", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored"
      });
    } catch (err) {
      console.error("Failed to update", err);
      toast.error("Error updating invoice status", {
        position: "top-right",
        theme: "colored"
      });
    }
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-base-content/40 mr-2" />
        <p className="text-base-content/60">Loading financial data...</p>
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
              <Receipt className="w-8 h-8 opacity-80" />
              Financial Overview
            </h1>
            <p className="text-base-content/60 mt-1">
               Welcome, {currentUser?.firstName || "Admin"}. Track revenue and manage billing across all users.
            </p>
        </div>
        {/* Placeholder Export Button to match Anomalies Page style */}
        <button className="btn btn-sm btn-outline gap-2">
            <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* KPI Cards (Exact Style Match: Left Borders) */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* Total Revenue (Green Border) */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-success overflow-hidden bg-base-100">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Total Revenue</p>
               <div className="text-2xl font-bold mt-1 text-base-content">${totalRevenue.toFixed(2)}</div>
               <p className="text-xs text-base-content/50 mt-1">Collected from {allInvoices.filter(i => i.paymentStatus === 'PAID').length} invoices</p>
            </div>
            <div className="p-3 rounded-full bg-success/10 text-success">
               <DollarSign className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Outstanding Pending (Orange/Warning Border) */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-warning overflow-hidden bg-base-100">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Outstanding Pending</p>
               <div className="text-2xl font-bold mt-1 text-base-content">${pendingAmount.toFixed(2)}</div>
               <p className="text-xs text-base-content/50 mt-1">{allInvoices.filter(i => i.paymentStatus === 'PENDING').length} unpaid invoices</p>
            </div>
            <div className="p-3 rounded-full bg-warning/10 text-warning">
               <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Total Invoices (Blue/Info Border) */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-info overflow-hidden bg-base-100">
          <div className="p-6 flex items-center justify-between">
            <div>
               <p className="text-sm font-medium text-base-content/70">Total Invoices</p>
               <div className="text-2xl font-bold mt-1 text-base-content">{allInvoices.length}</div>
               <p className="text-xs text-base-content/50 mt-1">Lifetime generated bills</p>
            </div>
            <div className="p-3 rounded-full bg-info/10 text-info">
               <FileText className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & List Container */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-6 border-b border-base-200">
            <Filter className="w-4 h-4 text-base-content/50" />
            <span className="text-sm font-medium mr-2 text-base-content/70">Filter Status:</span>
            {['ALL', 'PENDING', 'PAID'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        filter === status 
                        ? 'border-base-content font-bold opacity-100 bg-base-content/10 text-base-content' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:bg-base-content/5 text-base-content'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="border-b border-base-200 bg-base-100 text-base-content/70 font-medium">
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
                <tbody className="divide-y divide-base-200">
                    {allInvoices.map((invoice) => (
                        <tr key={invoice._id} className="hover:bg-base-200/50 transition-colors">
                            {/* Customer */}
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-base-content/40" />
                                <div>
                                  <p className="font-medium text-base-content">
                                    {invoice.userId?.firstName} {invoice.userId?.lastName || ""}
                                  </p>
                                  <p className="text-[10px] text-base-content/40 font-mono uppercase">
                                    ID: {invoice.userId?._id?.slice(-6) || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Invoice ID */}
                            <td className="p-4 font-mono text-xs text-base-content/60">
                              {invoice._id.slice(-8).toUpperCase()}
                            </td>

                            {/* Date */}
                            <td className="p-4 text-base-content/80">
                              {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                            </td>

                            {/* Usage */}
                            <td className="p-4 text-base-content/80">
                              {invoice.totalEnergyGenerated.toFixed(1)}
                            </td>

                            {/* Amount */}
                            <td className="p-4 font-bold text-base-content">
                              ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
                            </td>

                            {/* Status Badge */}
                            <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                    invoice.paymentStatus === 'PAID' 
                                    ? 'border-success/20 text-success bg-success/10' 
                                    : 'border-warning/20 text-warning bg-warning/10'
                                }`}>
                                    {invoice.paymentStatus}
                                </span>
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right">
                                {invoice.paymentStatus === 'PENDING' && (
                                    <button 
                                        className="btn btn-xs btn-outline btn-primary"
                                        onClick={() => handleMarkPaid(invoice._id)}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : "Mark Paid"}
                                    </button>
                                )}
                                {invoice.paymentStatus === 'PAID' && (
                                    <span className="text-xs text-base-content/60 flex items-center justify-end gap-1 font-medium">
                                        <CheckCircle className="w-3 h-3 text-success" /> Paid
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
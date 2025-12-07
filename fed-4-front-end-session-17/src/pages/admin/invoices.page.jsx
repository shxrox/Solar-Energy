// 

import { useState } from "react";
import { useGetAllInvoicesQuery, useUpdateInvoiceStatusMutation } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { DollarSign, FileText, CheckCircle, Clock, Filter, Receipt } from "lucide-react";

export default function AdminInvoicesPage() {
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, PAID
  
  // 1. Fetch All Invoices (Admin API)
  const { data: invoices, isLoading } = useGetAllInvoicesQuery(filter);
  
  // 2. Mutation to update status manually
  const [updateStatus, { isLoading: isUpdating }] = useUpdateInvoiceStatusMutation();

  // Calculate Totals (Revenue Logic)
  // We filter locally for totals to show accurate global stats regardless of the table filter
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

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
        <p className="text-muted-foreground">Loading financial data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <Receipt className="w-8 h-8 text-primary" />
              Financial Overview
            </h1>
            <p className="text-muted-foreground mt-1">Track revenue and manage billing across all users.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Collected from {allInvoices.filter(i => i.paymentStatus === 'PAID').length} invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {allInvoices.filter(i => i.paymentStatus === 'PENDING').length} unpaid invoices
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allInvoices.length}</div>
            <p className="text-xs text-muted-foreground">Lifetime generated bills</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & List */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium mr-2">Filter Status:</span>
            {['ALL', 'PENDING', 'PAID'].map(status => (
                <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        filter === status 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background text-muted-foreground border-input hover:bg-secondary'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>

        <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                    <tr>
                        <th className="p-4">Invoice ID</th>
                        <th className="p-4">Date Issued</th>
                        <th className="p-4">Usage (kWh)</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y bg-card">
                    {invoices?.map((invoice) => (
                        <tr key={invoice._id} className="hover:bg-muted/5 transition-colors">
                            <td className="p-4 font-mono text-xs text-muted-foreground">
                              {invoice._id.slice(-8).toUpperCase()}
                            </td>
                            <td className="p-4">
                              {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                            </td>
                            <td className="p-4">
                              {invoice.totalEnergyGenerated.toFixed(1)}
                            </td>
                            <td className="p-4 font-bold text-foreground">
                              ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
                            </td>
                            <td className="p-4">
                                <Badge variant={invoice.paymentStatus === 'PAID' ? 'default' : 'outline'} 
                                    className={invoice.paymentStatus === 'PAID' 
                                      ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-200' 
                                      : 'text-orange-700 border-orange-200 bg-orange-50'
                                    }>
                                    {invoice.paymentStatus}
                                </Badge>
                            </td>
                            <td className="p-4 text-right">
                                {invoice.paymentStatus === 'PENDING' && (
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 text-xs border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        onClick={() => handleMarkPaid(invoice._id)}
                                        disabled={isUpdating}
                                    >
                                        Mark Paid
                                    </Button>
                                )}
                                {invoice.paymentStatus === 'PAID' && (
                                    <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 font-medium">
                                        <CheckCircle className="w-3 h-3 text-green-500" /> Paid
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Empty State */}
            {invoices?.length === 0 && (
                <div className="p-12 text-center text-muted-foreground">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-20" />
                    <p>No invoices found matching filter.</p>
                </div>
            )}
        </div>
      </Card>

    </div>
  );
}
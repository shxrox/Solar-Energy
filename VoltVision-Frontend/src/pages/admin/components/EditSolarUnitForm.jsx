
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditSolarUnitMutation, useGetAllUsersQuery } from "@/lib/redux/query";
import { useParams, useNavigate } from "react-router";
import { Check, ArrowLeft, Loader2 } from "lucide-react";
// ✅ Import React Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  installationDate: z.string().min(1, { message: "Installation date is required" }),
  capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]),
  userId: z.string().min(1, { message: "User assignment is required" }),
});

export function EditSolarUnitForm({ solarUnit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editSolarUnit, { isLoading: isEditing }] = useEditSolarUnitMutation();
  const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();

  // Formatting helpers
  const formattedDate = solarUnit?.installationDate
    ? new Date(solarUnit.installationDate).toISOString().split("T")[0]
    : "";

  const defaultUserId = typeof solarUnit.userId === "object" 
    ? solarUnit.userId._id 
    : solarUnit.userId;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: solarUnit.serialNumber || "",
      installationDate: formattedDate,
      capacity: solarUnit.capacity || 0,
      status: solarUnit.status || "ACTIVE",
      userId: defaultUserId || "",
    },
  });

  async function onSubmit(values) {
    try {
      await editSolarUnit({ id, data: values }).unwrap();
      
      // ✅ Success Notification
      toast.success("Solar Unit Updated Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        theme: "colored",
        onClose: () => navigate("/admin/solar-units")
      });

    } catch (error) {
      console.error("Update failed:", error);
      // ✅ Error Notification
      toast.error("Failed to update unit. Please try again.", {
        position: "top-right",
        theme: "colored"
      });
    }
  }

  if (isLoadingUsers) return (
    <div className="flex items-center gap-2 p-10 text-base-content/60">
      <Loader2 className="w-4 h-4 animate-spin" /> Loading user directory...
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* ✅ Add Toast Container */}
      <ToastContainer />

      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-base-content/40 hover:text-base-content mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Fleet
      </button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
          
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-base-content">Edit Configuration</h2>
            <p className="text-sm text-base-content/60">Update operational details for this unit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Serial Number */}
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Serial Number</FormLabel>
                  <FormControl>
                    <Input className="bg-transparent border-0 border-b border-base-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all font-bold text-lg text-base-content placeholder:text-base-content/20" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold text-error" />
                </FormItem>
              )}
            />

            {/* Installation Date */}
            <FormField
              control={form.control}
              name="installationDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Installation Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="bg-transparent border-0 border-b border-base-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all font-bold text-base-content" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold text-error" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capacity */}
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Capacity (Watts)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      className="bg-transparent border-0 border-b border-base-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all font-bold text-lg text-base-content" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold text-error" />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-base-content/40">System Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-0 border-b border-base-300 rounded-none px-0 focus:ring-0 focus:border-primary font-bold transition-all text-base-content">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-base-100 border-base-200">
                      <SelectItem value="ACTIVE" className="text-success font-bold focus:bg-base-200 focus:text-success">Active</SelectItem>
                      <SelectItem value="INACTIVE" className="text-base-content/60 focus:bg-base-200">Inactive</SelectItem>
                      <SelectItem value="MAINTENANCE" className="text-warning font-bold focus:bg-base-200 focus:text-warning">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px] uppercase font-bold text-error" />
                </FormItem>
              )}
            />
          </div>

          {/* User Selection */}
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-base-content/40">Assigned Owner</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-0 border-b border-base-300 rounded-none px-0 focus:ring-0 focus:border-primary font-bold transition-all text-base-content">
                      <SelectValue placeholder="Assign a user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-base-100 border-base-200">
                    {users?.map((u) => (
                      <SelectItem key={u._id} value={u._id} className="text-base-content focus:bg-base-200">
                        {u.firstName} {u.lastName} <span className="opacity-50 ml-1">({u.email})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] uppercase font-bold text-error" />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={isEditing}
              // ✅ Updated Button to use daisyUI style + primary color
              className="w-full md:w-auto btn btn-primary rounded-lg font-bold uppercase tracking-widest text-xs px-8 py-4 h-auto"
            >
              {isEditing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" /> Save Configuration
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
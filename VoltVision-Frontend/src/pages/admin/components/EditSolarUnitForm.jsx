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
import { Check, ArrowLeft } from "lucide-react";

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
      // ✅ Navigate back to the list after successful save
      navigate("/admin/solar-units");
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  if (isLoadingUsers) return <div className="p-10 text-center opacity-50">Loading user directory...</div>;

  return (
    <div className="max-w-2xl">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Fleet
      </button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Serial Number */}
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Serial Number</FormLabel>
                  <FormControl>
                    <Input className="bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-600 transition-all font-bold text-lg" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />

            {/* Installation Date */}
            <FormField
              control={form.control}
              name="installationDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Installation Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-600 transition-all font-bold" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Capacity (Watts)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      className="bg-transparent border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-600 transition-all font-bold text-lg" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold" />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-0 border-b rounded-none px-0 focus:ring-0 focus:border-blue-600 font-bold transition-all">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px] uppercase font-bold" />
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
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assigned Owner</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-transparent border-0 border-b rounded-none px-0 focus:ring-0 focus:border-blue-600 font-bold transition-all">
                      <SelectValue placeholder="Assign a user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users?.map((u) => (
                      <SelectItem key={u._id} value={u._id}>
                        {u.firstName} {u.lastName} ({u.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] uppercase font-bold" />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={isEditing}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-xs px-8 py-6 rounded-none transition-all flex items-center gap-2"
            >
              {isEditing ? "Synchronizing..." : <><Check className="w-4 h-4" /> Save Configuration</>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
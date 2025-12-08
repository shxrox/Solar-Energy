// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useEditSolarUnitMutation } from "@/lib/redux/query"
// import { useParams } from "react-router"
// import { useGetAllUsersQuery } from "@/lib/redux/query"

// const formSchema = z.object({
//     serialNumber: z.string().min(1, { message: "Serial number is required" }),
//     installationDate: z.string().min(1, { message: "Installation date is required" }),
//     capacity: z.number().positive({ message: "Capacity must be a positive number" }),
//     status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
//     userId: z.string().min(1, { message: "User ID is required" }),
// });

// export function EditSolarUnitForm({ solarUnit }) {
//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             serialNumber: solarUnit.serialNumber,
//             installationDate: solarUnit.installationDate,
//             capacity: solarUnit.capacity,
//             status: solarUnit.status,
//             userId: solarUnit.userId,
//         },
//     })

//     const { id } = useParams();

//     const [editSolarUnit, { isLoading: isEditingSolarUnit }] = useEditSolarUnitMutation();

//     const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: errorUsers } = useGetAllUsersQuery();


//     console.log(users);

//     async function onSubmit(values) {
//         try {
//             await editSolarUnit({ id, data: values }).unwrap();
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <FormField
//                     control={form.control}
//                     name="serialNumber"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Serial Number</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Serial Number" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="installationDate"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Installation Date</FormLabel>
//                             <FormControl>
//                                 <Input placeholder="Installation Date" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="capacity"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Capacity</FormLabel>
//                             <FormControl>
//                                 <Input type="number" placeholder="Capacity" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="status"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Status</FormLabel>
//                             <FormControl>
//                                 <Select value={field.value || ""} onValueChange={field.onChange}>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select Status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="ACTIVE">Active</SelectItem>
//                                         <SelectItem value="INACTIVE">Inactive</SelectItem>
//                                         <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="userId"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>User</FormLabel>
//                             <FormControl>
//                                 <Select value={field.value || ""} onValueChange={field.onChange}>
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select User" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {users?.map((user) => (
//                                             <SelectItem key={user._id} value={user._id}>{user.email}</SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit" disabled={isEditingSolarUnit}>{isEditingSolarUnit ? "Editing..." : "Edit"}</Button>
//             </form>
//         </Form>
//     );
// }

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
import { useEditSolarUnitMutation } from "@/lib/redux/query";
import { useParams } from "react-router";
import { useGetAllUsersQuery } from "@/lib/redux/query";

const formSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  installationDate: z.string().min(1, { message: "Installation date is required" }),
  // 'coerce' ensures the form input (string) is treated as a number
  capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], {
    message: "Please select a valid status",
  }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export function EditSolarUnitForm({ solarUnit }) {
  // 1. FORMAT DATE: Convert ISO date from DB to YYYY-MM-DD for the input
  const formattedDate = solarUnit?.installationDate
    ? new Date(solarUnit.installationDate).toISOString().split("T")[0]
    : "";

  // 2. HANDLE USER ID: Check if backend sent an object (populated) or just string ID
  const defaultUserId =
    solarUnit?.userId && typeof solarUnit.userId === "object"
      ? solarUnit.userId._id
      : solarUnit.userId;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: solarUnit.serialNumber,
      installationDate: formattedDate,
      capacity: solarUnit.capacity,
      status: solarUnit.status,
      userId: defaultUserId,
    },
  });

  const { id } = useParams();
  const [editSolarUnit, { isLoading: isEditingSolarUnit }] = useEditSolarUnitMutation();
  
  // 3. FETCH USERS: Handle loading/error states for the dropdown
  const { 
    data: users, 
    isLoading: isLoadingUsers, 
    isError: isErrorUsers 
  } = useGetAllUsersQuery();

  async function onSubmit(values) {
    try {
      await editSolarUnit({ id, data: values }).unwrap();
      // Optional: Add a success toast notification here
      console.log("Solar unit updated successfully");
    } catch (error) {
      console.error("Failed to update solar unit:", error);
    }
  }

  // Prevent rendering the form until users are loaded (prevents dropdown crash)
  if (isLoadingUsers) {
    return <div>Loading users...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Serial Number */}
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Serial Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Installation Date */}
        <FormField
          control={form.control}
          name="installationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Installation Date</FormLabel>
              <FormControl>
                {/* Changed to type="date" for proper picker */}
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Capacity */}
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (Watts)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Capacity" 
                  {...field} 
                  // Ensure React treats value as number
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Selection */}
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Safe mapping: checks if users exists first */}
                    {users?.map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isEditingSolarUnit}>
          {isEditingSolarUnit ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
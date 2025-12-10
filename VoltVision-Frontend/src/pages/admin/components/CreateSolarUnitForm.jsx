

// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreateSolarUnitMutation } from "@/lib/redux/query";
// import { useNavigate } from "react-router";
// import { Loader2, AlertCircle, Save } from "lucide-react";

// // Validation Schema
// const formSchema = z.object({
//   serialNumber: z.string().min(1, { message: "Serial number is required" }),
//   installationDate: z.string().min(1, { message: "Installation date is required" }),
//   // Use coerce to handle string-to-number conversion safely
//   capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
//   status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
// });

// export function CreateSolarUnitForm() {
//   const navigate = useNavigate();
//   const [createSolarUnit, { isLoading }] = useCreateSolarUnitMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       serialNumber: "",
//       installationDate: "",
//       capacity: "",
//       status: "ACTIVE",
//     },
//   });

//   async function onSubmit(values) {
//     try {
//       await createSolarUnit(values).unwrap();
//       reset();
//       navigate("/admin/solar-units"); // Redirect back to list
//     } catch (error) {
//       console.error("Failed to create unit:", error);
//     }
//   }

//   return (
//     <div className="rounded-xl border border-base-300 bg-base-100 p-8 shadow-sm max-w-2xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
//         {/* --- Serial Number --- */}
//         <div className="space-y-2">
//           <label htmlFor="serialNumber" className="text-sm font-medium opacity-80 block">
//             Serial Number
//           </label>
//           <input
//             id="serialNumber"
//             type="text"
//             placeholder="e.g. SU-2024-001"
//             {...register("serialNumber")}
//             className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
//               errors.serialNumber ? "border-error text-error focus:ring-error/20" : "border-base-300"
//             }`}
//           />
//           {errors.serialNumber && (
//             <p className="text-xs text-error flex items-center gap-1 mt-1">
//               <AlertCircle className="w-3 h-3" /> {errors.serialNumber.message}
//             </p>
//           )}
//         </div>

//         {/* --- Installation Date --- */}
//         <div className="space-y-2">
//           <label htmlFor="installationDate" className="text-sm font-medium opacity-80 block">
//             Installation Date
//           </label>
//           <input
//             id="installationDate"
//             type="date"
//             {...register("installationDate")}
//             className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
//               errors.installationDate ? "border-error text-error focus:ring-error/20" : "border-base-300"
//             }`}
//           />
//           {errors.installationDate && (
//             <p className="text-xs text-error flex items-center gap-1 mt-1">
//               <AlertCircle className="w-3 h-3" /> {errors.installationDate.message}
//             </p>
//           )}
//         </div>

//         {/* --- Capacity --- */}
//         <div className="space-y-2">
//           <label htmlFor="capacity" className="text-sm font-medium opacity-80 block">
//             Capacity (Watts)
//           </label>
//           <input
//             id="capacity"
//             type="number"
//             placeholder="e.g. 5000"
//             {...register("capacity")}
//             className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
//               errors.capacity ? "border-error text-error focus:ring-error/20" : "border-base-300"
//             }`}
//           />
//           <p className="text-xs opacity-60">Maximum power output of the system in Watts.</p>
//           {errors.capacity && (
//             <p className="text-xs text-error flex items-center gap-1 mt-1">
//               <AlertCircle className="w-3 h-3" /> {errors.capacity.message}
//             </p>
//           )}
//         </div>

//         {/* --- Status --- */}
//         <div className="space-y-2">
//           <label htmlFor="status" className="text-sm font-medium opacity-80 block">
//             Operational Status
//           </label>
//           <div className="relative">
//             <select
//               id="status"
//               {...register("status")}
//               className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
//                 errors.status ? "border-error text-error focus:ring-error/20" : "border-base-300"
//               }`}
//             >
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="MAINTENANCE">Maintenance</option>
//             </select>
//             {/* Custom Arrow Icon */}
//             <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none opacity-50">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
//             </div>
//           </div>
//           {errors.status && (
//             <p className="text-xs text-error flex items-center gap-1 mt-1">
//               <AlertCircle className="w-3 h-3" /> {errors.status.message}
//             </p>
//           )}
//         </div>

//         {/* --- Submit Button --- */}
//         <div className="pt-4 flex justify-end">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-content font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 Create Solar Unit
//               </>
//             )}
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }



import { useState } from "react"; // Added useState
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSolarUnitMutation } from "@/lib/redux/query";
import { useNavigate } from "react-router";
import { Loader2, AlertCircle, Save, CheckCircle } from "lucide-react"; // Added CheckCircle

// Validation Schema
const formSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  installationDate: z.string().min(1, { message: "Installation date is required" }),
  // Use coerce to handle string-to-number conversion safely
  capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
});

export function CreateSolarUnitForm() {
  const navigate = useNavigate();
  const [createSolarUnit, { isLoading }] = useCreateSolarUnitMutation();
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serialNumber: "",
      installationDate: "",
      capacity: "",
      status: "ACTIVE",
    },
  });

  async function onSubmit(values) {
    try {
      await createSolarUnit(values).unwrap();
      setShowSuccess(true); // Show success message
      reset();
      
      // Delay redirect so user sees the message
      setTimeout(() => {
        navigate("/admin/solar-units"); 
      }, 2000);
    } catch (error) {
      console.error("Failed to create unit:", error);
    }
  }

  return (
    <div className="rounded-xl border border-base-300 bg-base-100 p-8 shadow-sm max-w-2xl mx-auto">
      
      {/* --- Success Notification --- */}
      {showSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5" />
          <div>
            <p className="font-bold text-sm">Success!</p>
            <p className="text-xs opacity-90">Solar unit created successfully. Redirecting...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* --- Serial Number --- */}
        <div className="space-y-2">
          <label htmlFor="serialNumber" className="text-sm font-medium opacity-80 block">
            Serial Number
          </label>
          <input
            id="serialNumber"
            type="text"
            placeholder="e.g. SU-2024-001"
            {...register("serialNumber")}
            className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
              errors.serialNumber ? "border-error text-error focus:ring-error/20" : "border-base-300"
            }`}
          />
          {errors.serialNumber && (
            <p className="text-xs text-error flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.serialNumber.message}
            </p>
          )}
        </div>

        {/* --- Installation Date --- */}
        <div className="space-y-2">
          <label htmlFor="installationDate" className="text-sm font-medium opacity-80 block">
            Installation Date
          </label>
          <input
            id="installationDate"
            type="date"
            {...register("installationDate")}
            className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
              errors.installationDate ? "border-error text-error focus:ring-error/20" : "border-base-300"
            }`}
          />
          {errors.installationDate && (
            <p className="text-xs text-error flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.installationDate.message}
            </p>
          )}
        </div>

        {/* --- Capacity --- */}
        <div className="space-y-2">
          <label htmlFor="capacity" className="text-sm font-medium opacity-80 block">
            Capacity (Watts)
          </label>
          <input
            id="capacity"
            type="number"
            placeholder="e.g. 5000"
            {...register("capacity")}
            className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
              errors.capacity ? "border-error text-error focus:ring-error/20" : "border-base-300"
            }`}
          />
          <p className="text-xs opacity-60">Maximum power output of the system in Watts.</p>
          {errors.capacity && (
            <p className="text-xs text-error flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.capacity.message}
            </p>
          )}
        </div>

        {/* --- Status --- */}
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium opacity-80 block">
            Operational Status
          </label>
          <div className="relative">
            <select
              id="status"
              {...register("status")}
              className={`w-full px-4 py-2.5 rounded-lg border bg-transparent outline-none appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
                errors.status ? "border-error text-error focus:ring-error/20" : "border-base-300"
              }`}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none opacity-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          {errors.status && (
            <p className="text-xs text-error flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.status.message}
            </p>
          )}
        </div>

        {/* --- Submit Button --- */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || showSuccess}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-content font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Create Solar Unit
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
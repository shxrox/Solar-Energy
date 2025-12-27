import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSolarUnitMutation } from "@/lib/redux/query";
import { useNavigate } from "react-router";
import { Loader2, AlertCircle, Save, CheckCircle, ArrowLeft } from "lucide-react";

const formSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  installationDate: z.string().min(1, { message: "Installation date is required" }),
  capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
});

export function CreateSolarUnitForm() {
  const navigate = useNavigate();
  const [createSolarUnit, { isLoading }] = useCreateSolarUnitMutation();
  const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
      reset();
      setTimeout(() => {
        navigate("/admin/solar-units"); 
      }, 1500);
    } catch (error) {
      console.error("Failed to create unit:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Back Link */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Return
      </button>

      {/* --- Success Notification --- */}
      {showSuccess && (
        <div className="p-4 border-l-4 border-green-500 text-green-700 flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
          <CheckCircle className="w-5 h-5" />
          <div className="text-sm">
            <p className="font-black uppercase tracking-wider">Unit Registered</p>
            <p className="opacity-80 font-medium">Redirecting to fleet management...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* --- Serial Number --- */}
        <div className="space-y-1">
          <label htmlFor="serialNumber" className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
            Serial Number
          </label>
          <input
            id="serialNumber"
            type="text"
            placeholder="e.g. SU-2024-001"
            {...register("serialNumber")}
            className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold text-lg placeholder:text-gray-200 ${
              errors.serialNumber ? "border-red-500 text-red-600" : "border-gray-200 focus:border-blue-600"
            }`}
          />
          {errors.serialNumber && (
            <p className="text-[10px] font-bold text-red-500 uppercase mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.serialNumber.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- Installation Date --- */}
          <div className="space-y-1">
            <label htmlFor="installationDate" className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
              Installation Date
            </label>
            <input
              id="installationDate"
              type="date"
              {...register("installationDate")}
              className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold ${
                errors.installationDate ? "border-red-500" : "border-gray-200 focus:border-blue-600"
              }`}
            />
          </div>

          {/* --- Capacity --- */}
          <div className="space-y-1">
            <label htmlFor="capacity" className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
              Capacity (Watts)
            </label>
            <input
              id="capacity"
              type="number"
              placeholder="5000"
              {...register("capacity")}
              className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold text-lg ${
                errors.capacity ? "border-red-500" : "border-gray-200 focus:border-blue-600"
              }`}
            />
          </div>
        </div>

        {/* --- Status --- */}
        <div className="space-y-1">
          <label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">
            Initial Operational Status
          </label>
          <div className="relative">
            <select
              id="status"
              {...register("status")}
              className="w-full py-2 bg-transparent border-0 border-b outline-none appearance-none font-bold text-gray-700 cursor-pointer border-gray-200 focus:border-blue-600"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none opacity-40">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading || showSuccess}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synchronizing...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Registry Complete
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Register Solar Unit
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
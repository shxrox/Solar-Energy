
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSolarUnitMutation } from "@/lib/redux/query";
import { useNavigate } from "react-router";
import { Loader2, AlertCircle, Save, CheckCircle, ArrowLeft } from "lucide-react";
// ✅ Import React Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  serialNumber: z.string().min(1, { message: "Serial number is required" }),
  installationDate: z.string().min(1, { message: "Installation date is required" }),
  capacity: z.coerce.number().positive({ message: "Capacity must be a positive number" }),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"], { message: "Please select a valid status" }),
});

export function CreateSolarUnitForm() {
  const navigate = useNavigate();
  const [createSolarUnit, { isLoading, isSuccess: isMutationSuccess }] = useCreateSolarUnitMutation();
  
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

  // ✅ Handle Success with Toast & Navigation
  useEffect(() => {
    if (isMutationSuccess) {
      toast.success("Solar Unit Registered Successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        theme: "colored",
        onClose: () => navigate("/admin/solar-units")
      });
      reset();
    }
  }, [isMutationSuccess, navigate, reset]);

  async function onSubmit(values) {
    try {
      await createSolarUnit(values).unwrap();
      // Toast handled by useEffect on isSuccess
    } catch (error) {
      console.error("Failed to create unit:", error);
      toast.error(error?.data?.message || "Failed to create unit. Check your inputs.", {
        position: "top-right",
        theme: "colored"
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* ✅ Add Toast Container */}
      <ToastContainer />

      {/* Back Link */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-base-content/40 hover:text-base-content transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Return
      </button>

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm">
        
        {/* --- Serial Number --- */}
        <div className="space-y-1">
          <label htmlFor="serialNumber" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 block">
            Serial Number
          </label>
          <input
            id="serialNumber"
            type="text"
            placeholder="e.g. SU-2024-001"
            {...register("serialNumber")}
            className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold text-lg placeholder:text-base-content/20 text-base-content ${
              errors.serialNumber ? "border-error text-error" : "border-base-300 focus:border-primary"
            }`}
          />
          {errors.serialNumber && (
            <p className="text-[10px] font-bold text-error uppercase mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.serialNumber.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- Installation Date --- */}
          <div className="space-y-1">
            <label htmlFor="installationDate" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 block">
              Installation Date
            </label>
            <input
              id="installationDate"
              type="date"
              {...register("installationDate")}
              className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold text-base-content ${
                errors.installationDate ? "border-error" : "border-base-300 focus:border-primary"
              }`}
            />
          </div>

          {/* --- Capacity --- */}
          <div className="space-y-1">
            <label htmlFor="capacity" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 block">
              Capacity (Watts)
            </label>
            <input
              id="capacity"
              type="number"
              placeholder="5000"
              {...register("capacity")}
              className={`w-full py-2 bg-transparent border-0 border-b outline-none transition-all font-bold text-lg text-base-content ${
                errors.capacity ? "border-error" : "border-base-300 focus:border-primary"
              }`}
            />
          </div>
        </div>

        {/* --- Status --- */}
        <div className="space-y-1">
          <label htmlFor="status" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 block">
            Initial Operational Status
          </label>
          <div className="relative">
            <select
              id="status"
              {...register("status")}
              className="w-full py-2 bg-transparent border-0 border-b outline-none appearance-none font-bold text-base-content cursor-pointer border-base-300 focus:border-primary"
            >
              <option value="ACTIVE" className="text-success font-bold">Active (Standard)</option>
              <option value="INACTIVE" className="text-base-content/40">Inactive (Offline)</option>
              <option value="MAINTENANCE" className="text-warning font-bold">Maintenance (Service Mode)</option>
            </select>
            {/* Custom Arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none opacity-40 text-base-content">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading || isMutationSuccess}
            className="w-full md:w-auto btn btn-primary rounded-lg font-bold uppercase tracking-widest text-xs"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synchronizing...
              </>
            ) : isMutationSuccess ? (
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
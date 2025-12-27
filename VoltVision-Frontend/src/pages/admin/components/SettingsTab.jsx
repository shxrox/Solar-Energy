// import { useState, useEffect } from "react";
// import { Settings, Bell, Lock, Database, Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";
// import { useGetSystemSettingsQuery, useUpdateSystemSettingsMutation } from "@/lib/redux/query";

// export function SettingsTab() {
//   // 1. Fetch Data from Backend
//   const { data: serverSettings, isLoading, isError } = useGetSystemSettingsQuery();
  
//   // 2. Setup Mutation for Saving
//   const [updateSettings, { isLoading: isSaving }] = useUpdateSystemSettingsMutation();

//   // Local state for form management
//   const [formData, setFormData] = useState({
//     appName: "",
//     maintenanceMode: false,
//     emailNotifications: true,
//     logRetentionDays: 30,
//   });

//   const [message, setMessage] = useState(null); // Feedback message

//   // 3. Sync Server Data to Local State when loaded
//   useEffect(() => {
//     if (serverSettings) {
//       setFormData({
//         appName: serverSettings.appName || "",
//         maintenanceMode: serverSettings.maintenanceMode || false,
//         emailNotifications: serverSettings.emailNotifications ?? true,
//         logRetentionDays: serverSettings.logRetentionDays || 30,
//       });
//     }
//   }, [serverSettings]);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//     setMessage(null); // Clear messages on edit
//   };

//   const handleSave = async () => {
//     try {
//       await updateSettings(formData).unwrap();
//       setMessage({ type: "success", text: "Settings saved successfully!" });
      
//       // Auto-hide success message
//       setTimeout(() => setMessage(null), 3000);
//     } catch (error) {
//       console.error("Failed to save settings:", error);
//       setMessage({ type: "error", text: "Failed to save settings. Please try again." });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 bg-red-50 text-red-600 rounded-lg flex items-center gap-3">
//         <AlertCircle className="w-5 h-5" />
//         <p>Error loading system settings. Please check your connection.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
      
//       {/* Header Section */}
//       <div className="flex justify-between items-end">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Configure global application behavior
//           </p>
//         </div>
//         {/* Feedback Message */}
//         {message && (
//           <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium animate-in slide-in-from-right-5 ${
//             message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
//           }`}>
//             {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
//             {message.text}
//           </div>
//         )}
//       </div>

//       {/* General Settings */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
//             <Settings className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
//         </div>
//         <div className="h-px w-full bg-gray-100 my-4" />

//         <div className="space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700 block">Application Name</label>
//             <input
//               value={formData.appName}
//               onChange={(e) => handleChange("appName", e.target.value)}
//               placeholder="e.g. VoltVision"
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
//             />
//           </div>

//           {/* Maintenance Mode Toggle */}
//           <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
//             <div>
//               <p className="font-medium text-gray-900">Maintenance Mode</p>
//               <p className="text-xs text-gray-500">Prevents non-admin users from accessing the dashboard</p>
//             </div>
//             <div className="relative inline-flex items-center cursor-pointer">
//               <input 
//                 type="checkbox" 
//                 className="sr-only peer" 
//                 checked={formData.maintenanceMode}
//                 onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
//               />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Notification Settings */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
//             <Bell className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
//         </div>
//         <div className="h-px w-full bg-gray-100 my-4" />

//         <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
//           <div>
//             <p className="font-medium text-gray-900">Email Notifications</p>
//             <p className="text-xs text-gray-500">Send automatic alerts for critical system anomalies</p>
//           </div>
//           <input
//             type="checkbox"
//             checked={formData.emailNotifications}
//             onChange={(e) => handleChange("emailNotifications", e.target.checked)}
//             className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//           />
//         </label>
//       </div>

//       {/* Data Settings */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
//             <Database className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">Data Retention</h3>
//         </div>
//         <div className="h-px w-full bg-gray-100 my-4" />

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700 block">Log Retention (Days)</label>
//           <input
//             type="number"
//             value={formData.logRetentionDays}
//             onChange={(e) => handleChange("logRetentionDays", Number(e.target.value))}
//             className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm"
//           />
//           <p className="text-xs text-gray-500">Historical data older than this will be archived.</p>
//         </div>
//       </div>

//       {/* Security Actions (Read Only / Placeholder for now) */}
//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm opacity-60">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="p-2 rounded-lg bg-red-50 text-red-600">
//             <Lock className="w-5 h-5" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900">Security Actions</h3>
//         </div>
//         <div className="h-px w-full bg-gray-100 my-4" />
//         <p className="text-sm text-gray-500 italic">Advanced security actions are managed via the Clerk Dashboard.</p>
//       </div>

//       {/* Footer Actions */}
//       <div className="sticky bottom-6 flex justify-end gap-3 pt-4">
//         <button 
//           onClick={handleSave} 
//           disabled={isSaving}
//           className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//         >
//           {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="w-4 h-4" />}
//           {isSaving ? "Saving Changes..." : "Save All Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Settings, Bell, Lock, Database, Loader2, Save } from "lucide-react";
import { useGetSystemSettingsQuery, useUpdateSystemSettingsMutation } from "@/lib/redux/query";
// ✅ Import React Toastify
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SettingsTab() {
  const { data: serverSettings, isLoading, isError } = useGetSystemSettingsQuery();
  const [updateSettings, { isLoading: isSaving }] = useUpdateSystemSettingsMutation();

  const [formData, setFormData] = useState({
    appName: "",
    maintenanceMode: false,
    emailNotifications: true,
    logRetentionDays: 30,
  });

  useEffect(() => {
    if (serverSettings) {
      setFormData({
        appName: serverSettings.appName || "",
        maintenanceMode: serverSettings.maintenanceMode || false,
        emailNotifications: serverSettings.emailNotifications ?? true,
        logRetentionDays: serverSettings.logRetentionDays || 30,
      });
    }
  }, [serverSettings]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await updateSettings(formData).unwrap();
      
      // ✅ Success Toast
      toast.success("Settings saved successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "colored",
      });

    } catch (error) {
      console.error("Failed to save settings:", error);
      // ✅ Error Toast
      toast.error("Failed to save settings. Please try again.", {
        position: "top-right",
        theme: "colored"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-base-content/20" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error shadow-sm rounded-xl">
        <span className="font-medium">Error loading system settings. Please check your connection.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* ✅ Add Toast Container */}
      <ToastContainer />

      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Settings</h2>
          <p className="text-sm text-base-content/60 mt-1">
            Configure global application behavior
          </p>
        </div>
      </div>

      {/* General Settings */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-info/10 text-info">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">General Settings</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content/70 block">Application Name</label>
            <input
              value={formData.appName}
              onChange={(e) => handleChange("appName", e.target.value)}
              placeholder="e.g. VoltVision"
              className="input input-bordered w-full focus:input-primary transition-all text-sm"
            />
          </div>

          {/* Maintenance Mode Toggle */}
          <label className="flex items-center justify-between p-4 rounded-xl border border-base-200 hover:bg-base-200/30 cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-base-content">Maintenance Mode</p>
              <p className="text-xs text-base-content/60">Prevents non-admin users from accessing the dashboard</p>
            </div>
            <input 
              type="checkbox" 
              className="toggle toggle-primary"
              checked={formData.maintenanceMode}
              onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-warning/10 text-warning">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">Notifications</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <label className="flex items-center justify-between p-4 rounded-xl border border-base-200 hover:bg-base-200/30 cursor-pointer transition-colors">
          <div>
            <p className="font-medium text-base-content">Email Notifications</p>
            <p className="text-xs text-base-content/60">Send automatic alerts for critical system anomalies</p>
          </div>
          <input 
            type="checkbox" 
            className="checkbox checkbox-primary"
            checked={formData.emailNotifications}
            onChange={(e) => handleChange("emailNotifications", e.target.checked)}
          />
        </label>
      </div>

      {/* Data Settings */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">Data Retention</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />

        <div className="space-y-2">
          <label className="text-sm font-medium text-base-content/70 block">Log Retention (Days)</label>
          <input
            type="number"
            value={formData.logRetentionDays}
            onChange={(e) => handleChange("logRetentionDays", Number(e.target.value))}
            className="input input-bordered w-full focus:input-secondary transition-all text-sm"
          />
          <p className="text-xs text-base-content/60">Historical data older than this will be archived.</p>
        </div>
      </div>

      {/* Security Actions (Read Only) */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm opacity-60">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-error/10 text-error">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-base-content">Security Actions</h3>
        </div>
        <div className="h-px w-full bg-base-200 my-4" />
        <p className="text-sm text-base-content/60 italic">Advanced security actions are managed via the Clerk Dashboard.</p>
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-6 flex justify-end gap-3 pt-4">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn btn-neutral px-8"
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
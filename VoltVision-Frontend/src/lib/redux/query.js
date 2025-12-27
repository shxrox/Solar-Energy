

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: async (headers) => {
//       const clerk = window.Clerk;
//       if (clerk) {
//         const token = await clerk.session?.getToken();
//         if (token) {
//           headers.set("Authorization", `Bearer ${token}`);
//         }
//       }
//       return headers;
//     },
//   }),
//   // ✅ Added "Anomalies" to tagTypes for automatic UI refreshes
//   tagTypes: ["SolarUnits", "Users", "Invoices", "Anomalies"], 
//   endpoints: (build) => ({
    
//     // --- SOLAR UNIT ENDPOINTS ---
//     getSolarUnits: build.query({
//       query: () => `/solar-units`,
//       providesTags: ["SolarUnits"],
//     }),
//     getSolarUnitById: build.query({
//       query: (id) => `/solar-units/${id}`,
//       providesTags: (result, error, id) => [{ type: "SolarUnits", id }],
//     }),
//     getSolarUnitForUser: build.query({
//       query: () => `/solar-units/me`,
//       providesTags: ["SolarUnits"],
//     }),
//     createSolarUnit: build.mutation({
//       query: (data) => ({
//         url: `/solar-units`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["SolarUnits"],
//     }),
//     editSolarUnit: build.mutation({
//       query: ({ id, data }) => ({
//         url: `/solar-units/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["SolarUnits"],
//     }),
//     deleteSolarUnit: build.mutation({
//       query: (id) => ({
//         url: `/solar-units/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["SolarUnits"],
//     }),

//     // --- ENERGY & WEATHER ENDPOINTS ---
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({ id, groupBy, limit }) =>
//         `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),
//     getWeather: build.query({
//       query: () => `/weather`,
//     }),

//     // --- ANALYTICS & ANOMALY DETECTION (Task 5) ---
//     getCapacityFactor: build.query({
//       query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
//     }),
//     // ✅ FIXED URL: Points to the anomaly router to avoid 404 errors
//     getAnomalyStats: build.query({
//       query: (solarUnitId) => `/anomalies/analytics/${solarUnitId}`,
//       providesTags: ["Anomalies"],
//     }),
//     // This fetches the list of anomalies for the current user
//     getMyAnomalies: build.query({
//       query: () => `/anomalies/my-unit`,
//       providesTags: ["Anomalies"],
//     }),
//     // Action to mark as resolved
//     resolveAnomaly: build.mutation({
//       query: (id) => ({
//         url: `/anomalies/${id}/resolve`,
//         method: "PATCH",
//       }),
//       // ✅ This invalidates the chart and list data so they update immediately
//       invalidatesTags: ["Anomalies"],
//     }),

//     // --- USER MANAGEMENT ---
//     getAllUsers: build.query({
//       query: () => `/users`,
//       providesTags: ["Users"],
//     }),

//     // --- BILLING & PAYMENT ENDPOINTS ---
//     getMyInvoices: build.query({
//       query: () => `/invoices`,
//       providesTags: ["Invoices"],
//     }),
//     createCheckoutSession: build.mutation({
//       query: (invoiceId) => ({
//         url: `/payments/create-checkout-session`,
//         method: "POST",
//         body: { invoiceId },
//       }),
//     }),
//     getSessionStatus: build.query({
//       query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
//     }),

//     // --- ADMIN ENDPOINTS ---
//     getAllInvoices: build.query({
//       query: (status) => `/invoices/admin/all${status ? `?status=${status}` : ''}`,
//       providesTags: ["Invoices"],
//     }),
//     updateInvoiceStatus: build.mutation({
//       query: ({ id, status }) => ({
//         url: `/invoices/admin/${id}/status`,
//         method: "PATCH",
//         body: { status },
//       }),
//       invalidatesTags: ["Invoices"],
//     }),
//     getAllAnomaliesAdmin: build.query({
//       query: () => `/anomalies/admin/all`,
//       providesTags: ["Anomalies"],
//     }),
//   }),
// });



// export const {
//   // Solar Unit Hooks
//   useGetSolarUnitsQuery,
//   useGetSolarUnitByIdQuery,
//   useGetSolarUnitForUserQuery,
//   useCreateSolarUnitMutation,
//   useEditSolarUnitMutation,
//   useDeleteSolarUnitMutation,

//   // Energy & Analytics Hooks
//   useGetEnergyGenerationRecordsBySolarUnitQuery,
//   useGetWeatherQuery,
//   useGetCapacityFactorQuery,
  
//   // ✅ Anomaly Hooks
//   useGetAnomalyStatsQuery,
//   useGetMyAnomaliesQuery,
//   useResolveAnomalyMutation,
//   useGetAllAnomaliesAdminQuery,

//   // Billing Hooks
//   useGetMyInvoicesQuery,
//   useCreateCheckoutSessionMutation,
//   useGetSessionStatusQuery,

//   // Admin & User Hooks
//   useGetAllUsersQuery,
//   useGetAllInvoicesQuery,
//   useUpdateInvoiceStatusMutation,
// } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: async (headers) => {
      const clerk = window.Clerk;
      if (clerk) {
        const token = await clerk.session?.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  // ✅ Added "Settings" to tagTypes so the UI updates after saving
  tagTypes: ["SolarUnits", "Users", "Invoices", "Anomalies", "Settings"], 
  endpoints: (build) => ({
    
    // --- SOLAR UNIT ENDPOINTS ---
    getSolarUnits: build.query({
      query: () => `/solar-units`,
      providesTags: ["SolarUnits"],
    }),
    getSolarUnitById: build.query({
      query: (id) => `/solar-units/${id}`,
      providesTags: (result, error, id) => [{ type: "SolarUnits", id }],
    }),
    getSolarUnitForUser: build.query({
      query: () => `/solar-units/me`,
      providesTags: ["SolarUnits"],
    }),
    createSolarUnit: build.mutation({
      query: (data) => ({
        url: `/solar-units`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SolarUnits"],
    }),
    editSolarUnit: build.mutation({
      query: ({ id, data }) => ({
        url: `/solar-units/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SolarUnits"],
    }),
    deleteSolarUnit: build.mutation({
      query: (id) => ({
        url: `/solar-units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SolarUnits"],
    }),

    // --- ENERGY & WEATHER ENDPOINTS ---
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({ id, groupBy, limit }) =>
        `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getWeather: build.query({
      query: () => `/weather`,
    }),

    // --- ANALYTICS & ANOMALY DETECTION ---
    getCapacityFactor: build.query({
      query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
    }),
    // Charts Data
    getAnomalyStats: build.query({
      query: (solarUnitId) => `/anomalies/analytics/${solarUnitId}`,
      providesTags: ["Anomalies"],
    }),
    // User's Anomaly List
    getMyAnomalies: build.query({
      query: () => `/anomalies/my-unit`,
      providesTags: ["Anomalies"],
    }),
    // Resolve Action
    resolveAnomaly: build.mutation({
      query: (id) => ({
        url: `/anomalies/${id}/resolve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Anomalies"],
    }),

    // --- USER MANAGEMENT ---
    getAllUsers: build.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),

    // --- BILLING & PAYMENT ---
    getMyInvoices: build.query({
      query: () => `/invoices`,
      providesTags: ["Invoices"],
    }),
    createCheckoutSession: build.mutation({
      query: (invoiceId) => ({
        url: `/payments/create-checkout-session`,
        method: "POST",
        body: { invoiceId },
      }),
    }),
    getSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),

    // --- SYSTEM SETTINGS (NEW) ---
    getSystemSettings: build.query({
      query: () => `/settings`,
      providesTags: ["Settings"],
    }),
    updateSystemSettings: build.mutation({
      query: (data) => ({
        url: `/settings`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    // --- ADMIN ENDPOINTS ---
    getAllInvoices: build.query({
      query: (status) => `/invoices/admin/all${status ? `?status=${status}` : ''}`,
      providesTags: ["Invoices"],
    }),
    updateInvoiceStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/invoices/admin/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Invoices"],
    }),
    getAllAnomaliesAdmin: build.query({
      query: () => `/anomalies/admin/all`,
      providesTags: ["Anomalies"],
    }),
  }),
});

export const {
  // Solar Unit Hooks
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useGetSolarUnitForUserQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useDeleteSolarUnitMutation,

  // Energy & Analytics Hooks
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetWeatherQuery,
  useGetCapacityFactorQuery,
  
  // Anomaly Hooks
  useGetAnomalyStatsQuery,
  useGetMyAnomaliesQuery,
  useResolveAnomalyMutation,
  useGetAllAnomaliesAdminQuery,

  // Billing Hooks
  useGetMyInvoicesQuery,
  useCreateCheckoutSessionMutation,
  useGetSessionStatusQuery,

  // System Settings Hooks (NEW)
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,

  // Admin & User Hooks
  useGetAllUsersQuery,
  useGetAllInvoicesQuery,
  useUpdateInvoiceStatusMutation,
} = api;
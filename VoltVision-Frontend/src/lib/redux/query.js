
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
//   tagTypes: ["SolarUnits", "Users", "Invoices"], 
//   endpoints: (build) => ({
//     // ... (Keep existing endpoints) ...
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
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({ id, groupBy, limit }) =>
//         `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),
//     getAllUsers: build.query({
//       query: () => `/users`,
//       providesTags: ["Users"],
//     }),
//     getWeather: build.query({
//       query: () => `/weather`,
//     }),
//     getCapacityFactor: build.query({
//       query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
//     }),
//     getAnomalyStats: build.query({
//       query: (solarUnitId) => `/analytics/anomalies/${solarUnitId}`,
//     }),

//     // --- BILLING ENDPOINTS ---
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

//     // --- ✅ NEW ADMIN INVOICE ENDPOINTS ---
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
//   }),
// });

// export const {
//   // Existing hooks
//   useGetSolarUnitsQuery,
//   useGetSolarUnitByIdQuery,
//   useGetSolarUnitForUserQuery,
//   useCreateSolarUnitMutation,
//   useEditSolarUnitMutation,
//   useDeleteSolarUnitMutation,
//   useGetEnergyGenerationRecordsBySolarUnitQuery,
//   useGetAllUsersQuery,
//   useGetWeatherQuery,
//   useGetCapacityFactorQuery,
//   useGetAnomalyStatsQuery,
//   useGetMyInvoicesQuery,
//   useCreateCheckoutSessionMutation,
//   useGetSessionStatusQuery,

//   // ✅ New Admin Hooks
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
  // ✅ Added "Anomalies" to tagTypes for automatic UI refreshes
  tagTypes: ["SolarUnits", "Users", "Invoices", "Anomalies"], 
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

    // --- ANALYTICS & ANOMALY DETECTION (Task 5) ---
    getCapacityFactor: build.query({
      query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
    }),
    // This fetches the chart data (pie/trends)
    getAnomalyStats: build.query({
      query: (solarUnitId) => `/analytics/anomalies/${solarUnitId}`,
      providesTags: ["Anomalies"],
    }),
    // This fetches the list of anomalies for the current user
    getMyAnomalies: build.query({
      query: () => `/anomalies/my-unit`,
      providesTags: ["Anomalies"],
    }),
    // Action to mark as resolved
    resolveAnomaly: build.mutation({
      query: (id) => ({
        url: `/anomalies/${id}/resolve`,
        method: "PATCH",
      }),
      // ✅ This invalidates the chart and list data so they update immediately
      invalidatesTags: ["Anomalies"],
    }),

    // --- USER MANAGEMENT ---
    getAllUsers: build.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),

    // --- BILLING & PAYMENT ENDPOINTS ---
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
  
  // ✅ Anomaly Hooks (Task 5)
  useGetAnomalyStatsQuery,
  useGetMyAnomaliesQuery,
  useResolveAnomalyMutation,
  useGetAllAnomaliesAdminQuery,

  // Billing Hooks
  useGetMyInvoicesQuery,
  useCreateCheckoutSessionMutation,
  useGetSessionStatusQuery,

  // Admin & User Hooks
  useGetAllUsersQuery,
  useGetAllInvoicesQuery,
  useUpdateInvoiceStatusMutation,
} = api;
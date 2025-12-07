// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // Use environment variable if available, otherwise default to localhost:8000
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
//   tagTypes: ["SolarUnits", "Users"],
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

//     // --- DATA ENDPOINTS ---
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({ id, groupBy, limit }) =>
//         `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),
//     getAllUsers: build.query({
//       query: () => `/users`,
//       providesTags: ["Users"],
//     }),

//     // --- ANALYTICS DASHBOARD ENDPOINTS ---
//     getWeather: build.query({
//       query: () => `/weather`,
//     }),
//     getCapacityFactor: build.query({
//       query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
//     }),
//     getAnomalyStats: build.query({
//       query: (solarUnitId) => `/analytics/anomalies/${solarUnitId}`,
//     }),
//   }),
// });

// export const {
//   useGetSolarUnitsQuery,
//   useGetSolarUnitByIdQuery,
//   useGetSolarUnitForUserQuery,
//   useCreateSolarUnitMutation,
//   useEditSolarUnitMutation,
//   useDeleteSolarUnitMutation,
//   useGetEnergyGenerationRecordsBySolarUnitQuery,
//   useGetAllUsersQuery,
//   // Analytics Hooks
//   useGetWeatherQuery,
//   useGetCapacityFactorQuery,
//   useGetAnomalyStatsQuery,
// } = api;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use environment variable if available, otherwise default to localhost:8000
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
  // ✅ Added "Invoices" tag so the list refreshes after payment
  tagTypes: ["SolarUnits", "Users", "Invoices"], 
  endpoints: (build) => ({
    // --- EXISTING ENDPOINTS ---
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
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({ id, groupBy, limit }) =>
        `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getAllUsers: build.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
    getWeather: build.query({
      query: () => `/weather`,
    }),
    getCapacityFactor: build.query({
      query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
    }),
    getAnomalyStats: build.query({
      query: (solarUnitId) => `/analytics/anomalies/${solarUnitId}`,
    }),

    // --- ✅ NEW BILLING ENDPOINTS ---
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
  }),
});

export const {
  // Existing hooks
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useGetSolarUnitForUserQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useDeleteSolarUnitMutation,
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetAllUsersQuery,
  useGetWeatherQuery,
  useGetCapacityFactorQuery,
  useGetAnomalyStatsQuery,

  // ✅ New Billing Hooks
  useGetMyInvoicesQuery,
  useCreateCheckoutSessionMutation,
  useGetSessionStatusQuery,
} = api;
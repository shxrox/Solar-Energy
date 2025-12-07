// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "http://localhost:8000/api";

// // Define a service using a base URL and expected endpoints
// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: baseUrl, prepareHeaders: async (headers) => {
//     const clerk = window.Clerk;
//     if (clerk) {
//       const token = await clerk.session.getToken();
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//     }
//     return headers;
//   } }),
//   endpoints: (build) => ({
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({id, groupBy, limit}) => `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),
//     getSolarUnitForUser: build.query({
//       query: () => `/solar-units/me`,
//     }),
//     getSolarUnits: build.query({
//       query: () => `/solar-units`,
//     }),
//     getSolarUnitById: build.query({
//       query: (id) => `/solar-units/${id}`,
//     }),
//     createSolarUnit: build.mutation({
//       query: (data) => ({
//         url: `/solar-units`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     editSolarUnit: build.mutation({
//       query: ({id, data}) => ({
//         url: `/solar-units/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//     getAllUsers: build.query({
//       query: () => `/users`,
//     }),
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetAllUsersQuery, useGetEnergyGenerationRecordsBySolarUnitQuery, useGetSolarUnitForUserQuery, useGetSolarUnitsQuery, useGetSolarUnitByIdQuery, useCreateSolarUnitMutation, useEditSolarUnitMutation } = api;


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "http://localhost:8000/api";

// // Define a service using a base URL and expected endpoints
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
//   endpoints: (build) => ({
//     // --- EXISTING ENDPOINTS ---
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({ id, groupBy, limit }) =>
//         `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),
//     getSolarUnitForUser: build.query({
//       query: () => `/solar-units/me`,
//     }),
//     getSolarUnits: build.query({
//       query: () => `/solar-units`,
//     }),
//     getSolarUnitById: build.query({
//       query: (id) => `/solar-units/${id}`,
//     }),
//     createSolarUnit: build.mutation({
//       query: (data) => ({
//         url: `/solar-units`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     editSolarUnit: build.mutation({
//       query: ({ id, data }) => ({
//         url: `/solar-units/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//     getAllUsers: build.query({
//       query: () => `/users`,
//     }),

//     // --- NEW TASK 3 ENDPOINTS ---
//     getWeather: build.query({
//       query: () => `/weather`,
//     }),
//     getCapacityFactor: build.query({
//       query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetAllUsersQuery,
//   useGetEnergyGenerationRecordsBySolarUnitQuery,
//   useGetSolarUnitForUserQuery,
//   useGetSolarUnitsQuery,
//   useGetSolarUnitByIdQuery,
//   useCreateSolarUnitMutation,
//   useEditSolarUnitMutation,
//   // New Hooks Exported Here:
//   useGetWeatherQuery,
//   useGetCapacityFactorQuery,
// } = api;


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
//   tagTypes: ["SolarUnits", "Users"], // Used for cache invalidation (auto-refresh)
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

//     // --- ENERGY DATA ENDPOINTS ---
//     getEnergyGenerationRecordsBySolarUnit: build.query({
//       query: ({ id, groupBy, limit }) =>
//         `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
//     }),

//     // --- USER ENDPOINTS ---
//     getAllUsers: build.query({
//       query: () => `/users`,
//       providesTags: ["Users"],
//     }),

//     // --- DASHBOARD WIDGET ENDPOINTS (Task 3) ---
//     getWeather: build.query({
//       query: () => `/weather`,
//     }),
//     getCapacityFactor: build.query({
//       query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
//     }),
//   }),
// });

// // Export hooks for usage in components
// export const {
//   // Solar Unit Hooks
//   useGetSolarUnitsQuery,
//   useGetSolarUnitByIdQuery,
//   useGetSolarUnitForUserQuery,
//   useCreateSolarUnitMutation,
//   useEditSolarUnitMutation,
//   useDeleteSolarUnitMutation, // <--- This fixes your error

//   // Energy Hooks
//   useGetEnergyGenerationRecordsBySolarUnitQuery,

//   // User Hooks
//   useGetAllUsersQuery,

//   // Dashboard Hooks
//   useGetWeatherQuery,
//   useGetCapacityFactorQuery,
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
  tagTypes: ["SolarUnits", "Users"],
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

    // --- DATA ENDPOINTS ---
    getEnergyGenerationRecordsBySolarUnit: build.query({
      query: ({ id, groupBy, limit }) =>
        `/energy-generation-records/solar-unit/${id}?groupBy=${groupBy}&limit=${limit}`,
    }),
    getAllUsers: build.query({
      query: () => `/users`,
      providesTags: ["Users"],
    }),

    // --- ANALYTICS DASHBOARD ENDPOINTS ---
    getWeather: build.query({
      query: () => `/weather`,
    }),
    getCapacityFactor: build.query({
      query: (solarUnitId) => `/analytics/capacity-factor/${solarUnitId}`,
    }),
    getAnomalyStats: build.query({
      query: (solarUnitId) => `/analytics/anomalies/${solarUnitId}`,
    }),
  }),
});

export const {
  useGetSolarUnitsQuery,
  useGetSolarUnitByIdQuery,
  useGetSolarUnitForUserQuery,
  useCreateSolarUnitMutation,
  useEditSolarUnitMutation,
  useDeleteSolarUnitMutation,
  useGetEnergyGenerationRecordsBySolarUnitQuery,
  useGetAllUsersQuery,
  // Analytics Hooks
  useGetWeatherQuery,
  useGetCapacityFactorQuery,
  useGetAnomalyStatsQuery,
} = api;
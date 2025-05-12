import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./const";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: "include",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: [],
  endpoints: (builder) => ({
    // 🔹 Staff APIs
    addStaff: builder.mutation({
      query: (payload) => ({
        url: URL.ADDSTAFF,
        method: "POST",
        body: payload,
      }),
    }),
    viewStaff: builder.query({
      query: () => ({
        url: URL.VIEWSTAFF,
        method: "GET",
      }),
    }),
    particularviewStaff: builder.query({
      query: (id) => ({
        url: `${URL.PARTICULARVIEWSTAFF}/${id}`,
        method: "GET",
      }),
    }),
    editStaff: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.EDITSTAFF}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    // 🔹 Lead APIs
    Leadadd: builder.mutation({
      query: (payload) => ({
        url: URL.ADDLEEDS,
        method: "POST",
        body: payload,
      }),
    }),
    leadedit: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.LEAD_EDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    // 🔹 Course APIs
    courseadd: builder.mutation({
      query: (payload) => ({
        url: URL.ADDCOURSE,
        method: "POST",
        body: payload,
      }),
    }),
    viewUser: builder.query({
      query: () => ({
        url: URL.VIEWCOURSE,
        method: "GET",
      }),
    }),
    courseUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.EDITCOURSE}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteuser: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETECOURSE}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// ✅ Hooks Export
export const {
  useAddStaffMutation,
  useLazyViewStaffQuery,
  useLazyParticularviewStaffQuery,
  useEditStaffMutation,
  useLeadaddMutation,
  useLeadeditMutation,
  useCourseaddMutation,
  useLazyViewUserQuery,
  useCourseUserMutation,
  useDeleteuserMutation,
  
} = api;

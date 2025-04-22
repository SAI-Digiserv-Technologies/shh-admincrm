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
    addStaff: builder.mutation({
      query: (payload) => ({
        url: URL.ADDSTAFF,
        method: "POST",
        body: payload,
      }),
    }),

    Login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      })
    }),

    roles: builder.mutation({
      query: (payload) => ({
        url: URL.ROLE,
        method: "POST",
        body: payload,

      })
    }),
    viewroles: builder.query({
      query: () => ({
        url: URL.VIEWROLES,
        method: "GET",

      })
    }),

    Editroles: builder.mutation({
      query: (id) => ({
        url: `${URL.EDITROLES}/${id}`,
        method: "PUT",
      })
    }),
    viewStaff: builder.query({
      query: () => ({
        url: URL.VIEWSTAFF,
        method: "GET",
      }),
    }),

    sourceadd: builder.mutation({
      query: (payload) => ({
        url: URL.SOURCEPOST,
        method: "POST",
        body: payload,
      })
    }),
    sourceget: builder.query({
      query: () => ({
        url: URL.SOURCEGET,
        method: "GET",

      })
    }),

    courseadd: builder.mutation({
      query: (payload) => ({
        url: URL.COURSEADD,
        method: "POST",
        body: payload,

      })
    }),



  }),
});

export const { useLoginMutation, useRolesMutation, useLazyViewrolesQuery, useEditrolesMutation, useAddStaffMutation, useLazyViewStaffQuery, useSourceaddMutation, useCourseaddMutation, useLazySourcegetQuery } = api;




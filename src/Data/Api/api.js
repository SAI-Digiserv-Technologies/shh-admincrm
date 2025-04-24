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
  //staf post
  endpoints: (builder) => ({
    addStaff: builder.mutation({
      query: (payload) => ({
        url: URL.ADDSTAFF,
        method: "POST",
        body: payload,
      }),
    }),
    //staff get
    viewStaff: builder.query({
      query: () => ({
        url: URL.VIEWSTAFF,
        method: "GET",
      }),
    }),

    //staff parti get
    particularviewStaff: builder.query({
      query: (id) => ({
        url: `${URL.PARTICULARVIEWSTAFF}${id}`,
        method: "GET",
      }),
    }),
    //staff edit put
    editStaff: builder.mutation({
      query: (id, payload) => ({
        url: `${URL.EDITSTAFF}${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useAddStaffMutation, useLazyViewStaffQuery, useLazyParticularviewStaffQuery, useEditStaffMutation } = api;

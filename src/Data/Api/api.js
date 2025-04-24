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
    login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),
    viewStaff: builder.query({
      query: () => ({
        url: URL.GETUSER,
        method: "GET",
      }),
    }),
    viewUser: builder.query({
      query: (id) => ({
        url:`${URL.VIEWUSER}${id}`,
        method: "GET",
      }),
    }),
    editUser: builder.query({
      query: (id,payload) => ({
        url:`${URL.EDITUSER}${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyGetUserQuery, useLazyViewUserQuery, useLazyEditUserQuery } = api;

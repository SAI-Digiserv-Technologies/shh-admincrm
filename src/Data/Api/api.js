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
    Leadadd: builder.mutation({
      query: (payload) => ({
        url: URL.ADDLEEDS,
        method: "POST",
        body: payload,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: URL.VIEWLEED,
        method: "GET",
      }),
    }),
    leadedit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.LEAD_EDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    
  


  //  course api
    courseadd:builder.mutation({
      query: (payload) => ({
      url: URL.ADDCOURSE,
       method: "POST",
       body: payload,
      })
    }),
    viewUser: builder.query({
      query: () => ({
        url: URL.VIEWCOURSE,
        method: "GET",
      }),
    }),
    courseUser:builder.mutation({
      query:({payload,id}) => ({
      url:`${URL.EDITCOURSE}/${id}`,
       method: "PUT",
       body: payload,
      })
    }),
    deleteuser:builder.mutation({
      query:(id) =>({
        url:`${URL.DELETECOURSE}/${id}`,
       method: "DELETE",
       
      })
    }),

    //  viewUser: builder.query({
    //    query: (id) => ({
    //      url:`${URL.VIEWLEED}${id}`,
    //     method: "GET",
    //  }),
    //  }),
    // editUser: builder.query({
    //   query: (id,payload) => ({
    //     url:`${URL.EDITUSER}${id}`,
    //     method: "PUT",
    //     body: payload,
    //   }),
    // }),
  }),
});

export const { useLeadaddMutation, useLazyGetUserQuery, useCourseaddMutation,useLazyViewUserQuery,useCourseUserMutation,useLeadeditMutation,useDeleteuserMutation } = api;

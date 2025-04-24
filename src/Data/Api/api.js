import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./const";
import PaymentProof from "../../Screens/Paymentproofscreen";

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
    Leadadd: builder.mutation({
      query: (payload) => ({
        url: URL.ADDLEEDS,
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
      query: ({ payload, id }) => ({
        url: `${URL.EDITROLES}/${id}`,
        method: "PUT",
        body: payload
      })
    }),
    deleteroles: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETEROLES}/${id}`,
        method: "DELETE",
      })
    }),


    viewStaff: builder.query({
      query: () => ({
        url: URL.VIEWSTAFF,
        method: "GET",
      }),
    }),

    StaffEdit: builder.query({
      query: (id, payload) => ({
        url: `${URL.STAFFEDIT}/${id}`,
        method: "PUT",
        body: payload
      })
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
    sourceedit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.SOURCEEDIT}/${id}`,
        method: "PUT",
        body: payload

      })
    }),
    sourcedelete: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETESOURCE}/${id}`,
        method: "DELETE",

      })
    }),

    courseadd: builder.mutation({
      query: (payload) => ({
        url: URL.COURSEADD,
        method: "POST",
        body: payload,

      })
    }),
    getUser: builder.query({
      query: () => ({
        url: URL.VIEWLEED,
        method: "GET",
      }),
    }),

    paymentsdetail: builder.mutation({
      query: (payload) => ({
        url: URL.PAYMENTDETAILS,
        method: "POST",
        body: payload
      })
    }),
    Modeofamount: builder.query({
      query: () => ({
        url: URL.MODEOFAMOUNT,
        method: "GET",
      })
    }),
    PaymentProof: builder.query({
      query: () => ({
        url: URL.PAYMENTPROOF,
        method: "GET",
      })
    }),


  }),
});

export const { useLoginMutation, useRolesMutation, useLazyViewrolesQuery, useEditrolesMutation, useAddStaffMutation, useLazyViewStaffQuery, useSourceaddMutation, useCourseaddMutation, useLazySourcegetQuery, useLazyGetUserQuery, useLeadaddMutation, useSourceeditMutation, useDeleterolesMutation, useSourcedeleteMutation, usePaymentsdetailMutation, useLazyPaymentProofQuery, useLazyModeofamountQuery } = api;



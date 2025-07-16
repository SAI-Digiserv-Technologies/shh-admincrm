import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, URL } from "./const";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: "include",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      let token = localStorage.getItem("token");

      if (token) {
        const newToc = token.replace(/^"(.*)"$/, "$1");
        // console.log("user_detailskss", token, endpoint, newToc);

        headers.set("Authorization", `Bearer ${newToc}`);
      }

      if (endpoint !== "editStaff" && endpoint !== "profileUpdate" &&
        endpoint !== "payment_proofEdit" && endpoint !== "bulkleaduplload")  
        {
        headers.set("Content-Type", "application/json");
      }
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


    bulkleaduplload: builder.mutation({
      query: (payload) => ({
        url: URL.BULK_LEAD_ADD,
        method: "POST",
        body: payload,
      }),
    }),

    Login: builder.mutation({
      query: (payload) => ({
        url: URL.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    roles: builder.mutation({
      query: (payload) => ({
        url: URL.ROLE,
        method: "POST",
        body: payload,
      }),
    }),
    viewroles: builder.query({
      query: () => ({
        url: URL.VIEWROLES,
        method: "GET",
      }),
    }),

    allpayment_list: builder.query({
      query: () => ({
        url: URL.PAYMENT_LIST,
        method: "GET",
      }),
    }),

    notification_list: builder.query({
      query: () => ({
        url: URL.NOTIFICATION,
        method: "GET",
      }),
    }),

    Editroles: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.EDITROLES}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    deleteroles: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETEROLES}/${id}`,
        method: "DELETE",
      }),
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
        body: payload,
      }),
    }),

    sourceadd: builder.mutation({
      query: (payload) => ({
        url: URL.SOURCEPOST,
        method: "POST",
        body: payload,
      }),
    }),
    sourceget: builder.query({
      query: () => ({
        url: URL.SOURCEGET,
        method: "GET",
      }),
    }),
    sourceedit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.SOURCEEDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    sourcedelete: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETESOURCE}/${id}`,
        method: "DELETE",
      }),
    }),

    courseadd: builder.mutation({
      query: (payload) => ({
        url: URL.COURSEADD,
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

    getUserview: builder.query({
      query: (id) => ({
        url: `${URL.VIEWLEEDView}/${id}`,
        method: "GET",
      }),
    }),

    payment_detaile: builder.query({
      query: (id) => ({
        url: `${URL.HISTORY_DETAIL}/${id}`,
        method: "GET",
      }),
    }),

    paymentproofview: builder.query({
      query: (id) => ({
        url: `${URL.PROOFVIE}/${id}/paymentproof`,
        method: "GET",
      }),
    }),

    profileView: builder.query({
      query: (id) => ({
        url: `${URL.PROFILE_VIEW}${id}`,
        method: "GET",
      }),
    }),

    paymentsdetail: builder.mutation({
      query: (payload) => ({
        url: URL.PAYMENTDETAILS,
        method: "POST",
        body: payload,
      }),
    }),

    paymentadd: builder.mutation({
      query: (payload) => ({
        url: URL.PAYMENT_ADD,
        method: "POST",
        body: payload,
      }),
    }),

    Modeofamount: builder.query({
      query: () => ({
        url: URL.MODEOFAMOUNT,
        method: "GET",
      }),
    }),

    amountedit: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.MODEOFAMOUNTEDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    particularviewStaff: builder.query({
      query: (id) => ({
        url: `${URL.PARTICULARVIEWSTAFF}/${id}`,
        method: "GET",
      }),
    }),

    editStaff: builder.mutation({
      query: ({ formdata, id }) => ({
        url: `${URL.EDITSTAFF}${id}`,
        method: "PUT",
        body: formdata,
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

    transactionpost: builder.mutation({
      query: (payload) => ({
        url: URL.MODEOFAMOUNTPOST,
        method: "POST",
        body: payload,
      }),
    }),

    //  course api
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

    paymentmethodlist: builder.query({
      query: () => ({
        url: URL.MODEOFAMOUNT,
        method: "GET",
      }),
    }),

    courseUser: builder.mutation({
      query: ({ payload, id }) => ({
        url: `${URL.EDITCOURSE}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    PaymentProof: builder.query({
      query: () => ({
        url: URL.PAYMENTPROOF,
        method: "GET",
      }),
    }),

    PaymentDelete: builder.mutation({
      query: (id) => ({
        url: `${URL.MODEOFAMOUNTDELETE}/${id}`,
        method: "DELETE",
      }),
    }),

    // editStaff: builder.mutation({
    //   query: (id, payload) => ({
    //     url: `${URL.EDITSTAFF}${id}`,
    //     method: "PUT",
    //     body: payload,
    //   }),
    // }),

    viewStaff: builder.query({
      query: () => ({
        url: URL.VIEWSTAFF,
        method: "GET",
      }),
    }),

    particularviewStaff: builder.query({
      query: (id) => ({
        url: `${URL.PARTICULARVIEWSTAFF}${id}`,
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

    paymentmethodedit: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${URL.MODEOFAMOUNTEDIT}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),

    profileUpdate: builder.mutation({
      query: ({ formdata, id }) => ({
        url: `${URL.PROFILE_UPDATE}/${id}`,
        method: "PUT",
        body: formdata,
      }),
    }),

    deleteuser: builder.mutation({
      query: (id) => ({
        url: `${URL.DELETECOURSE}/${id}`,
        method: "DELETE",
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: URL.LOGOUT,
        method: "POST",
      }),
    }),



    // Lead view
    lead_view: builder.query({
      query: (id) => ({
        url: `${URL.LEAD_LIST}/${id}`,
        method: "GET",
      }),
    }),

    getStaffAttendanceById: builder.query({
      query: (id) => ({
        url: `${URL.Attendance_Report}/${id}`,
        method: "GET",
      })
    }),


    tele_lead_list: builder.query({
      query: (id) => ({
        url: `${URL.TELE_LEAD_LIST}/${id}`,
        method: "GET",
      }),
    }),

    // Source list
    source_list: builder.query({
      query: () => ({
        url: URL.SOURCEGET,
        method: "GET",
      }),
    }),

    course_list: builder.query({
      query: () => ({
        url: URL.VIEWCOURSE,
        method: "GET",
      }),
    }),

    all_proof_list: builder.query({
      query: () => ({
        url: URL.ALL_PROOF,
        method: "GET",
      }),
    }),

    paylentslist: builder.query({
      query: () => ({
        url: URL.GET_PAYMENT_LIST,
        method: "GET",
      }),
    }),

    // OTP Send
    send_otp: builder.mutation({
      query: (payload) => ({
        url: URL.SEND_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    // Verify Send
    verify_otp: builder.mutation({
      query: (payload) => ({
        url: URL.VERIFY_OTP,
        method: "POST",
        body: payload,
      }),
    }),

    // ResetPassword Send
    reset_password: builder.mutation({
      query: ({ payload, email }) => ({
        url: `${URL.RESET_PASSWORD}/${email}`,
        method: "POST",
        body: payload,
      }),
    }),

    payment_history: builder.query({
      query: (id) => ({
        url: `${URL.PAYMENT_HISSTORY}/${id}`,
        method: "GET",
      }),
    }),

    messageRead: builder.mutation({
      query: (id) => ({
        url: `${URL.READ_MSG}/${id}`,
        method: "POST",
      }),
    }),
  }),
});

// ✅ Hooks Exportcvhjj
export const {
  useLazyLead_viewQuery,
  useAddStaffMutation,
  useLazyCourse_listQuery,
  useLazySource_listQuery,
  useLazyViewStaffQuery,
  useLazyAll_proof_listQuery,
  useLazyParticularviewStaffQuery,
  useEditStaffMutation,
  useLeadaddMutation,
  useLeadeditMutation,
  useCourseaddMutation,
  useLazyViewUserQuery,
  useCourseUserMutation,
  useDeleteuserMutation,
  useLazyProfileViewQuery,
  useLoginMutation,
  useRolesMutation,
  useLazyViewrolesQuery,
  useEditrolesMutation,
  useSourceaddMutation,
  useLazySourcegetQuery,
  useLazyGetUserQuery,
  useSourceeditMutation,
  useDeleterolesMutation,
  useSourcedeleteMutation,
  usePaymentsdetailMutation,
  useLazyPaymentProofQuery,
  useLazyModeofamountQuery,
  useTransactionpostMutation,
  useAmounteditMutation,
  usePaymentDeleteMutation,
  useLogoutMutation,
  useLazyGetUserviewQuery,
  useProfileUpdateMutation,
  useSend_otpMutation,
  useVerify_otpMutation,
  useReset_passwordMutation,
  useLazyTele_lead_listQuery,
  useLazyPaymentproofviewQuery,
  useLazyPaylentslistQuery,
  usePaymentaddMutation,
  useLazyPaymentmethodlistQuery,
  usePaymentmethodeditMutation,
  useLazyAllpayment_listQuery,
  useLazyPayment_historyQuery,
  useLazyPayment_detaileQuery,
  useLazyNotification_listQuery,
  useMessageReadMutation,
  useBulkleaduplloadMutation,
  useLazyGetStaffAttendanceByIdQuery
} = api;

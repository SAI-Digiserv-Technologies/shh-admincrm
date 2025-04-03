import {
  calendar_icon,
  dash_blue,
  dash_white,
  follow_blue,
  follow_white,
  leads_blue,
  leads_white,
  notification_blue,
  notification_white,
  payment_blue,
  payment_white,
  perfomance_blue,
  perfomance_white,
  time_icon,
} from "../assets/images";

export const loginForm = [
  {
    id: 1,
    formFeald: "firstName",
    type: "text",
    lable: "First Name",
    placeholder: "First Name",
  },
  {
    id: 2,
    formFeald: "lastName",
    type: "text",
    lable: "Last Name",
    placeholder: "Last Name",
  },
  {
    id: 3,
    formFeald: "email",
    type: "text",
    lable: "E-mail Address",
    placeholder: "Email",
  },
  {
    id: 4,
    formFeald: "phoneNumber",
    type: "text",
    lable: "Phone Number",
    placeholder: "Phone Number",
  },
  {
    id: 5,
    formFeald: "password",
    type: "password",
    lable: "Password",
    placeholder: "Password",
  },
  {
    id: 6,
    formFeald: "confirmPassword",
    type: "password",
    lable: "Confirm Password",
    placeholder: "confirm Password",
  },
];

export const SideNavList = [
  {
    id: 1,
    name: "Dashboard",
    navi: "/telecallers/dashboard",
    active_icon: dash_blue,
    inactive_icon: dash_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 2,
    name: "Follow-ups",
    navi: "/telecallers/followup",
    active_icon: follow_blue,
    inactive_icon: follow_white,
    sub: [
      {
        list: "/telecallers/followup/details",
      },
    ],
  },
  {
    id: 3,
    name: "Close Follow ups",
    navi: "/telecallers/close_followup",
    active_icon: follow_blue,
    inactive_icon: follow_white,
    sub: [
      {
        list: "/telecallers/close_followup/details",
      },
    ],
  },
  {
    id: 4,
    name: "Leads",
    navi: "/telecallers/leeds",
    active_icon: leads_blue,
    inactive_icon: leads_white,
    sub: [
      {
        list: "/telecallers/leeds/details",
      },
    ],
  },
  {
    id: 5,
    name: "Payment Updates",
    navi: "/telecallers/payment-updates",
    active_icon: payment_blue,
    inactive_icon: payment_white,
    sub: [
      {
        list: "/telecallers/payment-updates/payment-list",
      },
    ],
  },
  {
    id: 6,
    name: "Performance Report",
    navi: "/telecallers/perfomance-report",
    active_icon: perfomance_blue,
    inactive_icon: perfomance_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 7,
    name: "Notifications ",
    navi: "/telecallers/notification",
    active_icon: notification_blue,
    inactive_icon: notification_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
];

export const leadsList = [
  {
    id: 1,
    name: "John Doe",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollement",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Not interested",
  },
  {
    id: 3,
    name: "Mark Johnson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Not responsing",
  },
  {
    id: 4,
    name: "Emily Davis",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Not reachable",
  },
  {
    id: 5,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Switched Off",
  },
  {
    id: 6,
    name: "Michael Brown",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Close Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Discontinue",
  },
];

export const followupleadsList = [
  {
    id: 1,
    name: "John Doe",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 2,
    name: "Jane Smith",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 3,
    name: "Mark Johnson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 4,
    name: "Emily Davis",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 5,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 6,
    name: "Michael Brown",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
  {
    id: 7,
    name: "Sarah Wilson",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Follow Ups",
  },
];

export const leadstatus = [
  {
    id: 1,
    name: "Enrollement",
  },
  {
    id: 2,
    name: "Not interested",
  },
  {
    id: 3,
    name: "Not responsing",
  },
  {
    id: 4,
    name: "Not reachable",
  },
  {
    id: 5,
    name: "Switched Off",
  },
  {
    id: 6,
    name: "Follow Ups",
  },
  {
    id: 7,
    name: "Close Follow Ups",
  },
  {
    id: 8,
    name: "Discontinue",
  },
  {
    id: 9,
    name: "Interested",
  },
];

export const PaymentUpdatesListStatus = [
  {
    id: 1,
    name: "Fully Paid",
  },
  {
    id: 2,
    name: "Partially Paid",
  },
];

export const PaymentUpdateList = [
  { id: 1, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Partially paid" },
  { id: 2, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Fully paid" },
  { id: 3, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Partially paid" },
  
  
    { id: 4, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Fully paid" },
    { id: 5, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Partially paid" },
    { id: 6, name: "John Doe", course: "React Basics", amount: "25000",PaidAmount:"10000",BalanceAmount:"15000",Status:"Fully paid" },
    
  
 
];

export const paymentList = [
  {
    id: 1,
    name: "John Doe",
    paymentNumber: "SGCPIN0001",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"Bank"
  },
  {
    id: 2,
    name: "John Doe",
    paymentNumber: "SGCPIN0002",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"UPI"
  },
  {
    id: 3,
    name: "John Doe",
    paymentNumber: "SGCPIN0003",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"Net Banking"
  },
  {
    id: 4,
    name: "John Doe",
    paymentNumber: "SGCPIN0004",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"Caritd Card"
  },
  {
    id: 5,
    name: "John Doe",
    paymentNumber: "SGCPIN0005",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"UPI"
  },
  {
    id: 6,
    name: "John Doe",
    paymentNumber: "SGCPIN0006",
    date: "22/05/2025",
    amount: "10,000",
    ModeOfPayment:"UPI"
  },
];

export const leadaddform = [
  {
    id: 1,
    formFeald: "name",
    type: "text",
    lable: "Student Name",
    placeholder: "Name",
  },
  {
    id: 2,
    formFeald: "email",
    type: "text",
    lable: "E-mail Address",
    placeholder: "E-mail Address",
  },
  {
    id: 3,
    formFeald: "phoneno",
    type: "text",
    lable: "Phone Number",
    placeholder: "Phone Number",
  },
  {
    id: 4,
    formFeald: "source",
    type: "dropdown",
    lable: "Source",
    placeholder: "Source",
    list: [
      // {
      //   id: 1,
      //   name: "Select Source",
      //   dissable: true,
      // },
      {
        id: 1,
        name: "Website",
      },
      {
        id: 2,
        name: "Instagram",
      },
      {
        id: 3,
        name: "Facebook",
      },
      {
        id: 4,
        name: "LinkedIn",
      },
      {
        id: 5,
        name: "YouTube",
      },
      {
        id: 6,
        name: "Reference",
      },
      {
        id: 7,
        name: "Advertisement",
      },
    ],
  },
];

export const courselist = [
  {
    id: 1,
    name: "Digital marketing",
    amount: "25000",
  },
];

export const leadsListss = [
  {
    id: 1,
    name: "Sankari",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollement",
  },
  {
    id: 2,
    name: "Pramila",
    course: {
      course: "Digital marketing",
      amount: "25000",
    },
    status: "Enrollement",
  },
];

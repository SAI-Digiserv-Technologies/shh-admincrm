import {
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
    navi: "/admindashboard",
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
    name: "Leads",
    navi: "/telecallers/followup",
    active_icon: follow_blue,
    inactive_icon: follow_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 3,
    name: "Follow-ups",
    navi: "/telecallers/leeds",
    active_icon: leads_blue,
    inactive_icon: leads_white,
    sub: [
      {
        list: "/telecallers/leeds/add",
      },
    ],
  },
  {
    id: 4,
    name: "Close Follow-ups",
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
    id: 5,
    name: "Staffs",
    navi: "/staff",
    active_icon: perfomance_blue,
    inactive_icon: perfomance_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 6,
    name: "Finance ",
    navi: "/telecallers/notification",
    active_icon: notification_blue,
    inactive_icon: notification_white,
    sub: [
      // {
      //   name:"Invoice",
      //   list: "/",
      // },
    ],
  },
  {
    id: 7,
    name: "Reports ",
    navi: "/telecallers/notification",
    active_icon: notification_blue,
    inactive_icon: notification_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 8,
    name: "Setup ",
    navi: "/source",
    active_icon: notification_blue,
    inactive_icon: notification_white,
    sub: [
      // {
      //   name:''
      //   list: "/",
      // },
    ],
  },
  {
    id: 9,
    name: "Remainder ",
    navi: "/telecallers/notification",
    active_icon: notification_blue,
    inactive_icon: notification_white,
    sub: [
      // {
      //   list: "/",
      // },
    ],
  },
  {
    id: 10,
    name: "Enquiries ",
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
    id: "001",
    name: "John Doe",
    course: "React Basics",
    status: "Enrollement",
  },
  {
    id: "002",
    name: "Jane Smith",
    course: "Node.js",
    status: "Not interested",
  },
  {
    id: "003",
    name: "Mark Johnson",
    course: "Python",
    status: "Not responsing",
  },
  {
    id: "004",
    name: "Emily Davis",
    course: "JavaScript",
    status: "Not reachable",
  },
  { id: "005", name: "Sankari", course: "JavaScript", status: "Switched Off" },
  { id: "006", name: "Michael Brown", course: "Django", status: "Follow Ups" },
  { id: "007", name: "Sarah Wilson", course: "Vue.js", status: "Discontinue" },
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
  { id: "001", name: "John Doe", course: "React Basics", status: "Fully Paid" },
  {
    id: "002",
    name: "Jane Smith",
    course: "Node.js",
    status: "Partially Paid",
  },
  { id: "003", name: "Mark Johnson", course: "Python", status: "Fully Paid" },
  {
    id: "004",
    name: "Emily Davis",
    course: "JavaScript",
    status: "Partially Paid",
  },
  { id: "005", name: "Sankari", course: "JavaScript", status: "Fully Paid" },
  {
    id: "006",
    name: "Michael Brown",
    course: "Django",
    status: "Partially Paid",
  },
  {
    id: "007",
    name: "Sarah Wilson",
    course: "Vue.js",
    status: "Partially Paid",
  },
];

export const paymentList = [
  {
    id: "001",
    name: "John Doe",
    ModeOfPayment: "Credit Card",
    AmountReceived: "10,000",
    date: "22/05/2025",
  },
  {
    id: "002",
    name: "John Doe",
    ModeOfPayment: "Cash",
    AmountReceived: "15,000",
    date: "22/05/2025",
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
    formFeald: "number",
    type: "text",
    lable: "Phone Number",
    placeholder: "Phone Number",
  },
  {
    id: 4,
    formFeald: "status",
    type: "text",
    lable: "Status",
    placeholder: "Status",
  },
  {
    id: 4,
    formFeald: "source",
    type: "text",
    lable: "Source",
    placeholder: "Source",
  },
];
export const usersList = [
  {
    id: 1,
    name: "Sujatha",
    email: "sujatha@gmail.com",
    phone: "+1 123-456-7890",
    role: "Telecaller",
    status: true,
  },
  {
    id: 2,
    name: "Keerthana",
    email: "Keerthana@gmail.com",
    phone: "+1 987-654-3210",
    role: "Tele-Counsoller",
    status: false,
  },
  {
    id: 3,
    name: "Sankari",
    email: "sankari@gmail.com",
    phone: "+1 555-123-4567",
    role: "Telecaller",
    status: true,
  },
  {
    id: 4,
    name: "Vijay",
    email: "vijay@gmail.com",
    phone: "+1 444-789-1234",
    role: "Telecaller",
    status: false,
  },
];
export const staffstatus = [
  {
    id: 1,
    name: "TeleCaller",
  },
  {
    id: 2,
    name: "Tele-Counsoler",
  },
  
];

export const sourcelist = [
  
  { id: "001", sourcename: "Facebook"},
  { id: "002", sourcename: "Youtube"},
  { id: "003", sourcename: "Website"},
  { id: "003", sourcename: "Instagram"},
];
export const staffrolelist = [
  
  { id: "001", rolename: "Tele-counselor"},
  { id: "002", rolename: "Telecaller"},
 
 
];

export const courselist = [
  
  { id: "001", coursename: "Digital Marketing", amount:"25,000", duration:'3 months'},
  { id: "002", coursename: "Fullstact", amount:"25,000", duration:'3 months'},
 
 
];


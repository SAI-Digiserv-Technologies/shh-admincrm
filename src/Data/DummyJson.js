import {
  calendar_icon,
  closefollowup_blue,
  closefollowup_white,
  closewup_blue,
  closewup_white,
  dash_blue,
  dash_white,
  enquiries_blue,
  enquiries_white,
  follow_blue,
  follow_white,
  followup_blue,
  followup_white,
  leads_blue,
  leads_white,
  notification_blue,
  notification_white,
  payment_blue,
  payment_white,
  perfomance_blue,
  perfomance_white,
  setup_blue,
  setup_white,
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
    navi: "/admindashboard",
    active_icon: dash_blue,
    inactive_icon: dash_white,
  },
  {
    id: 2,
    name: "Leads",
    navi: "/leadmanage",
    active_icon: leads_blue,
    inactive_icon: leads_white,
  },
  {
    id: 3,
    name: "Follow-ups",
    navi: "/followup",
    active_icon: followup_blue,
    inactive_icon: followup_white
  },
  {
    id: 4,
    name: "Close Follow-ups",
    navi: "/closefollowup",
    active_icon: closefollowup_blue,
    inactive_icon: closefollowup_white
  },
  {
    id: 5,
    name: "Staffs",
    navi: "/staff",
    active_icon: follow_blue,
    inactive_icon: follow_white,
  },
  {
    id: 6,
    name: "Finance",
    navi: "/",
    active_icon: payment_blue,
    inactive_icon: payment_white,
    sub: [
      { name: "Payment", list: "/payment" },
      { name: "Invoice", list: "/invoice" },
      { name: "Payment Proof", list: "/paymentproof" }
    ]
  },
  {
    id: 7,
    name: "Reports",
    navi: "/",
    active_icon: perfomance_blue,
    inactive_icon: perfomance_white,
    sub: [
      { name: "All Leads", list: "/report" }
    ]
  },
  {
    id: 8,
    name: "Setup",
    navi: "/",
    active_icon: setup_blue,
    inactive_icon: setup_white,
    sub: [
      { name: "Lead", list: "/" },
      { name: "Staff", list: "/staff" },
      { name: "Role", list: "/role" }
    ]
  },
  {
    id: 9,
    name: "Reminder",
    navi: "/reminder",
    active_icon: notification_blue,
    inactive_icon: notification_white,
  },
  {
    id: 10,
    name: "Enquiries",
    navi: "/enquiries",
    active_icon: enquiries_blue,
    inactive_icon: enquiries_white,
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
 
  { id: "005", name: "Sankari", course: "JavaScript", status: "Switched Off" },
  { id: "006", name: "Michael Brown", course: "Django", status: "Follow Ups" },
  { id: "007", name: "Sarah Wilson", course: "Vue.js", status: "Discontinue" },
];

export const enquiryleadList = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dob: "1998-03-15",
    walkin: "2025-04-10",
    passingYear: "2019",
    contact: "9876543210",
    source: "Instagram",
    course: "Digital Marketing",
    status: "Enquiry",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    dob: "1999-07-22",
    walkin: "2025-04-11",
    passingYear: "2020",
    contact: "9876501234",
    source: "Facebook",
    course: "UI/UX Design",
    status: "Enquiry",
  },
  {
    id: 3,
    name: "Raj Patel",
    email: "raj@example.com",
    dob: "1997-12-05",
    walkin: "2025-04-12",
    passingYear: "2018",
    contact: "9876547890",
    source: "Referral",
    course: "Full Stack Development",
    status: "Enquiry",
  },
  {
    id: 4,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    dob: "2000-01-10",
    walkin: "2025-04-13",
    passingYear: "2021",
    contact: "9876512345",
    source: "Google Ads",
    course: "Python Programming",
    status: "Enquiry",
  },
  {
    id: 5,
    name: "Manoj Verma",
    email: "manoj@example.com",
    dob: "1996-04-17",
    walkin: "2025-04-14",
    passingYear: "2017",
    contact: "9876523456",
    source: "Instagram",
    course: "Data Science",
    status: "Enquiry",
  },
  {
    id: 6,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    dob: "1995-06-30",
    walkin: "2025-04-15",
    passingYear: "2016",
    contact: "9876534567",
    source: "WhatsApp",
    course: "Graphic Design",
    status: "Enquiry",
  },
  {
    id: 7,
    name: "Karan Mehta",
    email: "karan@example.com",
    dob: "1998-09-21",
    walkin: "2025-04-16",
    passingYear: "2019",
    contact: "9876545678",
    source: "Website",
    course: "Cybersecurity",
    status: "Enquiry",
  },
  {
    id: 8,
    name: "Divya Iyer",
    email: "divya@example.com",
    dob: "1997-11-19",
    walkin: "2025-04-17",
    passingYear: "2018",
    contact: "9876556789",
    source: "LinkedIn",
    course: "Cloud Computing",
    status: "Enquiry",
  },
  {
    id: 9,
    name: "Naveen Kumar",
    email: "naveen@example.com",
    dob: "1996-02-27",
    walkin: "2025-04-18",
    passingYear: "2017",
    contact: "9876567890",
    source: "YouTube",
    course: "Web Development",
    status: "Enquiry",
  },
  {
    id: 10,
    name: "Anjali Desai",
    email: "anjali@example.com",
    dob: "1999-05-14",
    walkin: "2025-04-19",
    passingYear: "2020",
    contact: "9876578901",
    source: "Flyer",
    course: "Business Analytics",
    status: "Enquiry",
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
  {
    id: 10,
    name: "Enquiry",
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
  { id: "001", coursename: "Digital Marketing", amount:"25,000", duration:'3 months'},
  { id: "002", coursename: "Fullstact", amount:"25,000", duration:'3 months'},
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
  {
    id: 5,
    name: "Payment Proof",
    navi: "/telecallers/payment-proof",
    active_icon: payment_blue,
    inactive_icon: payment_white,
    sub: [
      {
        list: "/telecallers/payment-proof/add",
      },
      {
        list: "/telecallers/payment-proof/view",
      },
    ],
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



 



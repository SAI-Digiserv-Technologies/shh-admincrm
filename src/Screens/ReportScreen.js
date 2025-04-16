import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calendericon, leadicon, sandclock, speakericon } from "../assets/images";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";


// ✅ Custom Card and CardContent
const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl shadow-md bg-white ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// 📊 Chart Data
const data = [
  { month: "Jan", leads: 80, enrolled: 65 },
  { month: "Feb", leads: 45, enrolled: 0 },
  { month: "Mar", leads: 10, enrolled: 0 },
  { month: "Apr", leads: 25, enrolled: 0 },
  { month: "May", leads: 70, enrolled: 0 },
  { month: "Jun", leads: 35, enrolled: 0 },
  { month: "Jul", leads: 50, enrolled: 0 },
  { month: "Aug", leads: 40, enrolled: 0 },
  { month: "Sep", leads: 85, enrolled: 0 },
  { month: "Oct", leads: 60, enrolled: 0 },
  { month: "Nov", leads: 0, enrolled: 0 },
  { month: "Dec", leads: 70, enrolled: 0 },
];

// 📈 Progress Bar Data
const monthlyProgress = [
  { month: "JAN", percent: 50, color: "bg-orange-500" },
  { month: "FEB", percent: 80, color: "bg-cyan-400" },
  { month: "MAR", percent: 65, color: "bg-blue-600" },
  { month: "APR", percent: 30, color: "bg-pink-500" },
];

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap gap-4 items-center">
       
        <select className="border px-3 py-2 rounded-md bg-[#00225d] shadow text-white">
          <option>Select User</option>
          <option>Keerthana</option>
          <option>Ramya</option>
          <option>Soojatha</option>
          <option>Sankari</option>
        </select>
        <input type="date" className="border px-3 py-2 rounded-md bg-[#00225d] shadow text-white" />
        <input type="date" className="border px-3 py-2 rounded-md bg-[#00225d] shadow text-white" />
      </div>

      {/* Stats Cards */}
       <div className="topbox-const  gap-3">
      
     
           <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
            
            <div>
              <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                Total
              </p>
              <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                Leads
              </p>
              <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
                35
              </p>
            </div>
            <div className="imgcont d-flex ac-jc">
              <img src={speakericon} />
            </div>
            <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
              <EastOutlinedIcon className="primary3" />
            </button>
          </div>
             <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
            
               <div>
                 <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                 Enrolled
                 </p>
                 <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                   Leads
                 </p>
                 <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
                   35
                 </p>
               </div>
               <div className="imgcont d-flex ac-jc">
                 <img src={sandclock} />
               </div>
               <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
                 <EastOutlinedIcon className="primary3" />
               </button>
             </div>
             <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
               <div>
                 <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                 Follow-up
                 </p>
                 <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                   Leads
                 </p>
                 <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
                   750
                 </p>
               </div>
               <div className="imgcont d-flex ac-jc">
                 <img src={leadicon} />
               </div>
               <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
                 <EastOutlinedIcon className="primary3" />
               </button>
             </div>
             <div className="bash-box rounded-3 p-md-3 p-2 bg-primary3 d-flex gap-4">
               <div>
                 <p className=" mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                 Total-
                 </p>
                 <p className="mb-0 f5 fs-xxl-22 fs-xl-22 fs-lg-20 fs-sm-18 fs-xs-18 textani white">
                 walk in
                 </p>
                 <p className="mt-md-4 mt-2 mb-0 f7 fs-xxl-29 fs-xl-29 fs-lg-28 fs-sm-25 fs-xs-22 textani white">
                   1230
                 </p>
               </div>
               <div className="imgcont d-flex ac-jc">
                 <img src={calendericon} />
               </div>
               <button className="iconabsolute border-0 d-flex ac-jc rounded-5">
                 <EastOutlinedIcon className="primary3" />
               </button>
             </div>
           </div>
          

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-100 p-4 rounded-xl">
        {/* Bar Chart */}
        <Card className="p-4">
          <div className="text-center font-semibold mb-4">Lead & Enrollment Overview</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="leads" fill="#a5f3fc" />
              <Bar dataKey="enrolled" fill="#fbcfe8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Monthly Report */}
        <Card className="p-4">
          <div className="text-center font-semibold mb-4">Monthly Report</div>
          <div className="flex justify-around items-end h-64">
            {monthlyProgress.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-sm font-medium mb-1">{item.month}</div>
                <div className="w-12 h-48 border rounded-lg flex items-end bg-gray-200 overflow-hidden">
                  <div
                    className={`w-full ${item.color} rounded-b-lg`}
                    style={{ height: `${item.percent}%` }}
                  ></div>
                </div>
                <div className="text-sm mt-1 font-bold">{item.percent}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

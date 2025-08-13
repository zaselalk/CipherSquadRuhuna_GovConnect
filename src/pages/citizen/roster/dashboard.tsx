import { useState } from "react";
import { CalendarOutlined, ClockCircleOutlined, ScheduleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import DashboardHeader from "../../../components/features/roster/dashboardHeader";
import AvailableShiftsCard from "../../../components/features/roster/availableShiftsCard";
import ShiftApplyModal from "../../../components/features/roster/shiftApplyModal";
import LeaveForm from "../../../components/features/roster/leaveForm";
import DayOffSelector from "../../../components/features/roster/dayOffSelector";
import { Calendar } from "antd";

const Dashboard = () => {
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [selectedShift, setSelectedShift] = useState<any>(null);


  
  
  const offDays = [
    { date: "3", day: "Mon" },
    { date: "5", day: "Tue" },
    { date: "16", day: "Sat" },
    { date: "22", day: "Fri" },
  ];

  const shifts = [
    { id: "18", day: "Monday", type: "Day" },
    { id: "25", day: "Monday", type: "Night" },
    { id: "27", day: "Wednesday", type: "Day" },
  ];

  const leaveRequests = [
    { type: "Annual Leave", status: "Approved" },
    { type: "Casual Leave", status: "Pending" },
  ];

  const shiftRequests = [
    { shift: "Day Shift 25th", status: "Rejected" },
    { shift: "Night Shift 27th", status: "Approved" },
  ];

  // Calendar date renderer with colored dots
  const dateCellRender = (value: any) => {
  const date = value.date();
  const off = offDays.find(d => parseInt(d.date) === date);
  const dayShift = shifts.find(s => s.type === "Day" && parseInt(s.id) === date);
  const nightShift = shifts.find(s => s.type === "Night" && parseInt(s.id) === date);

  // Return empty content, we'll style via wrapper
    const className = off
    ? "bg-gray-300 text-gray-800 font-bold rounded-full w-full h-full flex items-center justify-center"
    : dayShift
    ? "bg-green-300 text-green-900 font-bold rounded-full w-full h-full flex items-center justify-center"
    : nightShift
    ? "bg-blue-300 text-blue-900 font-bold rounded-full w-full h-full flex items-center justify-center"
    : "";


  return <div
      className={className} >  
    </div>;
  
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <DashboardHeader />

      <main className="p-6 space-y-6">
        {/* Top Section: Left Cards + Right Calendar */}
        <div className="flex gap-6">
          {/* Left Section: Off Days + Leave */}
          <div className="flex-1 grid grid-rows-2 gap-4">
            {/* Top row: My Off Days + Select Off Days */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 h-36 flex flex-col justify-center">
                <h2 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <CalendarOutlined className="text-indigo-500 mr-2" />
                  My Off Days
                </h2>
                <div className="flex items-center gap-30">
                  {offDays.map((day) => (
                    <div key={day.date} className="text-center">
                      <div className="text-gray-700 font-bold text-xl">{day.date}</div>
                      <div className="text-gray-400 text-m">{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="bg-white rounded-xl shadow-lg p-4 h-36 flex flex-col items-start justify-center hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setActiveOverlay("dayOff")}
              >
                <PlusCircleOutlined className="text-green-500 text-3xl mb-2" />
                <h3 className="text-md font-semibold text-gray-800 mb-1">Select Off Days</h3>
                <p className="text-gray-500 text-sm">Pick your preferred off days from the calendar.</p>
              </div>
            </div>

            {/* Bottom row: Apply Annual Leave + Casual Leave */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setActiveOverlay("annualLeave")}
              >
                <ScheduleOutlined className="text-pink-500 text-3xl mb-2" />
                <h3 className="text-md font-semibold text-gray-800 mb-1">Apply Annual Leave</h3>
                <p className="text-gray-500 text-sm">Submit your annual leave request here.</p>
              </div>

              <div
                className="bg-white rounded-xl shadow-lg p-4 flex flex-col hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setActiveOverlay("casualLeave")}
              >
                <ClockCircleOutlined className="text-yellow-500 text-3xl mb-2" />
                <h3 className="text-md font-semibold text-gray-800 mb-1">Apply Casual Leave</h3>
                <p className="text-gray-500 text-sm">Submit your casual leave request here.</p>
              </div>
            </div>
          </div>

          {/* Right Section: Small Calendar */}
          <div className="w-72 h-85 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <CalendarOutlined className="text-purple-500 mr-2" />
              Schedule
            </h3>
            <Calendar
              dateCellRender={dateCellRender}
              fullscreen={false}
              headerRender={() => null} // hides month/year selector
            />

          </div>
        </div>

        {/* Upcoming Shifts + Request Status */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ClockCircleOutlined className="text-green-500 mr-2" />
              Upcoming Shifts
            </h2>
            <AvailableShiftsCard
              shifts={shifts}
              onApply={(shift: any) => setSelectedShift(shift)}
              onOverlayChange={setActiveOverlay}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Request Status</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Leave Requests</h3>
                <ul className="space-y-2">
                  {leaveRequests.map((req, idx) => (
                    <li
                      key={idx}
                      className={`p-2 rounded-md ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {req.type} - {req.status}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Shift Requests</h3>
                <ul className="space-y-2">
                  {shiftRequests.map((req, idx) => (
                    <li
                      key={idx}
                      className={`p-2 rounded-md ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {req.shift} - {req.status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedShift && (
        <ShiftApplyModal
          shift={selectedShift}
          onClose={() => setSelectedShift(null)}
          onConfirm={() => {
            console.log("Applied shift:", selectedShift);
            setSelectedShift(null);
          }}
        />
      )}

      {activeOverlay === "annualLeave" && (
        <LeaveForm title="Annual Leave" type="annual" onClose={() => setActiveOverlay(null)} onSubmit={(v: any) => console.log(v)} />
      )}

      {activeOverlay === "casualLeave" && (
        <LeaveForm title="Casual Leave" type="casual" onClose={() => setActiveOverlay(null)} onSubmit={(v: any) => console.log(v)} />
      )}

      {activeOverlay === "dayOff" && (
        <DayOffSelector onClose={() => setActiveOverlay(null)} onSubmit={(dates: any) => console.log("Selected day offs:", dates)} />
      )}
    </div>
  );
};

export default Dashboard;

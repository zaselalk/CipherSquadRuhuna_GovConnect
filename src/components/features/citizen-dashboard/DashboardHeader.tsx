import React from "react";
//import { Link } from "react-router";
import { Badge, Button, Popover } from "antd";
import { BellOutlined, PlusOutlined } from "@ant-design/icons";

interface DashboardHeaderProps {
  notificationsCount: number;
  notificationsContent: React.ReactNode;
  notifOpen: boolean;
  setNotifOpen: (open: boolean) => void;
  onBookNew: () => void;
  notifRef: React.RefObject<HTMLDivElement | null>;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  notificationsCount,
  notificationsContent,
  notifOpen,
  setNotifOpen,
  onBookNew,
  notifRef,
}) => {
  return (
    <header
      ref={notifRef}
      className="bg-white shadow-sm w-full"
      style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap">
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg select-none">
                G
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 select-none whitespace-nowrap">
                GovConnect
              </h1>
              <p className="text-sm text-gray-600 select-none">
                Manage your appointments and notifications
              </p>
            </div>
          </Link> */}
        </div>

        {/* Right: Notifications + Book Appointment */}
        <div className="flex items-center space-x-4 flex-shrink-0 min-w-[280px] justify-end">
          <Popover
            content={notificationsContent}
            title="Notifications"
            trigger="click"
            open={notifOpen}
            onOpenChange={setNotifOpen}
            placement="bottomRight"
          >
            <Badge
              count={notificationsCount}
              overflowCount={99}
              style={{
                backgroundColor: "#2563eb",
                boxShadow: "0 0 0 2px #2563eb",
                cursor: "pointer",
                width: 25,
                height: 25,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              <Button
                shape="circle"
                type="text"
                icon={
                  <BellOutlined style={{ color: "#2563eb", fontSize: 20 }} />
                }
                aria-label="Toggle notifications"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                style={{
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Badge>
          </Popover>

          {/* Book New Appointment Button */}
          <div className="ml-10">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={onBookNew}
              className="font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow"
              style={{
                padding: "8px 20px",
                minHeight: 40,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                minWidth: 180,
                flexShrink: 0,
              }}
            >
              Book New Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

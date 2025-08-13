import React, { useEffect, useState } from "react";
import { Button, Empty } from "antd";

interface Notification {
  id: number;
  message: string;
  timestamp: Date;
  read: boolean;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initial sample notifications
  useEffect(() => {
    const initialData: Notification[] = [
      {
        id: 1,
        message: "Your appointment on 2025-09-01 at 10:30 AM is confirmed.",
        timestamp: new Date(Date.now() - 3600 * 1000), // 1 hour ago
        read: false,
      },
      {
        id: 2,
        message: "Reminder: Your appointment is tomorrow at 10:30 AM.",
        timestamp: new Date(Date.now() - 60 * 60 * 24 * 1000), // 1 day ago
        read: false,
      },
      {
        id: 3,
        message:
          "Your appointment has been rescheduled to 2025-09-02 at 11:00 AM.",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000), // 2 hours ago
        read: true,
      },
    ];
    setNotifications(initialData);

    // Simulate new notification after 10 seconds
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "New update: Your appointment status changed to Approved.",
          timestamp: new Date(),
          read: false,
        },
        ...prev,
      ]);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString();
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto  p-6 min-h-screen">
      <h1 className="text-[#0052cc] text-center text-2xl font-bold mb-4">
        Your Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="mt-8">
          <Empty description="You have no notifications." />
        </div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
                n.read
                  ? "bg-gray-300 text-gray-600"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex-1 mr-4">
                {n.message}
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(n.timestamp)}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  type="link"
                  onClick={() => markAsRead(n.id)}
                  title="Mark as read"
                  aria-label="Mark as read"
                  className="p-0"
                >
                  ✓
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => deleteNotification(n.id)}
                  title="Delete notification"
                  aria-label="Delete notification"
                  className="p-0"
                >
                  ✕
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;

import React from "react";
import { List, Typography } from "antd";
import { BellOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Notification {
  id: string;
  message: string;
  type: "reminder" | "change" | "cancellation";
  date: string;
}

const notificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "reminder":
      return <BellOutlined className="text-green-600" />;
    case "change":
      return <ExclamationCircleOutlined className="text-orange-600" />;
    case "cancellation":
      return <ExclamationCircleOutlined className="text-red-600" />;
    default:
      return null;
  }
};

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <div className="max-h-80 overflow-y-auto w-80 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      {notifications.length === 0 ? (
        <Text type="secondary" className="block text-center py-6 text-gray-400">
          No notifications.
        </Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={({ id, message, date, type }) => (
            <List.Item
              key={id}
              className="hover:bg-gray-100 rounded-md transition cursor-pointer"
            >
              <List.Item.Meta
                avatar={notificationIcon(type)}
                title={<Text strong>{message}</Text>}
                description={<Text type="secondary" className="text-gray-500">Date: {date}</Text>}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default NotificationList;

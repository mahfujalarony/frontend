import React, { useState } from 'react';
import { Drawer, Badge, Button, Empty } from 'antd';
import {
  BellOutlined,
  ShoppingOutlined,
  GiftOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  HeartOutlined,
  StarOutlined,
} from '@ant-design/icons';

// Dummy Notifications
const dummyNotifications = [
  {
    id: 1,
    type: "order",
    icon: <TruckOutlined />,
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and on the way to your location",
    time: "2 minutes ago",
    read: false,
    color: "blue",
  },
  {
    id: 2,
    type: "offer",
    icon: <GiftOutlined />,
    title: "Special Offer Just For You!",
    message: "Get 20% off on your next purchase. Use code: SAVE20",
    time: "1 hour ago",
    read: false,
    color: "pink",
  },
  {
    id: 3,
    type: "delivery",
    icon: <CheckCircleOutlined />,
    title: "Delivered Successfully",
    message: "Order #12340 has been delivered to your address",
    time: "3 hours ago",
    read: true,
    color: "green",
  },
  {
    id: 4,
    type: "order",
    icon: <ShoppingOutlined />,
    title: "Order Confirmed",
    message: "Your order #12346 is confirmed and being processed",
    time: "5 hours ago",
    read: true,
    color: "orange",
  },
  {
    id: 5,
    type: "wishlist",
    icon: <HeartOutlined />,
    title: "Price Drop Alert",
    message: "Item in your wishlist 'Organic Eggs' is now 15% off!",
    time: "Yesterday",
    read: true,
    color: "red",
  },
  {
    id: 6,
    type: "offer",
    icon: <StarOutlined />,
    title: "New Deals Available",
    message: "Check out today's hot deals on fresh vegetables",
    time: "2 days ago",
    read: true,
    color: "purple",
  },
];

const NotificationSidebar = ({ notificationCount }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);

  // unread notification gula count korlam
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Show drawer
  const showDrawer = () => {
    setOpen(true);
  };

  // Close drawer
  const onClose = () => {
    setOpen(false);
  };

  // Mark as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Clear all
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div
        onClick={showDrawer}
        className="cursor-pointer relative hover:scale-110 transition-transform duration-200"
      >
        <Badge count={unreadCount} offset={[-5, 5]} size="small">
          <div className="bg-linier-to-br from-orange-100 to-yellow-100 p-2 rounded-full hover:from-orange-200 hover:to-yellow-200 transition-all duration-300">
            <BellOutlined className="text-xl text-orange-600" />
          </div>
        </Badge>
      </div>

      {/* Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    size="small"
                    type="link"
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600"
                  >
                    Mark all
                  </Button>
                )}
                <Button
                  size="small"
                  type="link"
                  onClick={clearAll}
                  className="text-xs text-red-600"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        size="large"
        className="notification-drawer"
      >
        {/* Notification List */}
        {notifications.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications"
            className="mt-20"
          />
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                {...notif}
                onRead={() => markAsRead(notif.id)}
                onDelete={() => deleteNotification(notif.id)}
              />
            ))}
          </div>
        )}
      </Drawer>
    </>
  );
};

// Notification Item Component
const NotificationItem = ({ id, icon, title, message, time, read, color, onRead, onDelete }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    pink: "bg-pink-100 text-pink-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div
      onClick={onRead}
      className={`
        p-4 rounded-lg cursor-pointer transition-all border-l-4 group relative
        ${read 
          ? "bg-white border-transparent hover:bg-gray-50" 
          : "bg-blue-50 border-blue-500 hover:bg-blue-100"
        }
      `}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center shrink-0
            ${colorClasses[color]}
          `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`text-sm font-semibold ${read ? "text-gray-700" : "text-gray-900"}`}>
              {title}
            </h4>
            {!read && (
              <span className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-1.5"></span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{message}</p>
          <p className="text-xs text-gray-400 mt-2">{time}</p>
        </div>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 bg-white rounded-full p-1 shadow-sm"
        >
          <CloseOutlined className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default NotificationSidebar;
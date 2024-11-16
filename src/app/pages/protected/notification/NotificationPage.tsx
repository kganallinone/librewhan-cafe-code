import React, { useState } from "react";
import "tailwindcss/tailwind.css";

interface Notification {
  id: number;
  message: string;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    message: "App update available. Please refresh to get the latest features.",
  },
  { id: 2, message: "New tutorial added to the Learning section!" },
  { id: 3, message: "Scheduled maintenance planned for tonight at 12 AM." },
];

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);

  const handleAcknowledge = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="h-screen px-4 bg-gray-100 flex flex-col">
      <header className="  p-4">
        <h1 className="text-2xl">App Notifications</h1>
      </header>

      <main className="flex-1 mt-4">
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white border border-gray-300 p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <p className="text-lg">{notification.message}</p>
                <button
                  onClick={() => handleAcknowledge(notification.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Acknowledge
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No notifications available.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotificationPage;

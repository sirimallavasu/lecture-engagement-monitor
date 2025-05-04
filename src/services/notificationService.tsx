
import { toast } from "sonner";
import { Bell, Frown } from "lucide-react";
import React from "react";

// Define notification types
export type NotificationType = "distraction" | "expression" | "alert";

// Interface for notifications
export interface Notification {
  id?: number;
  title: string;
  message: string;
  type: NotificationType;
  studentName?: string;
}

// Function to show a notification using the toast component
export function showNotification(notification: Notification) {
  const { title, message, type } = notification;
  
  // Configure toast based on notification type
  const config = {
    duration: 5000,
    icon: type === "distraction" ? <Bell className="h-5 w-5 text-engagement-distracted" /> : 
                                   <Frown className="h-5 w-5 text-engagement-negative" />,
    id: notification.id?.toString(),
    className: type === "distraction" ? "border-l-4 border-l-engagement-distracted" : 
             type === "expression" ? "border-l-4 border-l-engagement-negative" : 
             "border-l-4 border-l-primary"
  };

  toast(title, {
    description: message,
    ...config
  });
}

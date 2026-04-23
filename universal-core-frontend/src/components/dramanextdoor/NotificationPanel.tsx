"use client";

import { FC } from "react";

interface NotificationPanelProps {
  notifications: any[];
}

export const NotificationPanel: FC<NotificationPanelProps> = ({
  notifications,
}) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Emotional Notifications</h3>
      <div style={{ marginTop: "0.75rem" }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              marginBottom: "0.75rem",
              padding: "0.75rem",
              background: "#111",
              borderRadius: "8px",
            }}
          >
            <strong>{n.title}</strong>
            <div style={{ opacity: 0.8 }}>{n.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

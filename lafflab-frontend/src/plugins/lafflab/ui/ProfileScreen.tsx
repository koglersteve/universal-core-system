import React from "react";

export const ProfileScreen: React.FC<{
  username: string;
  onClose: () => void;
}> = ({ username, onClose }) => {
  return (
    <div style={{ padding: 16 }}>
      <h2>Profile: {username}</h2>

      <button onClick={onClose} style={{ marginTop: 16 }}>
        ⬅ Back
      </button>
    </div>
  );
};

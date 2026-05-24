"use client";

import React from "react";
import { FiSmile, FiHeart, FiMessageCircle, FiShare2 } from "react-icons/fi";

type ReactionBarProps = {
  likes?: number;
  laughs?: number;
  comments?: number;
  shares?: number;
};

const ReactionBar: React.FC<ReactionBarProps> = ({
  likes = 0,
  laughs = 0,
  comments = 0,
  shares = 0,
}) => {
  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 8,
        paddingTop: 6,
        borderTop: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div style={itemStyle}>
        <FiHeart size={16} />
        <span>{likes}</span>
      </div>
      <div style={itemStyle}>
        <FiSmile size={16} />
        <span>{laughs}</span>
      </div>
      <div style={itemStyle}>
        <FiMessageCircle size={16} />
        <span>{comments}</span>
      </div>
      <div style={itemStyle}>
        <FiShare2 size={16} />
        <span>{shares}</span>
      </div>
    </div>
  );
};

export default ReactionBar;

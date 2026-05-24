"use client";

import React from "react";
import Link from "next/link";
import { FiX, FiUser, FiStar, FiClock, FiSun, FiSettings, FiLogOut } from "react-icons/fi";

type MenuDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 60,
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: 280,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease-out",
          zIndex: 70,
          padding: 16,
          background: "rgba(20,20,20,0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>LAFFlab</span>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: 4,
            }}
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
          <MenuItem href="/profile/me" icon={<FiUser />} label="Profile" onClick={onClose} />
          <MenuItem href="/favorites" icon={<FiStar />} label="Favorites" onClick={onClose} />
          <MenuItem href="/history" icon={<FiClock />} label="History" onClick={onClose} />
          <MenuItem href="/ritual" icon={<FiSun />} label="Daily Ritual" onClick={onClose} />
          <MenuItem href="/settings" icon={<FiSettings />} label="Settings" onClick={onClose} />
        </nav>

        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              border: "none",
              color: "#ff9aa5",
              cursor: "pointer",
              padding: "8px 4px",
            }}
            onClick={() => {
              // hook logout later
              onClose();
            }}
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      color: "#FFFFFF",
      textDecoration: "none",
      padding: "8px 4px",
      borderRadius: 10,
      transition: "background 0.15s ease, transform 0.1s ease",
    }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </Link>
);

export default MenuDrawer;

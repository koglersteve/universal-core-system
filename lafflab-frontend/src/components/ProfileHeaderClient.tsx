"use client";

import { useState } from "react";

export default function Component({ user, editable }) {
  const [avatar, setAvatar] = useState(user?.avatarUrl || "/default-avatar.png");
  const [banner, setBanner] = useState(user?.bannerUrl || "/default-banner.jpg");

  function changeAvatar(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  }

  function changeBanner(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setBanner(url);
  }

  return (
    <div className="w-full bg-black rounded-b-xl overflow-hidden border-b border-white/10">
      <div className="relative w-full h-40 bg-white/5">
        <img
          src={banner}
          className="w-full h-full object-cover"
          alt=""
        />

        {editable && (
          <label className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 text-white text-xs rounded cursor-pointer hover:bg-black/80 transition">
            Change Banner
            <input type="file" className="hidden" onChange={changeBanner} />
          </label>
        )}
      </div>

      <div className="relative px-6 pb-6">
        <div className="relative -mt-12 w-24 h-24">
          <img
            src={avatar}
            className="w-24 h-24 rounded-full border-4 border-black object-cover"
            alt=""
          />

          {editable && (
            <label className="absolute bottom-0 right-0 bg-black/70 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-black/90 transition">
              Edit
              <input type="file" className="hidden" onChange={changeAvatar} />
            </label>
          )}
        </div>

        <div className="mt-4">
          <div className="text-xl font-semibold text-white">{user?.username}</div>
          <div className="text-gray-400 text-sm">@{user?.id}</div>
        </div>
      </div>
    </div>
  );
}

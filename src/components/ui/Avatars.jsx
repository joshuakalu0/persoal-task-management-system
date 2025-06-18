import { getColor } from "@/utiles/colorGenerator";
import React from "react";

export default function AvatarGroup({ users = [] }) {
  const maxVisible = 2;
  const visibleUsers = users.slice(0, maxVisible);
  const extraCount = users.length - maxVisible;

  return (
    <div className="flex items-center">
      {visibleUsers.map((user, idx) => (
        <div
          key={idx}
          className={`w-8 h-8 rounded-full flex justify-center items-center border-2 border-[#232428] ${getColor(
            user
          )} object-cover ${idx !== 0 ? "-ml-3" : ""}`}
          style={{ zIndex: 10 + idx }}
        >
          {user[0]}
        </div>
      ))}
      {extraCount > 0 && (
        <div
          className={`w-8 h-8 rounded-full bg-[#393A3E] flex items-center justify-center text-white text-base font-semibold -ml-3 border-2 border-[#232428]`}
          style={{ zIndex: 10 + visibleUsers.length }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}

import React from "react";

export default function ThreeDotsHorizontal() {
  return (
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-100" />
      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-30" />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  Grid3X3,
  Users,
  Calendar,
  Settings,
  BarChart3,
  Cloud,
  Map,
  User,
  LayoutGrid,
  CloudUpload,
  SlidersHorizontal,
  KanbanSquareIcon,
} from "lucide-react";
import clsx from "clsx";
import Logo from "../../icons/Logo";
import ThreeDotsHorizontal from "../../icons/ThreeDotsHorizontal";

export default function PrimarySideBar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const topNavItems = [
    { icon: ThreeDotsHorizontal, label: "Team", id: "team" },
    { icon: Logo, label: "Dashboard", id: "dashboard" },
  ];
  const mainNavItems = [
    { icon: LayoutGrid, label: "Dashboard", id: "dashboard" },
    { icon: User, label: "Team", id: "team" },
    { icon: Calendar, label: "Calendar", id: "calendar" },
    { icon: KanbanSquareIcon, label: "Map", id: "map" },
    { icon: CloudUpload, label: "Cloud", id: "cloud" },
    { icon: Map, label: "Analytics", id: "analytics" },
    { icon: SlidersHorizontal, label: "Settings", id: "settings" },
  ];
  return (
    <div className="w-16 bg-white dark:bg-[#1a1d23] border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8 space-y-4">
        <div className="w-10 h-8   flex items-center justify-center">
          <ThreeDotsHorizontal />
        </div>
        <div className="w-8 h-8  rounded-full  flex items-center justify-center">
          <Logo />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-full transition-colors group relative",
              activeItem === item.id
                ? " bg-white/10 text-white"
                : "text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
            )}
            title={item.label}
          >
            <item.icon size={20} />

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 dark:bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </div>
          </button>
        ))}
      </nav>

      {/* Projects Indicator */}
      <div className="mt-auto">
        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}

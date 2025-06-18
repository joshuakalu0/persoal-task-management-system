import Button from "@/components/ui/button";
import { AlertCircle, Bell, LayoutList, Plus } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="bg-secondary text-white px-6 pt-4 border-b border-gray-700">
      {/* Top row with welcome message and user info */}
      <div className="flex items-center justify-between mb-4">
        {/* Welcome message */}
        <div className="flex items-center">
          <h1 className="text-xl font-medium text-white">
            Welcome back, Vincent
            <span className="ml-2">👋</span>
          </h1>
        </div>

        {/* Right side with search, notifications, date, and avatar */}
        <div className="flex items-center space-x-4">
          {/* Search icon */}
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notification bell with badge */}
          <button className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Bell />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
              3
            </span>
          </button>

          {/* Calendar with date */}
          <div className="flex items-center space-x-2 text-gray-300">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">19 May 2022</span>
          </div>

          {/* User avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Vincent's avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom row with board view and controls */}
      <div className="flex items-center justify-between">
        {/* Left side with board view tabs */}
        <div className="flex items-center space-x-6">
          {/* Board view tab (active) */}
          <div className="flex items-center space-x-2 pb-5 border-b-2 border-white">
            <LayoutList />
            <span className="font-medium text-white">Board view</span>
          </div>

          {/* Add view button */}
          <button className="flex pb-5 items-center space-x-1 transition-colors">
            <Plus className="w-5 h-5 rounded-full p-0.5 bg-white/10 hover:bg-white/40 space-x-2 text-gray-400 hover:text-white"></Plus>
            <span>Add view</span>
          </button>
        </div>

        {/* Right side with controls */}
        <div className="flex  items-center space-x-4">
          {/* Filter button */}
          <button className="text-white pb-5 rounded-full px-2 py-1 hover:bg-white/10 transition-colors">
            Filter
          </button>

          {/* Sort button */}
          <button className="text-white/50 hover:text-white transition-colors">
            Sort
          </button>

          {/* More options */}
          <button className="text-gray-300  border border-white/50 rounded-full p-o.5 hover:text-white transition-colors">
            <svg
              className="w-3 rotate-90 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>

          {/* New template button */}
          <Button className="mb-4">New template</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

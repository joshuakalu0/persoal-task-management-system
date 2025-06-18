import Button from "@/components/ui/button";
import {
  AlertCircle,
  Bell,
  Calendar,
  LayoutList,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";

const Header = ({ subsection = false, config }) => {
  return (
    <header className="bg-secondary text-white px-6 pt-4 border-b border-gray-700">
      {/* Top row with welcome message and user info */}
      <div className="flex items-center justify-between mb-4">
        {/* Welcome message */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-secondary">
            Welcome back,{config.user.name}
            <span className="ml-2">👋</span>
          </h1>
        </div>

        {/* Right side with search, notifications, date, and avatar */}
        <div className="flex items-center space-x-4">
          {/* Search icon */}
          <div className="p-2  rounded-full  transition-colors">
            <Search className="text-secondary size-5" />
          </div>

          <div className="relative p-2 rounded-full transition-colors">
            <Bell className="text-secondary size-5" />
            <span className="absolute top-2 right-2 size-2 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-medium"></span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="text-secondary size-5" />
            <span className="text-sm text-primary">19 May 2022</span>
          </div>

          {/* avatar */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Vincent's avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {subsection && (
        <div className="flex items-center justify-between">
          {/* Left side with board view tabs */}
          <div className="flex items-center space-x-6">
            {/* Board view tab (active) */}
            <div className="flex items-center space-x-2 pb-5 b-border border-b-2 justify-center ">
              <LayoutList className="text-primary size-4" />
              <span className="font-medium text-secondary">Board view</span>
            </div>

            {/* Add view button */}
            <button className="flex pb-5 items-center space-x-1 transition-colors">
              <Plus className="w-5 h-5 rounded-full p-0.5 bg-shadow  space-x-2 text-secondary hover:text-primary" />
              <span className="text-primary font-semibold">Add view</span>
            </button>
          </div>

          {/* Right side with controls */}
          <div className="flex  items-center space-x-4">
            {/* Filter button */}
            <button className="text-secondary pb-5 rounded-full px-2 py-1 transition-colors font-semibold">
              Filter
            </button>
            {/* Sort button */}
            <button className="text-primary hover:text-white transition-colors pb-3 font-semibold">
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
            <Link href={`/tasks/new?projectId=${config.project_id}`}>
              <Button className="mb-4">New template</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

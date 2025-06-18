"use client";
import React, { useState } from "react";

const sect = {
  id: "projects",
  title: "Projects",
  isExpandable: true,
  items: [
    { id: "1", name: "All projects (3)", icon: "+" },
    { id: "2", name: "Design system", icon: "+" },
    { id: "3", name: "User flow", icon: "+" },
    { id: "4", name: "Ux research", icon: "+" },
    // Add more items to test dynamic behavior
    { id: "5", name: "Mobile app design", icon: "+" },
    { id: "6", name: "Web redesign", icon: "+" },
    { id: "7", name: "Brand guidelines", icon: "+" },
    { id: "8", name: "Frontend development", icon: "+" },
    { id: "9", name: "Backend API", icon: "+" },
    { id: "10", name: "Database design", icon: "+" },
  ],
};

const navItems = [
  {
    section: "Projects",
    items: [
      { label: "All projects", count: 3 },
      { label: "Design system", active: true },
      { label: "User flow" },
      { label: "Ux research" },
    ],
  },
  {
    section: "Tasks",
    items: [
      { label: "All tasks", count: 11 },
      { label: "To do", count: 4 },
      { label: "In progress", count: 4, active: true },
      { label: "Done", count: 3 },
    ],
  },
  { section: "Reminders", items: [] },
  { section: "Messengers", items: [] },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-[#191A1D] text-white flex flex-col px-6 py-8 gap-8 border-r border-[#232428]">
      <SidebarSection section={sect} />
    </aside>
  );
}

function SidebarSection({ section }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSection = () => {
    if (section.isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div
        className={`flex justify-between items-center py-2 mb-3  border-gray-600 ${
          section.isExpandable
            ? "cursor-pointer hover:bg-gray-700 hover:-mx-2 hover:px-2 hover:rounded hover:border-transparent"
            : ""
        } select-none transition-all duration-150`}
        onClick={toggleSection}
      >
        <span className="text-white font-semibold">{section.title}</span>
        {section.isExpandable && (
          <span
            className={`text-white text-sm transition-transform duration-200 ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          >
            ⌄
          </span>
        )}
      </div>

      {/* Section Items */}
      {isExpanded && (
        <div className="relative ml-2">
          {/* Vertical connecting line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-600" />

          <div className="transition-all duration-200 ease-in-out">
            {section.items.map((item, index) => (
              <ProjectItem
                key={item.id}
                item={item}
                isLast={index === section.items.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function ProjectItem({ item, isLast }) {
  return (
    <div className="relative flex items-center group">
      {/* Horizontal connecting line */}
      <div className="absolute left-2 top-1/2 w-2 h-px bg-gray-600" />

      <div className="flex items-center pl-6 pr-2 py-2 w-full cursor-pointer text-white/50 text-sm group  hover:mx-0 hover:pl-8 hover:rounded transition-all duration-150">
        <span className="mr-3  text-xs text-gray-600 w-3  inline-block">
          {item.icon}
        </span>
        <span className="font-semibold p-2 rounded-full group-hover:bg-white/10 group-hover:text-white/100">
          {item.name}
        </span>
      </div>
    </div>
  );
}

"use client";
import { getAllProjectsForUser } from "@/actions/project";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/auth-context";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";

const projectList = {
  id: "projects",
  title: "Projects",
  isExpandable: true,
  items: [],
};

export default function SecondarySidebar({ config }) {
  // const [projects, setprojects] = useState(config.projects || []);
  useEffect(() => {
    getAllProjectsForUser().then((result) => {
      setprojects(projects || []);
    });
  }, []);

  const project_list = { ...projectList, items: config.projects || [] };
  return (
    <aside className="w-52 min-h-screen bg-primary text-secondary flex flex-col px-2 py-8 gap-8 border-r border-[#232428]">
      <SidebarSection section={project_list} />
      <ThemeToggle />
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
        className={`flex justify-between items-center py-2 mb-1  border-gray-600 ${
          section.isExpandable
            ? "cursor-pointer hover:bg-gray-700 hover:-mx-2 hover:px-2 hover:rounded hover:border-transparent"
            : ""
        } select-none transition-all duration-150`}
        onClick={toggleSection}
      >
        <span className="text-secondary font-semibold">{section.title}</span>
        {section.isExpandable && (
          <span
            className={`text-white text-sm transition-transform duration-200 ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          >
            <ChevronDown />
          </span>
        )}
      </div>

      {/* Section Items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative ml-2"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function ProjectItem({ item, isLast }) {
  return (
    <div className="relative flex items-center group">
      {/* Horizontal connecting line */}
      <div className="absolute left-2 top-1/2 w-2 h-px bg-gray-600" />

      <div className="flex items-center pl-6 pr-2 py-0.5 w-full cursor-pointer  text-sm group  hover:mx-0 hover:pl-8 hover:rounded transition-all duration-150">
        <span className="mr-3  text-xs text-gray-600 w-3  inline-block">+</span>
        <span className="font-semibold text-primary p-0.5 px-1.5 rounded-full group-hover:bg-white/10 group-hover:text-secondary ">
          {item.name}
        </span>
      </div>
    </div>
  );
}

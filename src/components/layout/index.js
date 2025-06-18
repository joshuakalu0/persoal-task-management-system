import React from "react";
import Sidebar from "./sidebar";
import Header from "./nav/PrimaryLayer";

export default function DashboardLayoutWrapper({ children, config = {} }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1114] text-gray-900 dark:text-white flex">
      <Sidebar subsection={config?.showsection || false} config={config} />

      <div className="flex-1">
        <Header config={config} subsection={config?.showsection || false} />

        {children}
      </div>
    </div>
  );
}

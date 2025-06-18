import React from "react";
import Sidebar from "./sidebar";
import Header from "./nav/PrimaryLayer";
import ProtectedRoute, { ProtectedRouteWrapper } from "../auth/protected-route";

export default function DashboardLayoutWrapper({ children, config = {} }) {
  return (
    <ProtectedRoute>
      <ProtectedRouteWrapper>
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1114] text-gray-900 dark:text-white flex">
          <Sidebar subsection={config?.showsection || false} config={config} />

          <div className="flex-1 bg-secondary">
            <Header config={config} subsection={config?.showsection || false} />

            {children}
          </div>
        </div>
      </ProtectedRouteWrapper>
    </ProtectedRoute>
  );
}

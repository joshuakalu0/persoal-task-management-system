import React from "react";
import PrimarySideBar from "./PrimarySideBar";
import SecondarySidebar from "./SecondarySideBar";

export default function Sidebar({ subsection = false, config }) {
  return (
    <>
      <PrimarySideBar />
      {subsection && <SecondarySidebar config={config} />}
    </>
  );
}

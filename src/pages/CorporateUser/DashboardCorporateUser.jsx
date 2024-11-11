import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../../components/index"
import { ManageTrafficStatus } from "../index"

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen grid grid-cols-12 bg-slate-300">
      <div className="w-full col-span-2">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="col-span-10">
        <div className="flex-row gap-2">
          <Header />
          {/* Home... */}
          {tab === "home"}
          {/* Profile... */}
          {tab === "profile"}
          {/* Traffic Statistics... */}
          {tab === "traffic-statistics"}
        </div>
      </div>
    </div>
  );
}
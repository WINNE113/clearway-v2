import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar, Header } from "../../components/index"
import { ManageUser, ManageRoutes, ManageTrafficStatus, ManageCamera, ManageNotification, ManageReport, ManageTrafficSigns, ManagePayments,} from "../index"
import Overview from "./Overview";


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
      <div className="w-full col-span-2 h-full">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="col-span-10 h-full">
        <div className="flex-row gap-2 h-full">
          <Header/>
          {/* Overview... */}
          {tab === "overview" && <Overview/>}
          {/* Manage User... */}
          {tab === "manage-user" && <ManageUser/>}
          {/* Manage Traffic Status... */}
          {tab === "manage-traffic-status" && <ManageTrafficStatus/>}
          {/* Manage Traffic Route... */}
          {tab === "manage-traffic-route" && <ManageRoutes/>}
          {/* Manage Traffic Sign... */}
          {tab === "manage-traffic-sign" && <ManageTrafficSigns/>}
          {/* Manage Report... */}
          {tab === "manage-report" && <ManageReport/>}
          {/* Manage Camera... */}
          {tab === "manage-camera" && <ManageCamera/>}
          {/* Manage Notification... */}
          {tab === "manage-notification" && <ManageNotification/>}
          {/* Manage Payment... */}
          {tab === "manage-payment" && <ManagePayments/>}
        </div>
      </div>
    </div>
  );
}
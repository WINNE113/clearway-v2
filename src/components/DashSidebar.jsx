import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiUser,
  HiPresentationChartLine,
  HiOutlineTruck,
  HiMinusCircle,
  HiOutlineBookOpen,
  HiVideoCamera,
  HiAnnotation,
  HiBriefcase,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


export default function DashSidebar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <Sidebar className="w-full">
      <Sidebar.Items>
        <Sidebar.Logo className="logo w-full h-full pl-0 flex items-center justify-center" imgAlt="Logo" img="../../public/g8.svg" href="/" />
        <Sidebar.ItemGroup className="flex flex-col gap-1 mt-2 border-t-0">
          {currentUser && (currentUser.role === 0) && (
            <>
              {tab == "profile" ? (
                <Link to="/profileadmin?tab=profile">
                  <Sidebar.Item active={tab === "profile" || !tab} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                    Hồ sơ
                  </Sidebar.Item>
                </Link>
              ) : (
                <>
                  <Link to="/admin/dashboard?tab=overview">
                    <Sidebar.Item active={tab === "overview" || !tab} icon={HiHome} as="div" className="custom-sidebar-item">
                      Thống kê tổng quan
                    </Sidebar.Item>
                  </Link>
                
                  <Link to="/admin/dashboard?tab=manage-user">
                    <Sidebar.Item active={tab === "manage-user"} icon={HiUser} as="div" className="custom-sidebar-item">
                      Quản lý người dùng
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-traffic-status">
                    <Sidebar.Item active={tab === "manage-traffic-status"} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                      Quản lý tình trạng giao thông
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-traffic-route">
                    <Sidebar.Item active={tab === "manage-traffic-route"} icon={HiOutlineTruck} as="div" className="custom-sidebar-item">
                      Quản lý tuyến đường
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-traffic-sign">
                    <Sidebar.Item active={tab === "manage-traffic-sign"} icon={HiMinusCircle} as="div" className="custom-sidebar-item">
                      Quản lý biển báo giao thông
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-report">
                    <Sidebar.Item active={tab === "manage-report"} icon={HiOutlineBookOpen} as="div" className="custom-sidebar-item">
                      Quản lý báo cáo
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-camera">
                    <Sidebar.Item active={tab === "manage-camera"} icon={HiVideoCamera} as="div" className="custom-sidebar-item">
                      Quản lý camera
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-notification">
                    <Sidebar.Item active={tab === "manage-notification"} icon={HiAnnotation} as="div" className="custom-sidebar-item">
                      Quản lý thông báo
                    </Sidebar.Item>
                  </Link>
                  <Link to="/admin/dashboard?tab=manage-payment">
                    <Sidebar.Item active={tab === "manage-payment"} icon={HiBriefcase} as="div" className="custom-sidebar-item">
                      Quản lý thanh toán
                    </Sidebar.Item>
                  </Link>
                </>
              )}
            </>
          )}
          {currentUser && (currentUser.role === 1) && (
            <>
              <Link to="/">
                <Sidebar.Item active={tab === "home"} icon={HiMinusCircle} as="div" className="custom-sidebar-item">
                  Trang chủ
                </Sidebar.Item>
              </Link>
              <Link to="/profileadmin?tab=profile">
                <Sidebar.Item active={tab === "profile"} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                  Hồ sơ
                </Sidebar.Item>
              </Link>
              <Link to="/generaluser/dashboard?tab=upgrade-account">
                <Sidebar.Item active={tab === "upgrade-account"} icon={HiOutlineTruck} as="div" className="custom-sidebar-item">
                  Nâng cấp tài khoản
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser && (currentUser.role === 2) && (
            <>
              <Link to="/">
                <Sidebar.Item active={tab === "home"} icon={HiMinusCircle} as="div" className="custom-sidebar-item">
                  Trang chủ
                </Sidebar.Item>
              </Link>
              <Link to="/profileadmin?tab=profile">
                <Sidebar.Item active={tab === "profile"} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                  Hồ sơ
                </Sidebar.Item>
              </Link>
              <Link to="/corporateuser/dashboard?tab=traffic-statistics">
                <Sidebar.Item active={tab === "traffic-statistics"} icon={HiOutlineTruck} as="div" className="custom-sidebar-item">
                  Thống kê giao thông
                </Sidebar.Item>
              </Link>
            </>
          )}
          {currentUser && (currentUser.role === 3) && (
            <>
              {tab == "profile" ? (
                <Link to="/profileadmin?tab=profile">
                  <Sidebar.Item active={tab === "profile" || !tab} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                    Hồ sơ
                  </Sidebar.Item>
                </Link>
              ) : (
                <>
                  <Link to="/trafficauthority/dashboard?tab=manage-traffic-status">
                    <Sidebar.Item active={tab === "manage-traffic-status"} icon={HiPresentationChartLine} as="div" className="custom-sidebar-item">
                      Quản lý tình trạng giao thông
                    </Sidebar.Item>
                  </Link>
                  <Link to="/trafficauthority/dashboard?tab=manage-traffic-route">
                    <Sidebar.Item active={tab === "manage-traffic-route"} icon={HiOutlineTruck} as="div" className="custom-sidebar-item">
                      Quản lý tuyến đường
                    </Sidebar.Item>
                  </Link>
                  <Link to="/trafficauthority/dashboard?tab=manage-traffic-sign">
                    <Sidebar.Item active={tab === "manage-traffic-sign"} icon={HiMinusCircle} as="div" className="custom-sidebar-item">
                      Quản lý biển báo giao thông
                    </Sidebar.Item>
                  </Link>
                  <Link to="/trafficauthority/dashboard?tab=manage-report">
                    <Sidebar.Item active={tab === "manage-report"} icon={HiOutlineBookOpen} as="div" className="custom-sidebar-item">
                      Quản lý báo cáo
                    </Sidebar.Item>
                  </Link>
                  <Link to="/trafficauthority/dashboard?tab=manage-camera">
                    <Sidebar.Item active={tab === "manage-camera"} icon={HiVideoCamera} as="div" className="custom-sidebar-item">
                      Quản lý camera
                    </Sidebar.Item>
                  </Link>
                </>
              )}
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
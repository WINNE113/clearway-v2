import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogin, CiBellOn, CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/userSlice.js";
import { signout } from "../service/UserAPI.jsx";
import { useCallback } from "react";

export default function Header() {
  const location = useLocation();
  const generalUserRoutes = ["/", "/contact-us", "/about-us", "/product"];
  const isGeneralUserRoute = generalUserRoutes.includes(location.pathname);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignout = useCallback(async () => {
    try {
      await signout();
      dispatch(signoutSuccess());
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, navigate]);

  return (
    <>
      {!isGeneralUserRoute ? (
        <Navbar className="border-b-2 h-20 flex items-center sticky top-0 z-50">
          {currentUser && (
            <>
              <div className="flex w-4/5 justify-center items-center">
                <div className="border-2 rounded-3xl mx-2 flex w-96">
                  <button type="button" className="mx-4 rounded-l-full">
                    <CiSearch />
                  </button>
                  <input type="text" className="border-none rounded-r-full flex-grow" placeholder="Nhập nội dung tuyến đường cần tìm" />
                </div>
              </div>
              <div className="flex w-1/5 gap-2 md:order-2 justify-around items-center">
                <button className="text-gray-600">
                  <CiBellOn className="w-8 h-8" />
                </button>
                <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
                  <Dropdown.Header>
                    <span className="block text-sm">{currentUser.username}</span>
                    <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                  </Dropdown.Header>
                  <Link to="/profileadmin?tab=profile">
                    <Dropdown.Item>Hồ sơ</Dropdown.Item>
                  </Link>
                  {currentUser.role === 0 && (
                    <Link to="/admin/dashboard?tab=overview">
                      <Dropdown.Item>Dashboard</Dropdown.Item>
                    </Link>
                  )}
                  {currentUser.role === 1 && (
                    <Link to="/generaluser/dashboard?tab=upgrade-account">
                      <Dropdown.Item>Nâng cấp tài khoản</Dropdown.Item>
                    </Link>
                  )}
                  {currentUser.role === 2 && (
                    <Link to="/corporateuser/dashboard?tab=traffic-statistics">
                      <Dropdown.Item>Thống kê</Dropdown.Item>
                    </Link>
                  )}
                  {currentUser.role === 3 && (
                    <Link to="/trafficauthority/dashboard?tab=manage-traffic-status">
                      <Dropdown.Item>Dashboard</Dropdown.Item>
                    </Link>
                  )}
                </Dropdown>
                <button className="bg-white text-indigo-600 hover:bg-white flex items-center gap-1" onClick={handleSignout}>
                  <CiLogin className="w-8 h-8" />
                  Đăng xuất
                </button>
              </div>
            </>
          )}
        </Navbar>
      ) : (
        <Navbar className="bg-[#408DEF] bg-opacity-80 h-20 flex items-center sticky top-0 z-50">
          <Navbar.Brand href="/">
            <img
              src="/public/g8.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
              width={36}
              height={36}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              Clear Way
            </span>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Navbar.Link as="div" className="text-white hover:text-green-200 md:text-lg">
              <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link as="div" className="text-white hover:text-green-200 md:text-lg">
              <Link to="/contact-us">Contact Us</Link>
            </Navbar.Link>
            <Navbar.Link as="div" className="text-white hover:text-green-200 md:text-lg">
              <Link to="/about-us">About Us</Link>
            </Navbar.Link>
          </Navbar.Collapse>
          {currentUser ? (
            <div className="flex w-1/5 gap-2 md:order-2 justify-center items-center">
              <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                </Dropdown.Header>
                <Link to="/profileadmin?tab=profile">
                  <Dropdown.Item>Hồ sơ</Dropdown.Item>
                </Link>
                {currentUser.role === 0 && (
                  <Link to="/admin/dashboard?tab=overview">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                )}
                {currentUser.role === 1 && (
                  <Link to="/generaluser/dashboard?tab=upgrade-account">
                    <Dropdown.Item>Nâng cấp tài khoản</Dropdown.Item>
                  </Link>
                )}
                {currentUser.role === 2 && (
                  <Link to="/corporateuser/dashboard?tab=traffic-statistics">
                    <Dropdown.Item>Thống kê</Dropdown.Item>
                  </Link>
                )}
                {currentUser.role === 3 && (
                  <Link to="/trafficauthority/dashboard?tab=manage-traffic-status">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                )}
                <Dropdown.Divider />
              </Dropdown>
              <button className=" text-gray-200 flex items-center gap-1" onClick={handleSignout}>
                <CiLogin className="w-8 h-8" />
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex gap-2 md:order-2">
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button gradientDuoTone="purpleToBlue" outline>
                  Đăng ký
                </Button>
              </Link>
              <Navbar.Toggle />
            </div>
          )}
        </Navbar>
      )}
    </>
  );
}

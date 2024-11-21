import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin, CiBellOn, CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/userSlice.js";
import { signout } from "../service/UserAPI.jsx";


export default function HeaderGeneralUser() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);


  const navigate = useNavigate();


  const handleChatClick = () => {
    if (currentUser && (currentUser.isPremium || currentUser.isAdmin)) {
      navigate("/rooms");
    } else {
      navigate("/payment");
    }
  };


  const handleSignout = async () => {
    try {
      await signout()
      dispatch(signoutSuccess());
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="bg-[#63E72E] bg-opacity-90 h-20 flex items-center sticky top-0 z-50">
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
        <Navbar.Link as={"div"} className="text-white hover:text-green-200 md:text-lg">
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} className="text-white hover:text-green-200 md:text-lg">
          <Link to="/contactus">Contact Us</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} className="text-white hover:text-green-200 md:text-lg">
          <Link to="/aboutus">About Us</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} className="text-white hover:text-green-200 md:text-lg">
          <Link to="/product">Product</Link>
        </Navbar.Link>
      </Navbar.Collapse>
      {currentUser ? (
        <>
          <div className="flex w-1/5 gap-2 md:order-2 justify-around items-center">
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
              </Dropdown.Header>
              {currentUser?.role == 1 && (
                <>
                  <Link to="/generaluser/dashboard?tab=upgrade-account">
                    <Dropdown.Item>Setting</Dropdown.Item>
                  </Link>
                </>
              )}
              {currentUser?.role == 2 && (
                <>
                  <Link to="/profilecomporate">
                    <Dropdown.Item>Setting</Dropdown.Item>
                  </Link>
                </>
              )}
              {currentUser?.role == 0 && (
                <>
                  <Link to="admin/dashboard?tab=overview">
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                  </Link>
                </>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </Navbar>
  );
}
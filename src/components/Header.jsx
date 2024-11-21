import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin, CiBellOn, CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/userSlice.js";
import { signout } from "../service/UserAPI.jsx";


export default function Header() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  const navigate = useNavigate();
  const rolePaths = {
    0: "/profileadmin?tab=profile",
    3: "/profiletraffic?tab=profile"
  };
  const currentPath = rolePaths[currentUser?.role];
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
    <Navbar className="border-b-2 h-20 flex items-center">
      {currentUser ? (
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
            <button className="" color="gray" onClick={handleChatClick}>
              <CiBellOn className="w-8 h-8" />
            </button>
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
              <Dropdown.Header>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
              </Dropdown.Header>
              {currentPath && (
                <Link to={currentPath}>
                  {currentUser.role == 0? <Dropdown.Item>Dashboard</Dropdown.Item> : <Dropdown.Item>Setting</Dropdown.Item>}
                </Link>
              )}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
            <button className="bg-white text-indigo-600 hover:bg-white flex items-center gap-1" onClick={handleSignout}>
              <CiLogin className="w-8 h-8 " />
              Đăng xuất
            </button>
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
          <Navbar.Collapse>
            <Navbar.Link as={"div"}>
              <Link to="/">Home</Link>
            </Navbar.Link>
            <Navbar.Link as={"div"}>
              <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link as={"div"}>
              <Link to="/blogs">Blogs</Link>
            </Navbar.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}
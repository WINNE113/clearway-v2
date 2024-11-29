import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, ForgetPassword, ReNewPassword, Home, DashboardAdmin, DashboardTrafficAuthority, DashboardCorporateUser, DashboardGeneralUser } from "./pages/index";
import { OnlyAdmin, OnlyTrafficAuthority, OnlyCorporateUser, OnlyGeneralUser } from "./components/index";


import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import OnlyUserPrivateRoute from "./pages/CorporateUser/OnlyUser";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id" element={<ReNewPassword />} />

        <Route element={<OnlyUserPrivateRoute />}>
         {/* Trang của người dùng profile*/}
          <Route path="/profileadmin" element={<ProfileAdmin />}></Route>
        </Route>
        <Route element={<OnlyGeneralUser />}>
          {/* Trang của người dùng bình thường*/}
          <Route path="/generaluser/dashboard" element={<DashboardGeneralUser />}></Route>
        </Route>
        <Route element={<OnlyCorporateUser />}>
          {/* Trang của người dùng doanh nghiệp */}
          <Route path="/corporateuser/dashboard" element={<DashboardCorporateUser />}></Route>
        </Route>
        <Route element={<OnlyTrafficAuthority />}>
          {/* Trang của bộ giao thông */}
          <Route path="/trafficauthority/dashboard" element={<DashboardTrafficAuthority />}></Route>
        </Route>
        <Route element={<OnlyAdmin />}>
          {/* Trang của admin */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
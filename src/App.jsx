import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp, ForgetPassword, ReNewPassword, Home, DashboardAdmin, DashboardTrafficAuthority, DashboardCorporateUser, DashboardGeneralUser } from "./pages/index";
import { OnlyAdmin, OnlyTrafficAuthority, OnlyCorporateUser, OnlyGeneralUser } from "./components/index";

import ProfileComporate from "./pages/CorporateUser/ProfileComporate";
import ProfileGenral from "./pages/GeneralUser/ProfileGenral";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:id" element={<ReNewPassword />} />
        <Route element={<OnlyGeneralUser />}>
          {/* Trang của người dùng bình thường*/}
          <Route path="/generaluser/dashboard" element={<DashboardGeneralUser />}></Route>
          <Route path="/profilegenral" element={<ProfileGenral />}></Route>


        </Route>
        <Route element={<OnlyCorporateUser />}>
          {/* Trang của người dùng doanh nghiệp */}
          <Route path="/corporateuser/dashboard" element={<DashboardCorporateUser />}></Route>
          <Route path="/profilecomporate" element={<ProfileComporate />}></Route>

        </Route>
        <Route element={<OnlyTrafficAuthority />}>
          {/* Trang của bộ giao thông */}
          <Route path="/trafficauthority/dashboard" element={<DashboardTrafficAuthority />}></Route>
          <Route path="/profiletraffic" element={<ProfileAdmin />}></Route>
        </Route>
        <Route element={<OnlyAdmin />}>
          {/* Trang của admin */}
          <Route path="/admin/dashboard" element={<DashboardAdmin />}></Route>
          <Route path="/profileadmin" element={<ProfileAdmin />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
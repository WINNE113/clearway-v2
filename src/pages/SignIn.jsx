import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import OAuth from "../components/OAuth";
import {login} from "../service/UserAPI"

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    try {
      dispatch(signInStart());
      const res = await login(formData)
      const data = res.data;

      if (res.status !== 200) {
        dispatch(signInFailure(res.detail));
      }
 
      if (res.status === 200) {
        dispatch(signInSuccess(data));
        if (data.role === 0){
          navigate('/admin/dashboard?tab=overview');
        }else if(data.role === 1){
          navigate('/generaluser/dashboard?tab=upgrade-account');
        }else if(data.role === 2){
          navigate('/profileadmin?tab=profile');
        }else{
          navigate('/trafficauthority/dashboard?tab=manage-traffic-status');
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.detail));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Clear
            </span>
            Way
          </Link>
          <p className="text-sm mt-5 dark:text-gray-300">Bạn có thể đăng nhập bằng email và mật khẩu hoặc bằng Google</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <span style={{ color: 'dark:text-gray-200' }}>Email</span>
              <TextInput
                type="email"
                placeholder="email@company.com"
                id="email"
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
            <span style={{ color: 'dark:text-gray-200' }}>Mật khẩu</span>
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
                className="dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5 dark:text-gray-300">
            <span>Bạn chưa có tài khoản?</span>
            <Link to="/sign-up" className="text-blue-500 dark:text-blue-400">
              Đăng ký
            </Link>
          </div>
          <div className="flex gap-2 text-sm mt-2 dark:text-gray-300">
            <Link to="/forget-password" className="text-red-500 dark:text-blue-400">
              Quên mật khẩu?
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {JSON.stringify(errorMessage)}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
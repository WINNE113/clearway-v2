import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextInput, Label } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetpassword } from "../service/UserAPI"
const ReNewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


    const validate = () => {
        const newErrors = {};
        if (!password) {
            newErrors.password = "Trường này không được bỏ trống.";
        } else if (password.length < 6) {
            newErrors.password = "Mật khẩu bắt buộc tối thiểu 6 ký tự.";
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Trường này không được bỏ trống.";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        try {
            setIsLoading(true);
            const res = resetpassword({id: id, new_password: password, re_new_password: confirmPassword})
            if(res.status !== 200)
                navigate("/sign-in")
            else
                setErrors(res);
        } catch (error) {
            setErrors(error)
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
            <div className="flex flex-row w-full justify-center items-center">
                <div className="w-1/2 flex justify-center items-center">
                    <img src="../../public/logo.svg" className="w-72 max-h-80 object-cover" alt="logo image" />
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="rounded-lg shadow-sm inset-0 p-8 flex flex-col gap-8 w-[500px]">
                        <img src="../../public/logo.svg" className="object-cover mt-6 w-14 h-14 flex justify-center items-center mx-auto" alt="logo"/>
                        <h2 className="text-3xl text-gray-700 tracking-tight font-bold m-auto">Đổi mật khẩu mới</h2>
                        <div className="relative">
                            <Label className="text-lg" value="Nhập mật khẩu mới"/>
                            <TextInput
                                textColor="#333333"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                placeholder="**************"
                            />
                            <button type="button" className="absolute inset-y-0 right-0 mt-6 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                            </button>
                            {errors.password && <span className="text-red-500">{errors.password}</span>}
                        </div>
                        <div className="relative">
                            <Label className="text-lg" value="Nhập lại mật khẩu mới"/>
                            <TextInput
                                textColor="#333333"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showRePassword ? "text" : "password"}
                                fullWidth
                                placeholder="**************"
                            />
                            <button type="button" className="absolute inset-y-0 right-0 mt-6 pr-3 flex items-center" onClick={() => setShowRePassword(!showRePassword)}>
                                {showRePassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                            </button>
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                        </div>
                        <Button type="submit" fullWidth className="mt-3 rounded-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Đổi mật khẩu mới"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReNewPassword;
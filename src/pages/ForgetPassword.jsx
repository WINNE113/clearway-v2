import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Modal } from "flowbite-react";
import { forgotpassword, resetpasswordotp } from "../service/UserAPI";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            setIsLoading(true);
            const res = await forgotpassword({ email });
            if (res.status !== 200) {
                setError(res.detail);
            } else {
                setModal(true);
            }
        } catch (error) {
            setError("Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            setIsLoading(true);
            const res = await resetpasswordotp({email: email, otp: otp });
            if (res.status !== 200) {
                setError(res.detail);
            } else {
                navigate(`/reset-password/${res.data.id}`)
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
            <div className="flex flex-row w-full justify-center items-center">
                <div className="w-1/2 flex justify-center items-center">
                    <img src="logo.svg" className="w-72 max-h-80 object-cover" alt="logo image" />
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="rounded-lg shadow-sm inset-0 p-8 flex flex-col gap-8 w-[500px]">
                        <img src="logo.svg" className="object-cover mt-6 w-14 h-14 flex justify-center items-center mx-auto" alt="logo" />
                        <h2 className="text-3xl text-gray-700 tracking-tight font-bold m-auto">Quên mật khẩu</h2>
                        <TextInput
                            label="Enter your email"
                            textColor="#333333"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="mail@abc.com"
                            fullWidth
                        />
                        {error && <span className="text-red-500">{error}</span>}
                        <Button type="submit" fullWidth className="mt-3 rounded-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Gửi mã xác nhận"}
                        </Button>
                    </form>
                </div>
            </div>
            <Modal show={modal} onClose={() => setModal(false)} size="md">
                <Modal.Header>Mã xác nhận OTP</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                        <TextInput
                            label="OTP"
                            textColor="#333333"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Nhập mã xác nhận OTP"
                            fullWidth
                        />
                        <Button type="submit" fullWidth className="mt-3 rounded-full">
                            Gửi mã xác nhận
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ForgetPassword;
import { TextInput, Tabs, Spinner, Button } from "flowbite-react";
import { DashSidebar, Header } from "../../components/index";
import { useEffect, useState, useRef, useCallback } from "react";
import { detailUser, updateProfile, changePassword } from "../../service/UserAPI";
import { CircularProgressbar } from "react-circular-progressbar";
import { app } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const ProfileAdmin = () => {
    const [getDetailUser, setDetailUser] = useState();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    const filePickerRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };
    
    const uploadImage = useCallback(async () => {
        if (!imageFile) return;
        try {
            setImageFileUploading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },(error) => {
                    console.error("Upload error:", error);
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null);
                    setImageFileUploading(false);
                },async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageFileUrl(downloadURL);
                        setFormData({ ...formData, profile_picture: downloadURL });
                    } catch (error) {
                        console.error("Download URL error:", error);
                    } finally {
                        setImageFileUploading(false);
                        setImageFileUploadProgress(null);
                    }
                }
            );
        } catch (error) {
            console.error("Lỗi tải hình ảnh:", error);
        }
    }, [imageFile, formData]);

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    useEffect(() => {
        const fetchData = async () => {
            const storedData = localStorage.getItem("persist:root");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const userData = JSON.parse(parsedData.user);
                const currentUser = userData.currentUser;
                const id = currentUser?._id;
                const response = await detailUser(id);                
                setDetailUser(response?.data)
                setFormData(response?.data)
            }
            setLoading(false)
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleUpdate = async() => {
        setLoading(true);
        if (imageFileUploading) {
            setLoading(false);
            return;
        }
        try {
            const res = await updateProfile(formData, getDetailUser._id);
            if (res.status === 200) {
                console.log("Cập nhật thành công");
                
            } else {
                console.log("Cập nhật thất bại");
            }
        } catch (error) {
            console.log(`Có lỗi xảy ra. Vui lòng thử lại! ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (dateString) => { 
        const date = new Date(dateString); 
        const year = date.getFullYear(); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`; 
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const currentPassword = e.target.currentpassword.value;
        const newPassword = e.target.password.value;
        const confirmPassword = e.target['confirm-password'].value;
    
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }
    
        try {
            const dataSend = {"old_password": currentPassword, "new_password": newPassword}
            console.log(dataSend);
            
            const response = await changePassword(dataSend, getDetailUser._id);
            if (response.status === 200) {
                alert("Đổi mật khẩu thành công!");
            } else {
                alert("Đổi mật khẩu thất bại!");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-12 bg-slate-300">
            <div className="w-full col-span-2">
                {/* Sidebar */}
                <DashSidebar />
            </div>
            <div className="col-span-10">
                <div className="flex-row gap-2">
                    <Header />
                </div>
                <main className="mx-9 my-9">
                    <div className="container mx-auto bg-white mt-5 mb-5 p-5 rounded-lg">
                        {/* <Tabs defaultActiveKey="1" items={items} /> */}
                        <Tabs aria-label="Default tabs" variant="default">
                            <Tabs.Item active title="Chỉnh sửa hồ sơ">
                                <div className="flex flex-wrap">
                                    {/* Left column */}
                                    <div className="w-full md:w-1/4">
                                        <div className="flex flex-col items-center text-center p-3 py-5">
                                            <div className="relative mt-5 cursor-pointer">
                                                <div className="relative w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                                                    <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                                                    {imageFileUploadProgress && (
                                                        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                                                            styles={{
                                                                root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 },
                                                                path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                                                            }} />
                                                    )}
                                                    <img src={imageFileUrl || "../../../public/g8.svg"} alt="user" className={`rounded-full w-full h-full object-cover border-2 ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`} />
                                                </div>
                                                <div className="absolute bottom-3 right-0 bg-blue-500 text-white p-2 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M16.88 3.515a2.5 2.5 0 113.536 3.536L7.5 20.93l-4 1 1-4L16.88 3.515z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-3/4 border-r px-5">
                                        <div className="py-5">
                                            <div className="flex justify-between items-center mb-3 mt-3">
                                                <h4 className="text-lg font-semibold">Profile Settings</h4>
                                            </div>
                                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                <div>
                                                    <label className="block font-medium">Họ tên</label>
                                                    <input
                                                        type="text"
                                                        onChange={handleChange}
                                                        className="border rounded-lg w-3/4 p-2"
                                                        value={formData.username || (getDetailUser ? getDetailUser.username : "")}
                                                        id="username"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium">Số điện thoại</label>
                                                    <input
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={formData.phone_number || (getDetailUser ? getDetailUser.phone_number : "")}
                                                        className="border rounded-lg w-3/4 p-2"
                                                        id="phone_number"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                <div>
                                                    <label className="block font-medium">Email</label>
                                                    <input
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={formData.email || (getDetailUser ? getDetailUser.email : "")}
                                                        className="border rounded-lg w-3/4 p-2"
                                                        id="email"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block font-medium">Ngày tháng năm sinh</label>
                                                    <input
                                                        type="date"
                                                        id="birthday"
                                                        onChange={handleChange}
                                                        value={formatDate(formData.birthday) || (getDetailUser && getDetailUser.birthday ? formatDate(getDetailUser.birthday) : "")}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                <div>
                                                    <label className="block font-medium">Giới tính</label>
                                                    <select
                                                        id="gender"
                                                        onChange={handleChange}
                                                        value={formData.gender || (getDetailUser && getDetailUser.gender ? getDetailUser.gender : "Chưa xác định")}
                                                        className="w-2/3 p-2 border border-gray-600 rounded-lg"
                                                    >
                                                        <option value="Chưa xác định">Chưa xác định</option>
                                                        <option value="Male">Nam</option>
                                                        <option value="Female">Nữ</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="text-right mt-5" style={{ width: '85%' }}>
                                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleUpdate}>
                                                    Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Item>
                            <Tabs.Item title="Mật khẩu">
                                <section className="bg-gray-50 dark:bg-gray-900">
                                    <div className="flex flex-col px-6 py-8 md:h-screen lg:py-0 mx-5 items-center">
                                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 w-3/4" onSubmit={handlePasswordChange}>
                                            <div>
                                                <label htmlFor="currentpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Nhập mật khẩu cũ
                                                </label>
                                                <TextInput
                                                    type="password"
                                                    id="currentpassword"
                                                    placeholder="Nhập mật khẩu hiện tại của bạn"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Nhập mật khẩu mới
                                                </label>
                                                <TextInput
                                                    type="password"
                                                    id="password"
                                                    placeholder="Nhập mật khẩu mới"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Xác nhận mật khẩu mới
                                                </label>
                                                <TextInput
                                                    type="password"
                                                    id="confirm-password"
                                                    placeholder="Nhập mật khẩu xác nhận"
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <Button className="bg-blue-500" type="submit" color="success">
                                                    Đổi mật khẩu
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </Tabs.Item>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>

    )
}
export default ProfileAdmin
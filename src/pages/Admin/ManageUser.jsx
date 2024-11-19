import { useState, useEffect, useRef, useCallback } from "react"
import { Button, Spinner, Modal, TextInput, Label, Pagination} from "flowbite-react";
import { CiLock, CiUnlock, CiEdit, CiSaveDown2 } from "react-icons/ci";
import { CircularProgressbar } from "react-circular-progressbar";
import * as XLSX from 'xlsx';
import { app } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getusers, setBanUser, createTrafficAuthority, updateAccount } from "../../service/UserAPI";

const ManageUser = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [userUpdate, setUserUpdate] = useState(null);
    const [activeTab, setActiveTab] = useState(1);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openCreateAuthority, setOpenCreateAuthority] = useState(false);
    const [openModalBanUnBanUser, setOpenModalBanUnBanUser] = useState(false);

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessage] = useState(null);

    const [formData, setFormData] = useState(null);
    const [banAction, setBanAction] = useState(null);
    const [userIdToBan, setUserIdToBan] = useState(null);

    const filePickerRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

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
                        setFormData({ ...formData, profilePicture: downloadURL });
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
    }, [imageFile, uploadImage]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getusers();
                setUsers(response.data.users);
            } catch (error) {
                setMessage(`Lỗi lấy dữ liệu người dùng ${error}`)
            } finally{
                setLoading(false);
            }
          };
        fetchUsers();
    },[]);

    const handleBanUnbanUser = async () => {
        try {
            const res = await setBanUser(`${banAction}/${userIdToBan}`);
            if (res.status == 200) {
                setUsers((prev) => prev.map((user) => user._id === userIdToBan ? { ...user, is_ban: banAction === 'ban_user' } : user));
                setOpenModalBanUnBanUser(false);
            } else {
                setMessage(res.detail);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (imageFileUploading) {
            setMessage("Vui lòng đợi tải ảnh cập nhật lên nhé!")
            setLoading(false);
            return;
        }
        try {
            const res = await createTrafficAuthority(formData);
            if (res.status === 200) {
                const newUser = { ...formData, "_id": res.data.userId, "role": 3, "is_ban": false };
                setUsers([...users, newUser]);
                setFormData(newUser);
                setOpenCreateAuthority(false);
            } else {
                setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${res.detail}`);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleChangeUpdate = (e) => {
        const { id, value } = e.target;
        setUserUpdate(prevState => ({ ...prevState, [id]: value}));
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await updateAccount(userUpdate, userUpdate._id);
            if (res.status === 200) {
                setUsers(prevUsers => prevUsers.map(user => user._id === userUpdate._id ? res.data.result : user ));
                setMessage("Cập nhật thành công");
                setShowMessageModal(true);
                setUserUpdate(null);
            } else {
                setMessage(`Cập nhật thất bại: ${res.detail}`);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(`Có lỗi xảy ra. Vui lòng thử lại! ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const filteredData = users.map(user => ({
            email: user.email,
            phone_number: user.phone_number,
            username: user.username,
            gender: user.gender,
            birthday: user.birthday
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'Data Users.xlsx');
    };
    
    const userrole = users ? users.filter(user => user.role === activeTab) : [];

    const viewRole = (role) => {
        const roles = { 1: "General User", 2: "Corporate User", 3: "Traffic Authority", 0: "Admin"};
        return roles[role] || 1;
    };

    const formatDate = (dateString) => { 
        const date = new Date(dateString); 
        const year = date.getFullYear(); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`; 
    };

    const pageCount = Math.ceil(userrole.length / usersPerPage);
    const currentUsers = userrole.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
    const onPageChange = (page) => {setCurrentPage(page);};
    
    if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        );
    }

    return (
        <main className="m-9 h-full">
            <div className=" bg-white rounded-lg shadow-md p-6" style={{ height: '580px'}}>
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-2">Thông tin người dùng</h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button gradientDuoTone="purpleToBlue" onClick={() => {setOpenCreateAuthority(true)}} outline>
                            Tạo tài khoản Traffic Authority
                        </Button>
                        <Button gradientDuoTone="greenToBlue" outline onClick={handleExport}>
                            <CiSaveDown2 className="mr-2" size={20}></CiSaveDown2>Tải danh sách
                        </Button>
                    </div>
                </div> 
                <div className="mb-4 mt-5 flex">
                    <button className={activeTab === 1 ? "text-indigo-800 border-indigo-800 border-x-2 border-t-2 rounded-t-xl px-3 py-1" : "px-3 py-1 border-b-2"} onClick={() => setActiveTab(1)}>
                        Danh sách General User
                    </button>
                    <button className={activeTab === 2 ? "text-indigo-800 border-indigo-800 border-x-2 border-t-2 rounded-t-xl px-3 py-1" : "px-3 py-1 border-b-2"} onClick={() => setActiveTab(2)}>
                        Danh sách Corporate User
                    </button>
                    <button className={activeTab === 3 ? "text-indigo-800 border-indigo-800 border-x-2 border-t-2 rounded-t-xl px-3 py-1" : "px-3 py-1 border-b-2"} onClick={() => setActiveTab(3)}>
                        Danh sách Traffic Authority
                    </button>
                    <button className={activeTab === 0 ? "text-indigo-800 border-indigo-800 border-x-2 border-t-2 rounded-t-xl px-3 py-1" : "px-3 py-1 border-b-2"} onClick={() => setActiveTab(0)}>
                        Danh sách Admin
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full h-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-sm leading-normal">
                                <th className="py-1 px-2 text-center w-1/6">Họ và Tên</th>
                                <th className="py-1 px-2 text-center w-1/3">Email</th>
                                <th className="py-1 px-2 text-center w-1/6">Vai trò</th>
                                <th className="py-1 px-2 text-center w-1/6">Tình trạng</th>
                                <th className="py-1 px-2 text-center w-1/6">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-950 text-sm font-light">
                            {currentUsers && currentUsers.map((user) => (
                                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-200">
                                    <td className="py-1 px-2 text-center w-1/6">{user.username}</td>
                                    <td className="py-1 px-2 text-center w-1/3">{user.email}</td>
                                    <td className="py-1 px-2 text-center w-1/6">{viewRole(user.role)}</td>
                                    <td className={user.is_ban ? `py-1 px-2 text-center w-1/6 text-red-600` : `py-1 px-2 text-center text-green-600 w-1/6`}>{user.is_ban ? "Tài khoản đang bị cấm" : "Hoạt động"}</td>
                                    <td className="py-1 px-2 text-center w-1/6 space-x-4">
                                        <button className="w-6 h-6 text-blue-700" onClick={() => {setOpenModalUpdate(true), setUserUpdate(user)}}><CiEdit size={24} /></button>
                                        {user.is_ban ? (
                                            <button className='font-medium text-green-500 hover:underline cursor-pointer' onClick={() => {
                                                if (user.role === 0) {
                                                    setMessage('Bạn không thể cấm tài khoản Admin!');
                                                    setShowMessageModal(true);
                                                } else {
                                                    setOpenModalBanUnBanUser(true);
                                                    setUserIdToBan(user._id);
                                                    setBanAction('unban_user');
                                                }
                                            }} >
                                                <CiUnlock size={24} />
                                            </button>
                                        ) : (
                                            <button className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => {
                                                if (user.role === 0) {
                                                    setMessage('Bạn không thể mở quyền tài khoản Admin đã bị cấm!');
                                                    setShowMessageModal(true);
                                                } else {
                                                    setOpenModalBanUnBanUser(true);
                                                    setUserIdToBan(user._id);
                                                    setBanAction('ban_user');
                                                }
                                            }} >
                                                <CiLock size={24} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                <Pagination
                    layout="pagination"
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={onPageChange}
                    previousLabel="Trước"
                    nextLabel="Sau"
                    showIcons
                    />
                </div>
            </div>
            <Modal show={openCreateAuthority} onClose={() => setOpenCreateAuthority(false)} popup size='lg'>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <div className='text-center'>
                        <h2 className="my-1">Tạo tài khoản quản lý giao thông</h2>
                        <form className='flex flex-col gap-4'>
                            <div className="relative w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                                {imageFileUploadProgress && (
                                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                                        styles={{
                                            root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 },
                                            path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                                        }}/>
                                )}
                                <img src={imageFileUrl || "../../../public/g8.svg"} alt="user" className={`rounded-full w-full h-full object-cover border-2 ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}/>
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-left mb-2">Họ và Tên</label>
                                <TextInput id="username" placeholder="Họ và Tên" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-left mb-2">Email</label>
                                <TextInput id="email" placeholder="Email" onChange={handleChange} />
                            </div>
                            <div className="flex justify-between gap-2">
                                <div className="w-1/2">
                                    <label htmlFor="phone_number" className="block text-left mb-2">Số điện thoại</label>
                                    <TextInput id="phone_number" placeholder="Số điện thoại" onChange={handleChange} />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="role" className="block text-left mb-2">Vai trò</label>
                                    <TextInput placeholder="Traffic Authority" readOnly />
                                </div>
                            </div>
                            <div className="flex justify-between gap-2">
                                <div className="w-1/2">
                                    <label htmlFor="birthday" className="block text-left mb-2">Ngày sinh</label>
                                    <input type="date" id="birthday" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange} />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="gender" className="block text-left mb-2">Giới tính</label>
                                    <select id="gender" className="w-full p-2 border border-gray-300 rounded" onChange={handleChange}>
                                        <option value={null}>Chọn giới tính</option>
                                        <option value={0}>Nam</option>
                                        <option value={1}>Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-center gap-9 my-4'>
                                <Button className="w-1/4" color='red' onClick={() => setOpenCreateAuthority(false)}>
                                    Hủy
                                </Button>
                                <Button className="w-1/4" color='blue' type="submit" onClick={handleSubmit}>
                                    Tạo
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={openModalBanUnBanUser} onClose={() => setOpenModalBanUnBanUser(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                <div className='text-center'>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                        {banAction=="ban_user" ? `Bạn có chắc là muốn khóa tài khoản này?` : 'Bạn có chắc là muốn mở khóa tài khoản này?'}
                    </h3>
                    <div className='flex justify-center gap-4'>
                    <Button className="w-1/2" color='gray' onClick={() => setOpenModalBanUnBanUser(false)}>
                        Hủy
                    </Button>
                    {banAction && (
                        <Button className="w-1/2" color='failure' onClick={handleBanUnbanUser}>
                        Vâng, Tôi chắc chắn
                        </Button>
                    )}
                    </div>
                </div>
                </Modal.Body>
            </Modal>
            <Modal show={openModalUpdate} onClose={() => setOpenModalUpdate(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        {userUpdate && (
                        <>
                            <h3 className='mb-10 flex flex-col gap-4'>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="fullName" className="text-start">Họ và Tên</Label>
                                    <TextInput id="fullName" value={userUpdate.username?userUpdate.username:""} onChange={handleChangeUpdate}/>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="email" className="text-start">Email</Label>
                                    <TextInput id="email" value={userUpdate.email?userUpdate.email:""} readOnly/>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <Label htmlFor="phone_number" className="text-start">Số điện thoại</Label>
                                        <TextInput id="phone_number" value={userUpdate.phone_number?userUpdate.phone_number:""} onChange={handleChangeUpdate}/>
                                    </div>
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <Label htmlFor="role" className="text-start">Vai trò</Label>
                                        <input type="text" id="role" value={viewRole(userUpdate.role)} 
                                            className="w-full p-2 border border-gray-300 rounded" readOnly 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <Label htmlFor="birthday" className="text-start">Ngày sinh</Label>
                                        <input 
                                            type="date" 
                                            id="birthday" 
                                            onChange={handleChangeUpdate}
                                            defaultValue={userUpdate && userUpdate.birthday ? formatDate(userUpdate.birthday) : ""} 
                                            placeholder={userUpdate && userUpdate.birthday ? formatDate(userUpdate.birthday) : "Chưa xác định"} 
                                            className="w-full p-2 border border-gray-300 rounded" 
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-2 w-1/2">
                                        <Label htmlFor="gender" className="text-start">Giới tính</Label>
                                        <select id="gender" onChange={handleChangeUpdate}
                                            defaultValue={userUpdate && userUpdate.gender ? userUpdate.gender : "Chưa xác định"} 
                                            className="w-full p-2 border border-gray-300 rounded">
                                            <option value="Chưa xác định">Chưa xác định</option>
                                            <option value="Male">Nam</option>
                                            <option value="Female">Nữ</option>
                                        </select>    
                                    </div>
                                </div>
                            </h3>
                            <div className='flex justify-center gap-9'>
                                <Button className="bg-red-700 w-1/3" color="failure" onClick={() => setOpenModalUpdate(false)}>
                                    Hủy
                                </Button>
                                <Button type="submit" className="bg-blue-700 w-1/3" color="blue" onClick={() => {setOpenModalUpdate(false), handleUpdate()}}>
                                    Cập Nhật
                                </Button>
                            </div>
                        </>)}
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={showMessageModal} onClose={() => setShowMessageModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            {message}
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='gray' onClick={() => setShowMessageModal(false)}>
                                Ok
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </main >
    )
}

export default ManageUser
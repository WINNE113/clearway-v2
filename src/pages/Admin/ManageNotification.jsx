import { FaUserCog, FaUsers } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";
import { Button, Modal, TextInput, Pagination, Label, Textarea, Select } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getusers } from '../../service/UserAPI';
import { CreateNotificationsApi, DeleteNotification, getDataNotificationApi, getDetailNotificationApi, PutNotifcation } from '../../service/NotificationAPI';

const ManageNotification = () => {
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);


    const [notifications, setNotifications] = useState([]);

    const [users, setUsers] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: true,
        role_recipient: 1
    });
    const [formDataUpdate, setFormDataUpdate] = useState({
        title: "",
        content: "",
        status: true,
        role_recipient: 1
    });
    const getCurrentTime = () => {
        const now = new Date(); // Lấy thời gian hiện tại
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng (bắt đầu từ 0)
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Định dạng YYYY-MM-DD HH:mm:ss
    };
    const fetchNotifications = async () => {
        try {
            const response = await getDataNotificationApi();

            setNotifications(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchNotifications();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getusers();
                setUsers(response.data.users);
            } catch (error) {
                setMessage(`Lỗi lấy dữ liệu người dùng ${error}`)
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const userrole = users ? users.filter(user => user.role === activeTab) : [];
    const pageCount = Math.ceil(userrole.length / usersPerPage);
    const onPageChange = (page) => { setCurrentPage(page); };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };
    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;

        setFormDataUpdate({ ...formDataUpdate, [name]: value });
    };
    const submitNoti = async () => {
        setLoading(true);
        try {
            const res = await CreateNotificationsApi(formData);
            fetchNotifications();
            setOpenCreateModal(false);

        } catch (error) {
            setMessage(`Error: ${error}`);

        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    };
    const updateNoti = async (id) => {
        setLoading(true);
        try {
            const res = await PutNotifcation(id, formDataUpdate);
            fetchNotifications();
            setOpenDetailModal(false);

        } catch (error) {
            setMessage(`Error: ${error}`);

        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    };

    const changeStatus = async (id, status) => {
        try {
            const body = {
                status: !status
            }
            const res = await PutNotifcation(id, body);

            fetchNotifications();


        } catch (error) {
            setMessage(`Error: ${error}`);

        }
    }
    const deleteNoti = async (id) => {
        try {

            const res = await DeleteNotification(id);

            fetchNotifications();


        } catch (error) {
            setMessage(`Error: ${error}`);

        }
    }
    const showDetailNoti = async (user) => {
        try {


            setFormDataUpdate(user)

        } catch (error) {
            setMessage(`Error: ${error}`);

        }
        setOpenDetailModal(true)
    }
    return (
        <main className="mx-9 my-9">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">


                    <div className=" bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thông tin các thông báo</h2>
                            </div>
                            <div className="flex items-center">
                                <Button className='h-10' type="primary" onClick={() => { setOpenModal(true) }}>
                                    Tạo thông báo mới
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-5">

                            <div >

                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">STT</th>
                                            <th className="py-3 px-6 text-left">Tiêu đề thông báo</th>
                                            <th className="py-3 px-6 text-left">Nội dung thông báo</th>
                                            <th className="py-3 px-6 text-left">Thời gian</th>
                                            <th className="py-3 px-6 text-left">Người nhận</th>
                                            <th className="py-3 px-6 text-left">Hành động</th>
                                            <th className="py-3 px-6 text-left">Xóa</th>

                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {notifications.map((user, index) => (
                                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left font-bold">{index + 1}</td>
                                                <td style={{ cursor: 'pointer' }} className="py-3 px-6 text-left font-bold text-cyan-500" onClick={() => showDetailNoti(user)}>{user.title}</td>
                                                <td className="py-3 px-6 text-left font-bold">{user.content}</td>

                                                <td className="py-3 px-6 text-left font-bold">{user.created_at}</td>
                                                <td className="py-3 px-6 text-left font-bold">{user.role_recipient}</td>
                                                <td className="py-3 px-6 text-left font-bold">{<a style={{ cursor: 'pointer' }} onClick={() => changeStatus(user._id, user.status)}>{user.status ? "Tắt" : "Bật"} </a>}</td>
                                                <td className="py-3 px-6 text-left font-bold">{<a style={{ cursor: 'pointer' }} onClick={() => deleteNoti(user._id)}>Xóa </a>}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center mt-3" style={{ justifyContent: 'center', display: 'flex' }}>
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
                        <div className="flex items-center mt-3" style={
                            { justifyContent: 'center', display: 'flex' }
                        }>

                        </div>
                    </div>
                </div>

                {/* Notifications Panel */}
                <div className="bg-gray-100 rounded-lg shadow-md p-6 col-span-1">
                    <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-5">
                        <h2 className="text-2xl font-bold mb-4 flex items-center bord">
                            Gửi thông báo
                        </h2>
                        <ul className="space-y-2">
                            <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUsers className="mr-3" /> General User</li>
                            <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUserCog className="mr-3" /> Corporate User</li>
                            <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUserCog className="mr-3" />Traffic Authority</li>
                        </ul>
                    </div >
                    <div className="bg-gray-100 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            Cần sự trợ giúp
                        </h2>
                        <div className="flex items-center bg-white justify-center border p-4 shadow-md">
                            <div className="mr-3">
                                <img className="w-16 h-16" src="/introduction.svg"></img>
                            </div>
                            <div>
                                <h1 className="text-blue-900">Bắt đầu với ClearWay</h1>
                                <h1>Nhấn vào để tải về máy</h1>
                                <Link>Hướng dẫn sử dụng</Link>
                            </div>
                        </div>
                        <div className="flex items-center mt-5 bg-white justify-center border p-4 shadow-md">
                            <div className="mr-3">
                                <img className="w-16 h-16" src="/introduction.svg"></img>
                            </div>
                            <div>
                                <h1 className="text-blue-900">Lưu ý sử dụng hệ thống</h1>
                                <Link>Nhấn vào để xem</Link>
                            </div>
                        </div>
                        <div className="flex items-center mt-5 bg-white justify-center border p-4 shadow-md">
                            <div>
                                <h1 className="text-xl font-bold text-blue-800">Liên hệ hỗ trợ kỹ thuật: </h1>
                                <h1 className="text-blue-900 flex items-center mt-3"><MdEmail className="mr-3 text-blue-700" />clearwaytms@gmail.com</h1>
                                <h1 className="text-blue-900 flex items-center mt-3"><IoCallSharp className="mr-3 text-blue-600" />+84 332101033</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
                <Modal.Header className='font-bold' style={{ textAlign: 'right' }}>Tạo thông báo</Modal.Header>
                <Modal.Body style={{ margin: '20px' }}>
                    <div style={{ maxWidth: 600 }}>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Tiêu đề</label>
                            <TextInput
                                name='title'
                                value={formData.title}
                                onChange={handleChange} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Thời gian gửi thông báo</label>
                            <TextInput value={getCurrentTime()}
                                readOnly
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Người nhận</label>
                            <Select value={formData.role_recipient}
                                name='role_recipient'
                                onChange={handleChange}>
                                <option value={1}>General User</option>
                                <option value={2}>CorporateUser User</option>
                            </Select>
                        </div>
                        <div className='mb-6'>
                            <Label htmlFor='description' value='Mô tả' />
                            <Textarea id='description' name='content' value={formData.content}
                                onChange={handleChange} />
                        </div>
                        <div className="flex gap-6" style={{ justifyContent: 'center' }}>
                            <Button className='w-1/2' color="failure" onClick={() => setOpenModal(false)}>
                                Hủy
                            </Button>
                            <Button className='w-1/2' onClick={() => submitNoti()}>
                                Gửi thông báo
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={openDetailModal} size="xl" onClose={() => setOpenDetailModal(false)} popup>
                <Modal.Header className='font-bold' style={{ textAlign: 'right' }}>Cập nhật thông báo</Modal.Header>
                <Modal.Body style={{ margin: '20px' }}>
                    <div style={{ maxWidth: 600 }}>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Tiêu đề</label>
                            <TextInput
                                name='title'
                                value={formDataUpdate.title}
                                onChange={handleChangeUpdate} />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Thời gian gửi thông báo</label>
                            <TextInput value={getCurrentTime()}
                                readOnly
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Người nhận</label>
                            <Select value={formDataUpdate.role_recipient}
                                name='role_recipient'
                                onChange={handleChangeUpdate}>
                                <option value={1}>General User</option>
                                <option value={2}>CorporateUser User</option>
                            </Select>
                        </div>
                        <div className='mb-6'>
                            <Label htmlFor='description' value='Mô tả' />
                            <Textarea id='description' name='content' value={formDataUpdate.content}
                                onChange={handleChangeUpdate} />
                        </div>
                        <div className="flex gap-6" style={{ justifyContent: 'center' }}>
                            <Button className='w-1/2' color="failure" onClick={() => setOpenDetailModal(false)}>
                                Hủy
                            </Button>
                            <Button className='w-1/2' onClick={() => updateNoti(formDataUpdate._id)}>
                                Cập nhật thông báo
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </main>
    )
}
export default ManageNotification
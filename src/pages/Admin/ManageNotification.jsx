import { FaUserCog, FaUsers } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";
import { Button, Modal, TextInput, Pagination, Label, Textarea } from "flowbite-react";
import { useEffect, useState } from 'react';
import { getusers } from '../../service/UserAPI';

const ManageNotification = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

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
    const userDataTabs = [
        {
            value: "generalUser",
            label: "",
            data: [
                { id: 1, title: "Cập nhật vị trí của bạn", content: "Ứng dụng đang theo dõi vị trí của bạn để cung cấp chỉ đường", time: "12:10 20/09/2024", role: "General User", activity: "Bật" },
                { id: 2, title: "Yêu cầu cấp quyền truy cập", content: "Google Maps cần quyền truy cập vị trí của bạn để cung cấp chỉ đường theo thời gian thực và gợi ý địa điểm gần nhất.", time: "09:30 21/09/2024", role: "Corporate User", activity: "Tắt" },
                { id: 3, title: "Điều kiện giao thông thay đổi", content: "Có kẹt xe phía trước.", time: "17:50 15/09/2024", role: "Corporate User", activity: "Bật" },
                { id: 4, title: "Tuyến đường của bạn đã được cập nhật", content: "Chúng tôi đã tìm thấy tuyến đường nhanh hơn dựa trên tình hình giao thông hiện tại.", time: "20:50 30/10/2024", role: "Corporate User", activity: "Bật" },
                { id: 5, title: "Khám phá địa điểm mới!", content: "Google Maps đã cập nhật thêm các nhà hàng, điểm du lịch và dịch vụ mới gần vị trí của bạn.", time: "23:50 30/10/2024", role: "General User", activity: "Bật" },
                { id: 6, title: "Cảnh báo pin yếu", content: "Pin của bạn đang yếu, ứng dụng sẽ tạm dừng cập nhật vị trí để tiết kiệm pin.", time: "12:50 29/10/2024", role: "General User", activity: "Bật" },
                { id: 7, title: "Cảnh báo thời tiết nguy hiểm", content: "Chúng tôi thấy bạn đã tìm kiếm địa điểm [Tên Địa Điểm] trước đó.", time: "14:50 25/10/2024", role: "General User", activity: "Bật" },
                { id: 8, title: "Hệ thống đang chờ sửa lỗi ", content: "Đang sửa lỗi", time: "00:00 25/10/2024", role: "General User", activity: "Bật" },
                { id: 9, title: "Tài khoản đã thanh toán thành công", content: "Giao dịch thành công", time: "13:23 24/10/2024", role: "Corporate User", activity: "Bật" },
                { id: 10, title: "Hệ thống bảo trì", content: "Thời gian bảo trì là 2 giờ", time: "23:59 10/10/2024", role: "Corporate User", activity: "Bật" },


            ]
        },

    ]

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
                            {userDataTabs.map((tab) => (
                                <div key={tab.value}>
                                    <h2>{tab.label}</h2>
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                <th className="py-3 px-6 text-left">Id</th>
                                                <th className="py-3 px-6 text-left">Tiêu đề thông báo</th>
                                                <th className="py-3 px-6 text-left">Nội dung thông báo</th>
                                                <th className="py-3 px-6 text-left">Thời gian</th>
                                                <th className="py-3 px-6 text-left">Người nhận</th>
                                                <th className="py-3 px-6 text-left">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm font-light">
                                            {tab.data.map((user) => (
                                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left font-bold">{user.id}</td>
                                                    <td className="py-3 px-6 text-left font-bold">{user.title}</td>
                                                    <td className="py-3 px-6 text-left font-bold">{user.content}</td>
                                                    <td className="py-3 px-6 text-left font-bold">{user.time}</td>
                                                    <td className="py-3 px-6 text-left text-cyan-300 font-bold">{user.role}</td>
                                                    <td className="py-3 px-6 text-left font-bold">{user.activity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
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
                            <TextInput />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Thời gian gửi thông báo</label>
                            <TextInput />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Người nhận</label>
                            <TextInput />
                        </div>
                        <div className='mb-6'>
                            <Label htmlFor='description' value='Mô tả' />
                            <Textarea id='description' />
                        </div>
                        <div className="flex gap-6" style={{ justifyContent: 'center' }}>
                            <Button className='w-1/2' color="failure" onClick={() => setOpenModal(false)}>
                                Hủy
                            </Button>
                            <Button className='w-1/2' type="submit">
                                Gửi thông báo
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </main>
    )
}
export default ManageNotification
import { Modal, TextInput, Pagination, Button, Label, Textarea, ToggleSwitch } from "flowbite-react";
import { getusers } from "../../service/UserAPI";
import { useEffect, useState } from "react";
    const ManageReport = () => {
    const [activeTab] = useState("generalUser")
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
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
            label: "Danh Sách General User",
            data: [
                { id: 1, time: "20:00 20/09/2024", role: "General User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 2, time: "20:00 20/09/2024", role: "General User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 3, time: "20:00 20/09/2024", role: "General User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 4, time: "20:00 20/09/2024", role: "General User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },


            ]
        },
        {
            value: "corporateUser",
            label: "Danh Sách Corporate User",
            data: [
                { id: 1, time: "20:00 20/09/2024", role: "Corporate User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 2, time: "20:00 20/09/2024", role: "Corporate User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 3, time: "20:00 20/09/2024", role: "Corporate User", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
            ]
        },
        {
            value: "trafficAuthoriry",
            label: "Danh Sách Traffic Authority",
            data: [
                { id: 1, time: "20:00 20/09/2024", role: "Traffic Authority", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 2, time: "20:00 20/09/2024", role: "Traffic Authority", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 3, time: "20:00 20/09/2024", role: "Traffic Authority", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
            ]
        },
        {
            value: "adminUser",
            label: "Danh Sách Admin",
            data: [
                { id: 1, time: "20:00 20/09/2024", role: "Admin", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 2, time: "20:00 20/09/2024", role: "Admin", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
                { id: 3, time: "20:00 20/09/2024", role: "Admin", Address: "Điện Biên Phủ", Title: "Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy", Detail: "Ngập nước nặng" },
            ]
        },
    ]

    const [openModal, setOpenModal] = useState(false);
    const [openModalNguoiDung, setOpenModalNguoiDung] = useState(false);
    

    return (
        <main className="mx-9 my-9">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <div className=" bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thông tin báo cáo trạng thái giao thông</h2>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-2 px-2 text-left">Thời gian báo cáo</th>
                                        <th className="py-2 px-2 text-left">Báo cáo bởi</th>
                                        <th className="py-2 px-2 text-left">Tuyến đường báo cáo</th>
                                        <th className="py-2 px-2 text-left">Mô tả của báo cáo</th>
                                        <th className="py-2 px-2 text-left">Tình trạng giao thông</th>
                                        <th className="py-2 px-2 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {userDataTabs.find(tab => tab.value === activeTab).data.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-2 px-2 text-left font-bold">20:00 20/09/2024</td>
                                            <td className="py-2 px-2 text-left font-bold">General User</td>
                                            <td className="py-2 px-2 text-left font-bold">Điện Biên Phủ</td>
                                            <td className="py-2 px-2 text-left font-bold">Đoạn đường ngập nặng do lượng mưa nhiều , xe đi qua chết máy</td>
                                            <td className="py-2 px-2 text-left text-blue-500 font-bold">Ngập nước nặng</td>
                                            <td className="py-2 px-2 text-left cursor-pointer"><Button type="primary" onClick={() => { setOpenModal(true) }} >Edit</Button></td>
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
                </div>
                <div className="col-span-1">
                    <div className=" bg-white rounded-lg shadow-md p-6" style={{ minHeight: '95%' }}>
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thông tin báo cáo từ người dùng</h2>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-5">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                        <th className="py-2 px-2 text-left">Tuyến đường báo cáo</th>
                                        <th className="py-2 px-2 text-left">Tình trạng giao thông</th>
                                        <th className="py-2 px-2 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {userDataTabs.find(tab => tab.value === activeTab).data.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-2 px-2 text-left font-bold">Điện Biên Phủ(Tuyến 2)</td>
                                            <td className="py-2 px-2 text-red-500 font-bold">Tắt đường nặng</td>
                                            <td className="py-2 px-2 text-left font-normal"><Button type="primary" onClick={() => { setOpenModalNguoiDung(true) }} >Edit</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header className='font-bold px-10' style={{ textAlign: 'right' }}>Cập nhật báo cáo trạng thái giao thông</Modal.Header>
                            <Modal.Body className="space-y-6" style={{ margin: '20px' }}>
                                <div className="px-4">
                                    <div style={{ marginBottom: '16px' }}>
                                        <label>Tuyến đường báo cáo</label>
                                        <TextInput />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label>Tình trạng giao thông</label>
                                        <TextInput />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label>Báo cáo bởi</label>
                                        <TextInput />
                                    </div>
                                    <div className="flex justify-between gap-6">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Thời gian' />
                                            <TextInput />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Dữ liệu hệ thống' />
                                            <ToggleSwitch className="mt-3" checked={switch1} onChange={setSwitch1} />
                                        </div>
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Mô tả báo cáo' />
                                        <Textarea id='description' />
                                    </div>
                                    <div className="flex" style={{ justifyContent: 'space-evenly', margin: '0 20%' }}>
                                        <Button color="failure" onClick={() => setOpenModal(false)}>
                                            Hủy
                                        </Button>
                                        <Button type="submit">
                                            Cập nhật
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Modal className="" show={openModalNguoiDung} size="3xl" onClose={() => setOpenModalNguoiDung(false)} popup>
                            <Modal.Header className='font-bold' style={{ textAlign: 'right' }}>Xác nhận thông tin báo cáo từ người dùng</Modal.Header>
                            <Modal.Body className="space-y-6" style={{ margin: '20px' }}>
                                <div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Tuyến đường báo cáo' />
                                        <TextInput id='description' />
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Báo cáo bởi' />
                                        <TextInput id='description' />
                                    </div>
                                    <div className="flex gap-6 justify-between">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Tình trạng giao thông từ báo cáo người dùng' />
                                            <TextInput id='description' />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Tình trạng giao thông hiện tại' />
                                            <TextInput id='description' />
                                        </div>
                                    </div>
                                    <div className="flex gap-6 justify-between">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Thời gian' />
                                            <TextInput id='description' />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Dữ liệu hệ thống (Tắt khi xác nhận)' />
                                            <ToggleSwitch className="mt-3" checked={switch2} onChange={setSwitch2} />
                                        </div>
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Mô tả báo cáo' />
                                        <Textarea id='description' />
                                    </div>
                                    <div className="flex" style={{ justifyContent: 'space-evenly', margin: '0 20%' }}>
                                        <Button color="failure" onClick={() => setOpenModalNguoiDung(false)}>
                                            Từ chối
                                        </Button>
                                        <Button type="submit">
                                            Xác nhận
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>
        </main>
    )
};
export default ManageReport
import React, { useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Button, Modal, TextInput, Label } from "flowbite-react";

const ManagePayments = () => {

    const [openModalPackage, setOpenModalPackage] = useState(false);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [isEditPackage, setIsEditPackage] = useState(false);

    // Sample data
    const userDataTabs = [
        {
            value: "upgradePackages",
            label: "Danh sách các gói nâng cấp",
            data: [
                {
                    id: 1,
                    createdDate: "20/11/2023",
                    packageName: "Hàng tháng",
                    description: "Bao gồm các tính năng như phân tích dữ liệu giao thông chi tiết, dự báo lưu lượng giao thông, và tích hợp với các hệ thống quản lý giao thông khác. ",
                    timeOfPackage: 1,
                    priceOfPackage: 150,
                },
                {
                    id: 2,
                    createdDate: "20/11/2023",
                    packageName: "Hàng quý",
                    description: "Bao gồm các tính năng như phân tích dữ liệu giao thông chi tiết, dự báo lưu lượng giao thông, và tích hợp với các hệ thống quản lý giao thông khác. ",
                    timeOfPackage: 1,
                    priceOfPackage: 150.000,
                },
                {
                    id: 3,
                    createdDate: "20/11/2023",
                    packageName: "Hàng năm",
                    description: "Bao gồm các tính năng như phân tích dữ liệu giao thông chi tiết, dự báo lưu lượng giao thông, và tích hợp với các hệ thống quản lý giao thông khác. ",
                    timeOfPackage: 1,
                    priceOfPackage: 150,
                },
                {
                    id: 4,
                    createdDate: "20/11/2023",
                    packageName: "Hàng tháng",
                    description: "Bao gồm các tính năng như phân tích dữ liệu giao thông chi tiết, dự báo lưu lượng giao thông, và tích hợp với các hệ thống quản lý giao thông khác. ",
                    timeOfPackage: 2,
                    priceOfPackage: 150,
                },
                {
                    id: 5,
                    createdDate: "20/11/2023",
                    packageName: "Hàng tháng",
                    description: "Bao gồm các tính năng như phân tích dữ liệu giao thông chi tiết, dự báo lưu lượng giao thông, và tích hợp với các hệ thống quản lý giao thông khác. ",
                    timeOfPackage: 5,
                    priceOfPackage: 230.000,
                }
            ]
        },
        {
            value: "upgradeUsers",
            label: "Danh sách tài khoản nâng cấp",
            data: [
                {
                    createdDate: "20/11/2023",
                    fullName: "Đặng duy bảo",
                    email: "duybao@gmail.com",
                    phoneNumber: "033201054",
                    code: "434324234",
                    nameOfPackage: "Hàng tháng",
                    statusTransaction: "Hết hạn"
                },
                {
                    createdDate: "20/11/2023",
                    fullName: "Hồ chí cường",
                    email: "chicuong@gmail.com",
                    phoneNumber: "033655054",
                    code: "434324544",
                    nameOfPackage: "Hàng năm",
                    statusTransaction: "Đang hoạt động"
                },
                {
                    createdDate: "20/11/2023",
                    fullName: "Đặng duy bảo 1",
                    email: "duybao@gmail.com",
                    phoneNumber: "033201054",
                    code: "434324234",
                    nameOfPackage: "Hàng tháng",
                    statusTransaction: "Hết hạn"
                },
                {
                    createdDate: "20/11/2023",
                    fullName: "Đặng duy bảo 2",
                    email: "duybao@gmail.com",
                    phoneNumber: "033201054",
                    code: "434324234",
                    nameOfPackage: "Hàng tháng",
                    statusTransaction: "Hết hạn"
                }
            ]
        }
    ]
    const [activeTab, setActiveTab] = useState("upgradePackages")

    const handleTabChange = (tabValue) => {
        setActiveTab(tabValue)
    }

    const handleAddNewPackage = () => {
        setIsEditPackage(false);
        setOpenModalPackage(true);
    };

    const handleEditPackage = () => {
        setIsEditPackage(true);
        setOpenModalPackage(true);
    };

    const handleEditUser = () => {
        setOpenModalUser(true);
    }

    const handleDelete = (uid) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa gói nâng cấp này?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                Swal.fire("Đã xóa!", "Gói nâng cấp đã được xóa.", "success");
            }
        });
    };
    return (
        <main className="mx-9 my-9">
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-2">Thông tin thanh toán</h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button onClick={handleAddNewPackage} gradientDuoTone="purpleToBlue" outline>
                            Tạo gói nâng cấp tài khoản
                        </Button>
                        <Button gradientDuoTone="purpleToBlue" outline>
                            Tải danh sách
                        </Button>
                    </div>
                </div>
                <div className="mb-4 mt-5">
                    {userDataTabs.map((tab) => (
                        <button
                            key={tab.value}
                            className={`mr-2 px-2 mb-2 py-3 text-sm rounded ${activeTab === tab.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabChange(tab.value)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    {activeTab === "upgradePackages" && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-2 px-2 text-left">ID</th>
                                    <th className="py-2 px-2 text-left">Ngày tạo</th>
                                    <th className="py-2 px-2 text-left">Tên gói nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Mô tả</th>
                                    <th className="py-2 px-2 text-left">Thời gian nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Giá tiền</th>
                                    <th className="py-2 px-2 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-950 text-sm font-light">
                                {userDataTabs.find(tab => tab.value === activeTab).data?.map((pg) => (
                                    <tr key={pg.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.id}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.createdDate}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.packageName}</td>
                                        <td className="py-1 px-2 text-left">{pg.description}</td>
                                        <td className="py-1 px-2 text-left">{pg.timeOfPackage} Tháng</td>
                                        <td className="py-1 px-2 text-left">{pg.priceOfPackage}</td>
                                        <td className="py-1 px-2 flex space-x-4 justify-center items-center mt-5">
                                            <button onClick={handleEditPackage} className="w-6 h-6 text-black"><FaRegEdit /></button>
                                            <button onClick={() => handleDelete(pg.id)} className="w-6 h-6 text-red-600"><MdDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {activeTab === "upgradeUsers" && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-2 px-2 text-left">Mã đơn hàng</th>
                                    <th className="py-2 px-2 text-left">Ngày nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Họ và tên</th>
                                    <th className="py-2 px-2 text-left">Email</th>
                                    <th className="py-2 px-2 text-left">Số điện thoại</th>
                                    <th className="py-2 px-2 text-left">Tên gói nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Trạng thái thanh toán</th>
                                    <th className="py-2 px-2 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-950 text-sm font-light">
                                {userDataTabs.find(tab => tab.value === activeTab).data?.map((user) => (
                                    <tr key={user.code} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.code}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.createdDate}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.fullName}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.email}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.phoneNumber}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{user.nameOfPackage}</td>
                                        <td className={`py-1 px-2 text-left whitespace-nowrap ${user.statusTransaction === "Hết hạn" ? "text-red-600" : "text-green-700"}`}>{user.statusTransaction}</td>
                                        <td className="py-1 px-2 flex space-x-4 justify-center items-center mt-5">
                                            <button onClick={handleEditUser} className="w-6 h-6 text-black"><FaRegEdit /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            {/* Modal package*/}
            <Modal show={openModalPackage} onClose={() => setOpenModalPackage(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEditPackage ? "Cập nhật gói nâng cấp" : "Tạo gói nâng cấp"}</p>
                </Modal.Header>

                <Modal.Body >
                    <form className="bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="namePackage" value="Tên gói nâng cấp" />
                                    <TextInput
                                        id="namePackage"
                                        placeholder="Nhập tên gói nâng cấp"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="timeOfPackage" value="Thời gian gói nâng cấp" />
                                    <TextInput
                                        id="timeOfPackage"
                                        placeholder="Nhập thời gian gói nâng cấp"
                                        type="number"
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="price" value="Giá tiền" />
                                    <TextInput
                                        id="price"
                                        placeholder="Nhập giá tiền"
                                        type="number"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Label htmlFor="discription" value="Mô tả gói nâng cấp" />
                            <TextInput
                                id="discription"
                                placeholder="Nhập mô tả"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center space-x-5">
                        <Button onClick={() => setOpenModalPackage(false)}>{isEditPackage ? "Update" : "Create"}</Button>
                        <Button className="bg-red-500 text-white" onClick={() => setOpenModalPackage(false)}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            {/* Modal user*/}
            <Modal show={openModalUser} onClose={() => setOpenModalUser(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Cập nhật tài khoản người dùng thanh toán</p>
                </Modal.Header>
                <Modal.Body >
                    <form className="bg-white">
                        <div>
                            <Label htmlFor="fullName" value="Họ và Tên" />
                            <TextInput
                                id="fullName"
                                placeholder="Nhập họ và tên"
                                readOnly
                            />
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                placeholder="Nhập email"
                                readOnly
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="phoneNumber" value="Số điện thoại" />
                                    <TextInput
                                        id="phoneNumber"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="timeOfUpgrade" value="Thời gian nâng cấp" />
                                    <TextInput
                                        id="timeOfUpgrade"
                                        placeholder="Nhập thời gian nâng cấp"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="code" value="Mã đơn hàng" />
                                    <TextInput
                                        id="code"
                                        placeholder="Nhập mã đơn hàng"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="nameOfPackage" value="Tên gói nâng cấp" />
                                    <TextInput
                                        id="nameOfPackage"
                                        placeholder="Nhập tên gói nâng cấp"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center space-x-5">
                        <Button onClick={() => setOpenModalUser(false)}>Update</Button>
                        <Button className="bg-red-500 text-white" onClick={() => setOpenModalUser(false)}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </main>
    )
}
export default ManagePayments
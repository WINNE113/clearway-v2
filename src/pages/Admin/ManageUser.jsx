import React, { useState } from "react"
import { FaRegEdit, FaLockOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Button, Modal, TextInput, Label, Dropdown } from "flowbite-react";
import { CiCircleRemove } from "react-icons/ci";

const ManageUser = () => {
    const [openModalUser, setOpenModalUser] = useState(false);
    const [openModalAuthority, setOpenModalAuthority] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Sample data
    const userDataTabs = [
        {
            value: "allUsers",
            label: "Danh sách Tất Cả",
            data: [
                { id: 1, image: "/user.svg", fullName: "BabaYaga (WIN)", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Admin", dob: "18/09/2001", sex: "Nam", status: "Ban", activity: "Cập nhật" },
                { id: 2, image: "/user.svg", fullName: "Ngyễn Công Vinh", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Traffic Authority", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 3, image: "/user.svg", fullName: "Nguyễn Văn A", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "User", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" }
            ]
        },
        {
            value: "generalDaUser",
            label: "Danh Sách General User",
            data: [
                { id: 1, image: "/user.svg", fullName: "BabaYaga (WIN)", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Admin", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 2, image: "/user.svg", fullName: "Ngyễn Công Vinh", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Traffic Authority", dob: "18/09/2001", sex: "Nam", status: "Ban", activity: "Cập nhật" },
                { id: 3, image: "/user.svg", fullName: "Nguyễn Văn A", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "User", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" }
            ]
        },
        {
            value: "corporateUser",
            label: "Danh Sách Corporate User",
            data: [
                { id: 1, image: "/user.svg", fullName: "BabaYaga (WIN)", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Admin", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 2, image: "/user.svg", fullName: "Ngyễn Công Vinh", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Traffic Authority", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 3, image: "/user.svg", fullName: "Nguyễn Văn A", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "User", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" }
            ]
        },
        {
            value: "trafficAuthoriry",
            label: "Danh Sách Traffic Authority",
            data: [
                { id: 2, image: "/user.svg", fullName: "Ngyễn Công Vinh", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Traffic Authority", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 2, image: "/user.svg", fullName: "Ngyễn Công Vinh", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Traffic Authority", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" }


            ]
        },
        {
            value: "adminUser",
            label: "Danh Sách Admin",
            data: [
                { id: 1, image: "/user.svg", fullName: "BabaYaga (WIN)", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Admin", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" },
                { id: 1, image: "/user.svg", fullName: "BabaYaga (WIN)", email: "babayaga@gmail.com", phoneNumber: "033201024", role: "Admin", dob: "18/09/2001", sex: "Nam", status: "Active", activity: "Cập nhật" }
            ]
        }
    ]

    const [activeTab, setActiveTab] = useState("allUsers")

    const handleEditUser = () => {
        setOpenModalUser(true);
    }

    const handleAddAuthority = () => {
        setOpenModalAuthority(true);
    }

    const handleTabChange = (tabValue) => {
        setActiveTab(tabValue)
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setSelectedImage(event.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleRemoveImage = () => {
        setSelectedImage(null)
        // Reset the file input
        const fileInput = document.getElementById('image-upload')
        if (fileInput) {
            fileInput.value = ''
        }
    }

    const handleBanUser = (uid) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn cấm người dùng này?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ban",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                Swal.fire("Đã xóa!", "Đã cấm tài khoản người dùng.", "success");
            }
        });
    };

    const handleUnBanUser = (uid) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn mở cấm người dùng này?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "UnBan",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion
                Swal.fire("Đã xóa!", "Tài khoản người dùng đã hoạt động.", "success");
            }
        });
    };


    return (
        <main className="mx-9 my-9">
            <div className=" bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                    <div>
                        <h2 className="text-lg font-bold mb-2">Thông tin người dùng</h2>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button onClick={handleAddAuthority} gradientDuoTone="purpleToBlue" outline>
                            Tạo tài khoản Traffic Authority
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
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-2 px-2 text-left">Ngày tạo</th>
                                <th className="py-2 px-2 text-left">Hình ảnh</th>
                                <th className="py-2 px-2 text-left">Họ và Tên</th>
                                <th className="py-2 px-2 text-left">Email</th>
                                <th className="py-2 px-2 text-left">Số điện thoại</th>
                                <th className="py-2 px-2 text-left">Vai trò</th>
                                <th className="py-2 px-2 text-left">Ngày sinh</th>
                                <th className="py-2 px-2 text-left">Giới tính</th>
                                <th className="py-2 px-2 text-left">Tình trạng</th>
                                <th className="py-2 px-2 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-950 text-sm font-light">
                            {userDataTabs.find(tab => tab.value === activeTab).data?.map((user) => (
                                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-1 px-2 text-left whitespace-nowrap">{user.dob}</td>
                                    <td className="py-1 px-2 text-left whitespace-nowrap">
                                        <img src={user.image} className="w-12 h-12" />
                                    </td>
                                    <td className="py-1 px-2 text-left whitespace-nowrap">{user.fullName}</td>
                                    <td className="py-1 px-2 text-left">{user.email}</td>
                                    <td className="py-1 px-2 text-left">{user.phoneNumber}</td>
                                    <td className="py-1 px-2 text-left">{user.role}</td>
                                    <td className="py-1 px-2 text-left">{user.dob}</td>
                                    <td className="py-1 px-2 text-left">{user.sex}</td>
                                    <td className="py-1 px-2 text-left">{user.status}</td>
                                    <td className="py-1 px-2 flex space-x-4 justify-center items-center mt-5">
                                        <button onClick={handleEditUser} className="w-6 h-6 text-black"><FaRegEdit /></button>
                                        <button onClick={user.status === "Active" ? () => { handleBanUser(user.id) } : () => { handleUnBanUser(user.id) }} className="w-6 h-6 text-red-600">
                                            {user.status === "Active" ? <MdDelete size={20} /> : <FaLockOpen size={20} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal update user*/}
            <Modal show={openModalUser} onClose={() => setOpenModalUser(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Cập nhật thông tin người dùng</p>
                </Modal.Header>
                <Modal.Body >
                    <form className="bg-white">
                        <div>
                            <Label htmlFor="fullName" value="Họ và Tên" />
                            <TextInput
                                id="fullName"
                                placeholder="Nhập họ và tên"
                            />
                        </div>
                        <div className="mt-5">
                            <Label htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                placeholder="Nhập email"
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
                                    <Label htmlFor="dob" value="Ngày sinh" />
                                    <TextInput
                                        id="dob"
                                        placeholder="Nhập ngày sinh của bạn"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="role" value="Vai trò" />
                                    <TextInput
                                        id="role"
                                        placeholder="Nhập vai trò của bạn"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="sex" value="Giới tính" />
                                    <div className="mt-2 space-x-6">
                                        <label className="inline-flex items-center">
                                            <TextInput
                                                type="radio"
                                                name="sex"
                                                value="male"
                                                className="form-radio text-indigo-600"
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <TextInput
                                                type="radio"
                                                name="sex"
                                                value="female"
                                                className="form-radio text-indigo-600"
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                    </div>
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
            {/* Modal traffic authority */}
            <Modal show={openModalAuthority} onClose={() => setOpenModalAuthority(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Tạo tài khoản Traffic Authority</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col justify-center items-center'>
                                {selectedImage && (
                                    <div className="mt-4 w-32 h-32 relative">
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-max object-cover h-max rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-0 right-0 mt-1 mr-1 bg-white text-red-600"
                                            onClick={handleRemoveImage}
                                            aria-label="Remove image"
                                        >
                                            <CiCircleRemove className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                                <div className='mt-5'>
                                    <TextInput
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm border border-white rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-300 dark:placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div>
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
                                            <Label htmlFor="dob" value="Ngày sinh" />
                                            <TextInput
                                                id="dob"
                                                placeholder="Nhập ngày sinh của bạn"
                                                type="date"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col space-y-5">
                                        <div>
                                            <Label htmlFor="role" value="Vai trò" />
                                            <TextInput
                                                id="role"
                                                placeholder="Nhập vai trò của bạn"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="sex" value="Giới tính" />
                                            <div className="mt-2 space-x-6">
                                                <label className="inline-flex items-center">
                                                    <TextInput
                                                        type="radio"
                                                        name="sex"
                                                        value="male"
                                                        className="form-radio text-indigo-600"
                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <TextInput
                                                        type="radio"
                                                        name="sex"
                                                        value="female"
                                                        className="form-radio text-indigo-600"
                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center space-x-5">
                        <Button onClick={() => setOpenModalAuthority(false)}>Create</Button>
                        <Button className="bg-red-500 text-white" onClick={() => setOpenModalAuthority(false)}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </main >
    )
}
export default ManageUser
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Pagination, Button, Modal, TextInput, Label, Dropdown } from "flowbite-react";
import Swal from "sweetalert2";


const ManageCameras = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cameraStatus, setCameraStatus] = useState("");


    const [openModal, setOpenModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const onPageChange = (page) => setCurrentPage(page);

    const handleAddNew = () => {
        setIsEdit(false);
        setOpenModal(true);
    };

    const handleEdit = () => {
        setIsEdit(true);
        setOpenModal(true);
    };

    const handleDropdownSelect = (status) => {
        setCameraStatus(status);
    };
    const cameras = [
        {
            id: "Cam - 1",
            streetName: "Đường A",
            coordinates: "1234",
            status: "Hoạt động",
            linkConnected: "https://wwww.example.cam1.com"
        },
        {
            id: "Cam - 2",
            streetName: "Đường B",
            coordinates: "1234",
            status: "Không hoạt động",
            linkConnected: "https://wwww.example.cam2.com"
        },
        {
            id: "Cam - 3",
            streetName: "Đường C",
            coordinates: "1234",
            status: "Hoạt động",
            linkConnected: "https://wwww.example.cam3.com"
        },
        {
            id: "Cam - 4",
            streetName: "Đường D",
            coordinates: "1234",
            status: "Không hoạt động",
            linkConnected: "https://wwww.example.cam4.com"
        },
    ]


    const handleDelete = (rid) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa biển báo này?",
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
                Swal.fire("Đã xóa!", "Biển báo đã được xóa.", "success");
            }
        });
    };
    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <div className=" bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Danh sách các Camera</h2>
                            </div>
                            <div className="flex items-center h-10">
                                <Button onClick={handleAddNew}>
                                    <IoMdAdd size={20} className="text-white" />Add New
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">CamID</th>
                                        <th className="py-3 px-6 text-left">Tuyến đường</th>
                                        <th className="py-3 px-6 text-left">Tọa độ</th>
                                        <th className="py-3 px-6 text-left">Tình trạng</th>
                                        <th className="py-3 px-6 text-left">Liên kết</th>
                                        <th className="py-3 px-6 text-left">Cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-950 text-sm font-light">
                                    {cameras.map((camera) => (
                                        <tr key={camera.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{camera.id}</td>
                                            <td className="py-3 px-6 text-left">{camera.streetName}</td>
                                            <td className="py-3 px-6 text-left">{camera.coordinates}</td>
                                            <td className="py-3 px-6 text-left">{camera.status}</td>
                                            <td className="py-3 px-6 text-left">{camera.linkConnected}Km</td>
                                            <td className="py-3 px-6 flex space-x-4 justify-center items-center">
                                                <FaRegEdit onClick={handleEdit} size={20} />
                                                <MdDelete className="text-red-500" onClick={() => handleDelete(camera.id)} size={20} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto justify-end sm:justify-center">
                        <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-3 mb-5 flex flex-col justify-center items-center">
                        <div>
                            <p className='mb-5 text-lg font-bold'>Tổng số camera</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-500">
                                    42
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md p-3 mb-5 flex flex-col justify-center items-center">
                        <div>
                            <p className='mb-5 text-lg font-bold'>Hoạt động</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-green-500 flex items-center justify-center text-lg font-bold text-green-500">
                                    423
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md p-3 mb-5 flex flex-col justify-center items-center">
                        <div>
                            <p className='mb-5 text-lg font-bold'>Không hoạt động</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-red-700 flex items-center justify-center text-lg font-bold text-red-700">
                                    422
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEdit ? "Cập nhật camera" : "Tạo camera"}</p>
                </Modal.Header>

                <Modal.Body >
                    <form className="bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="camID" value="CamID" />
                                    <TextInput
                                        id="camID"
                                        placeholder="Nhập ID"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="coordinates" value="Tọa Độ" />
                                    <TextInput
                                        id="coordinates"
                                        placeholder="Nhập tọa độ"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="streetName" value="Tuyến đường" />
                                    <TextInput
                                        id="streetName"
                                        placeholder="Nhập tuyến đường"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="status" value="Tình trạng" />
                                    <div className="flex">
                                        <TextInput
                                            id="status"
                                            placeholder="Tình trạng đã chọn"
                                            value={cameraStatus}
                                            readOnly
                                        />
                                        <Dropdown>
                                            <Dropdown.Item onClick={() => handleDropdownSelect("Hoạt động")}>
                                                Hoạt động
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSelect("Không hoạt động")}>
                                                Không hoạt động
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Label htmlFor="link" value="Liên kết" />
                            <TextInput
                                id="link"
                                placeholder="Nhập liên kết"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center space-x-5">
                        <Button onClick={() => setOpenModal(false)}>{isEdit ? "Update" : "Create"}</Button>
                        <Button className="bg-red-500 text-white" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

        </main>
    )
}

export default ManageCameras
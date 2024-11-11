import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
const ManageRoutes = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const routers = [
        {
            id: 1,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Bình thường"
        },
        {
            id: 2,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Tắt đường"
        },
        {
            id: 3,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Ngập nước"
        },
        {
            id: 4,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Tai nạn giao thông"
        }
    ];

    const handleAddNew = () => {
        setIsEdit(false);
        setOpenModal(true);
    };

    const handleEdit = () => {
        setIsEdit(true);
        setOpenModal(true);
    };

    const handleDelete = (rid) => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa tuyến đường này?",
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
                Swal.fire("Đã xóa!", "Tuyến đường đã được xóa.", "success");
            }
        });
    };
    return (
        <main className="mx-9 my-9">
            <div className="grid">
                <div className="col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-3">
                        <div className="grid grid-cols-4 gap-2">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 flex flex-col items-center">
                                <h2 className="text-lg font-bold">Tuyến đường</h2>
                                <span className="text-lg font-bold">9</span>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 text-rose-500 flex flex-col items-center">
                                <h2 className="text-lg font-bold">Kẹt xe</h2>
                                <span className="text-lg font-bold">2</span>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 text-orange-600 flex flex-col items-center">
                                <h2 className="text-lg font-bold">Nước gập</h2>
                                <span className="text-lg font-bold">3</span>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 text-red-700 flex flex-col items-center">
                                <h2 className="text-lg font-bold">Tai nạn giao thông</h2>
                                <span className="text-lg font-bold">4</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 mt-10">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thông tin các tuyến đường</h2>
                            </div>
                            <div className="flex items-center h-10">
                                <Button onClick={handleAddNew}>
                                    <IoMdAdd size={20} className="text-white" /> Add New
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">RoadID</th>
                                        <th className="py-3 px-6 text-left">Tên Đường</th>
                                        <th className="py-3 px-6 text-left">Địa điểm bắt đầu</th>
                                        <th className="py-3 px-6 text-left">Địa điểm kết thúc</th>
                                        <th className="py-3 px-6 text-left">Khoảng cách</th>
                                        <th className="py-3 px-6 text-left">Phương tiện</th>
                                        <th className="py-3 px-6 text-left">Thời gian ước tính hoàn thành</th>
                                        <th className="py-3 px-6 text-left">Tình trạng tuyến đường</th>
                                        <th className="py-3 px-6 text-left">Cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-950 text-sm font-light">
                                    {routers.map((router) => (
                                        <tr key={router.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{router.id}</td>
                                            <td className="py-3 px-6 text-left">{router.streetName}</td>
                                            <td className="py-3 px-6 text-left">{router.startAddress}</td>
                                            <td className="py-3 px-6 text-left">{router.endAddress}</td>
                                            <td className="py-3 px-6 text-left">{router.district}Km</td>
                                            <td className="py-3 px-6 text-left">{router.vehicle}</td>
                                            <td className="py-3 px-6 text-left">{router.estimateTime}p</td>
                                            <td className={`py-3 px-6 text-left ${router.trafficStatue === "Tắt đường" ? "text-red-700" : ""}`}>{router.trafficStatue}</td>
                                            <td className="py-3 px-6 text-left flex flex-row space-x-4">
                                                <FaRegEdit onClick={handleEdit} size={20} />
                                                <MdDelete className="text-red-500" onClick={() => handleDelete(router.id)} size={20} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEdit ? "Cập nhật tuyến đường" : "Tạo tuyến đường"}</p>
                </Modal.Header>
                <Modal.Body>
                    <form className="bg-white">
                        <div className="flex flex-col space-y-4">
                            <div>
                                <Label htmlFor="name" value="Tên đường" />
                                <TextInput
                                    id="name"
                                    placeholder="Nhập tên đường"
                                />
                            </div>
                            <div>
                                <Label htmlFor="startAddress" value="Địa điểm bắt đầu" />
                                <TextInput
                                    id="startAddress"
                                    placeholder="Nhập địa điểm bắt đầu"
                                />
                            </div>
                            <div>
                                <Label htmlFor="endAddress" value="Địa điểm kết thúc" />
                                <TextInput
                                    id="endAddress"
                                    placeholder="Nhập địa điểm kết thúc"
                                />
                            </div>
                            <div>
                                <Label htmlFor="transport" value="Phương tiện" />
                                <TextInput
                                    id="transport"
                                    placeholder="Nhập phương tiện di chuyển"
                                />
                            </div>
                            <div>
                                <Label htmlFor="district" value="Khoảng cách" />
                                <TextInput
                                    id="district"
                                    placeholder="Nhập khoảng cách"
                                    type="number"
                                />
                            </div>
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
    );
};

export default ManageRoutes;

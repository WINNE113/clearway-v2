import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Button, Modal, TextInput, Label, Dropdown, Pagination } from "flowbite-react";

const ManageTrafficStatus = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [trafficStatus, setTrafficStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);

    const routers = [
        {
            id: 1,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            jamTime: "7h30 - 9:00",
            level: "Cập nhật",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Bình thường",
            airyTime: "50",

        },
        {
            id: 2,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Tắt đường",
            jamTime: "7h30 - 9:00",
            level: "Cao",
            airyTime: "30",
        },
        {
            id: 3,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Ngập nước",
            jamTime: "7h30 - 9:00",
            level: "Cao",
            airyTime: "10",
        },
        {
            id: 4,
            streetName: "Đường A",
            startAddress: "A",
            endAddress: "C",
            district: "300",
            vehicle: "Xe máy",
            estimateTime: "20",
            trafficStatue: "Tai nạn giao thông",
            jamTime: "4h30 - 10:00",
            level: "Bình thường",
            airyTime: "50",
        }
    ]

    const handleAddNew = () => {
        setIsEdit(false);
        setOpenModal(true);
    };

    const handleEdit = () => {
        setIsEdit(true);
        setOpenModal(true);
    };

    const handleDropdownSelect = (status) => {
        setTrafficStatus(status);
    };

    return (
        <main className="mx-9 my-9">
            <div className="grid">
                <div className="col-span-2">
                    <div className=" bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Thống kê tình trạng giao thông</h2>
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
                                        <th className="py-3 px-6 text-left">RoadID</th>
                                        <th className="py-3 px-6 text-left">Tên Đường</th>
                                        <th className="py-3 px-6 text-left">Địa điểm bắt đầu</th>
                                        <th className="py-3 px-6 text-left">Địa điểm kết thúc</th>
                                        <th className="py-3 px-6 text-left">Khoảng cách</th>
                                        <th className="py-3 px-6 text-left">Khung giờ tắc đường</th>
                                        <th className="py-3 px-6 text-left">Tình trạng tuyến đường</th>
                                        <th className="py-3 px-6 text-left">Mức độ</th>
                                        <th className="py-3 px-6 text-left">Thông thoáng</th>
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
                                            <td className="py-3 px-6 text-left">{router.district}km</td>
                                            <td className="py-3 px-6 text-left">{router.jamTime}</td>
                                            <td className="py-3 px-6 text-left">{router.trafficStatue}</td>
                                            <td className={`py-3 px-6 text-left ${router.level == "Cao" ? "text-red-700" : ""}`}>{router.level}</td>
                                            <td className="py-3 px-6 text-left">{router.airyTime}p</td>
                                            <td className="py-3 px-6 text-left flex space-x-4">
                                                <FaRegEdit onClick={handleEdit} size={20} />
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
            </div>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEdit ? "Cập nhật tình trạng giao thông" : "Tạo tình trạng giao thông"}</p>
                </Modal.Header>

                <Modal.Body >
                    <form className="bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="name" value="Tên đường" />
                                    <TextInput
                                        id="name"
                                        placeholder="Nhập tên đường"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="jamTime" value="Khung giờ tắc đường (Thống kê)" />
                                    <TextInput
                                        id="jamTime"
                                        placeholder="Nhập khung giờ tắt đường"
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
                                    <Label htmlFor="startAddress" value="Địa điểm kết thúc" />
                                    <TextInput
                                        id="endAddress"
                                        placeholder="Nhập địa điểm kết thúc"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1 flex flex-col space-y-5">
                                <div>
                                    <Label htmlFor="trafficStatue" value="Tình trạng tuyến đường (Hiện tại)" />
                                    <TextInput
                                        id="trafficStatue"
                                        placeholder="Nhập tình trạng tuyến đường"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="district" value="Khoảng cách" />
                                    <TextInput
                                        id="district"
                                        placeholder="Nhập khoảng cách"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="airyTime" value="Thông thoáng (Dự kiến)" />
                                    <TextInput
                                        id="airyTime"
                                        placeholder="Nhập thời gian thông thoáng"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="trafficStatue" value="Mức độ (Hiện tại)" />
                                    <div className="flex">
                                        <TextInput
                                            id="trafficStatue"
                                            placeholder="Tình trạng đã chọn"
                                            value={trafficStatus}
                                            readOnly
                                        />
                                        <Dropdown>
                                            <Dropdown.Item onClick={() => handleDropdownSelect("Cập nhật")}>
                                                Cập nhật
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSelect("Trung bình")}>
                                                Trung bình
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDropdownSelect("Cao")}>
                                                Cao
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </div>
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
    )
}

export default ManageTrafficStatus
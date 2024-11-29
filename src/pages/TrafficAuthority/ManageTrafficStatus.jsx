import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Button, Modal, TextInput, Label, Dropdown, Pagination } from "flowbite-react";
import { getDataTraffics, CreateDataTraffics } from "../../service/TrafficStatusAPI";

const ManageTrafficStatus = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [routers, setRouters] = useState([]);
    const [trafficStatus, setTrafficStatus] = useState(""); // Dropdown state
    const [formData, setFormData] = useState({
        streetName: "",
        startAddress: "",
        endAddress: "",
        district: "",
        jamTime: "",
        trafficStatue: "",
        airyTime: "",
        level: "",
    });

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getDataTraffics();
            const formattedData = response.data.map((item) => ({
                id: item._id,
                streetName: item.route?.route_name || "N/A",
                startAddress: item.route?.start_location?.join(", ") || "N/A",
                endAddress: item.route?.end_location?.join(", ") || "N/A",
                district: item.average_speed || "N/A",
                jamTime: item.average_speed || "N/A",
                trafficStatue: item.current_traffic_status || "Unknown",
                level: item.current_traffic_status === "Tắc đường nặng" ? "Cao" : "Thấp",
                airyTime: "N/A",
            }));
            setRouters(formattedData);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
        }
    };

    const handleAddNew = () => {
        setIsEdit(false);
        setFormData({
            streetName: "",
            startAddress: "",
            endAddress: "",
            district: "",
            jamTime: "",
            trafficStatue: "",
            airyTime: "",
            level: "",
        });
        setOpenModal(true);
    };

    const handleEdit = (router) => {
        setIsEdit(true);
        setFormData({
            streetName: router.streetName,
            startAddress: router.startAddress,
            endAddress: router.endAddress,
            district: router.district,
            jamTime: router.jamTime,
            trafficStatue: router.trafficStatue,
            airyTime: router.airyTime,
            level: router.level,
        });
        setTrafficStatus(router.level);
        setOpenModal(true);
    };

    const handleSubmit = async () => {
        try {
            const data = {
                route_name: formData.streetName,
                start_location: formData.startAddress,
                end_location: formData.endAddress,
                average_speed: parseFloat(formData.district),
                current_traffic_status: formData.trafficStatue,
                jamTime: formData.jamTime,
                airyTime: formData.airyTime,
                level: formData.level,

            };

            if (isEdit) {
                console.log("Editing data...", data); // Add update API here if required
            } else {
                await CreateDataTraffics(data);
            }

            await fetchData(); // Refresh table
            setOpenModal(false); // Close modal
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error.message);
        }
    };

    const handleDropdownSelect = (status) => {
        setTrafficStatus(status);
        setFormData((prev) => ({ ...prev, level: status }));
    };

    return (
        <main className="mx-9 my-9">
            <div className="grid">
                <div className="col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-xl font-bold">Thống kê tình trạng giao thông</h2>
                            <Button onClick={handleAddNew}>
                                <IoMdAdd size={20} className="text-white" />Add New
                            </Button>
                        </div>
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">

                                    <th className="py-3 px-6 text-left">Tên Đường</th>
                                    <th className="py-3 px-6 text-left">Địa điểm bắt đầu</th>
                                    <th className="py-3 px-6 text-left">Địa điểm kết thúc</th>
                                    <th className="py-3 px-6 text-left">Khoảng cách</th>
                                    <th className="py-3 px-6 text-left">Khung giờ tắc đường</th>
                                    <th className="py-3 px-6 text-left">Tình trạng</th>
                                    <th className="py-3 px-6 text-left">Mức độ</th>
                                    <th className="py-3 px-6 text-left">Thông thoáng</th>
                                    <th className="py-3 px-6 text-left">Cập nhật</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routers.map((router) => (
                                    <tr key={router.id} className="border-b hover:bg-gray-100">

                                        <td className="py-3 px-6">{router.streetName}</td>
                                        <td className="py-3 px-6">{router.startAddress}</td>
                                        <td className="py-3 px-6">{router.endAddress}</td>
                                        <td className="py-3 px-6">{router.district} km</td>
                                        <td className="py-3 px-6">{router.jamTime}</td>
                                        <td className="py-3 px-6">{router.trafficStatue}</td>
                                        <td className={`py-3 px-6 ${router.level === "Cao" ? "text-red-600" : ""}`}>
                                            {router.level}
                                        </td>
                                        <td className="py-3 px-6">{router.airyTime}p</td>
                                        <td className="py-3 px-6">
                                            <FaRegEdit
                                                onClick={() => handleEdit(router)}
                                                className="text-blue-500 cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={10} // Adjust based on total data
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEdit ? "Cập nhật tình trạng giao thông" : "Tạo tình trạng giao thông"}</p>
                </Modal.Header>
                <Modal.Body>
                    <form className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="streetName" value="Tên đường" />
                            <TextInput
                                id="streetName"
                                placeholder="Nhập tên đường"
                                value={formData.streetName}
                                onChange={(e) => setFormData({ ...formData, streetName: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="jamTime" value="Khung giờ tắc đường" />
                            <TextInput
                                id="jamTime"
                                placeholder="Nhập khung giờ"
                                value={formData.jamTime}
                                onChange={(e) => setFormData({ ...formData, jamTime: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="startAddress" value="Địa điểm bắt đầu" />
                            <TextInput
                                id="startAddress"
                                placeholder="Nhập địa điểm bắt đầu"
                                value={formData.startAddress}
                                onChange={(e) => setFormData({ ...formData, startAddress: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="endAddress" value="Địa điểm kết thúc" />
                            <TextInput
                                id="endAddress"
                                placeholder="Nhập địa điểm kết thúc"
                                value={formData.endAddress}
                                onChange={(e) => setFormData({ ...formData, endAddress: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="district" value="Khoảng cách (km)" />
                            <TextInput
                                id="district"
                                placeholder="Nhập khoảng cách"
                                type="number"
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="trafficStatue" value="Tình trạng hiện tại" />
                            <TextInput
                                id="trafficStatue"
                                placeholder="Nhập tình trạng"
                                value={formData.trafficStatue}
                                onChange={(e) => setFormData({ ...formData, trafficStatue: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="airyTime" value="Thông thoáng (phút)" />
                            <TextInput
                                id="airyTime"
                                placeholder="Nhập thời gian"
                                value={formData.airyTime}
                                onChange={(e) => setFormData({ ...formData, airyTime: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="level" value="Mức độ (Cao/Trung bình/Thấp)" />
                            <Dropdown>
                                <Dropdown.Item onClick={() => handleDropdownSelect("Cao")}>Cao</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownSelect("Trung bình")}>
                                    Trung bình
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownSelect("Thấp")}>Thấp</Dropdown.Item>
                            </Dropdown>
                            <TextInput
                                id="level"
                                placeholder="Chọn mức độ"
                                value={trafficStatus}
                                readOnly
                                className="mt-2"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit}>{isEdit ? "Cập nhật" : "Tạo mới"}</Button>
                    <Button className="bg-red-500 text-white" onClick={() => setOpenModal(false)}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

export default ManageTrafficStatus;



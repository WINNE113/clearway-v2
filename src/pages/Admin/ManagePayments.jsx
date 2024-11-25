import { useState, useEffect } from "react"
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { getPrimiumPackages, createPrimiumPackage, updatePrimiumPackage, deletePrimiumPackage } from "../../service/PaymentAPI";

const ManagePayments = () => {

    const [loading, setLoading] = useState(true);
    const [openModalPackage, setOpenModalPackage] = useState(false);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [isEditPackage, setIsEditPackage] = useState(false);
    const [primiumPackage, setPrimiumPackage] = useState([]);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUid, setSelectedUid] = useState(null);
    const [message, setMessage] = useState(null);

    const [packageData, setPackageData] = useState({
        id: "",
        namePackage: "",
        description: "",
        price: 0,
        timePackage: 1,
    });

    // Sample data
    const userDataTabs = [
        {
            value: "upgradePackages",
            label: "Danh sách các gói nâng cấp",
            data: primiumPackage
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
                }
            ]
        }
    ]
    const [activeTab, setActiveTab] = useState("upgradePackages")

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPackageData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };
    const handleTabChange = (tabValue) => {
        setActiveTab(tabValue)
    }

    const handleAddNewPackage = () => {
        setIsEditPackage(false);
        setOpenModalPackage(true);
    };

    const handleEditPackage = (packageItem) => {
        setIsEditPackage(true);
        setPackageData({
            id: packageItem._id,
            namePackage: packageItem.name_package,
            description: packageItem.description,
            price: packageItem.price,
            timePackage: extractDays(packageItem.time_package),
        });
        setOpenModalPackage(true);
    };

    const handleEditUser = () => {
        setOpenModalUser(true);
    }

    const handleDelete = (uid) => {
        setSelectedUid(uid);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await deletePrimiumPackage(selectedUid);
            setIsModalOpen(false);
            fetchPrimiumPackage();
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }

    };

    const extractDays = (timeString) => {
        if (!timeString) return "";
        const daysPart = timeString.split(" ")[0];
        return daysPart;
    };


    const handleSubmitPackage = async () => {
        try {
            const formData = {
                name_package: packageData.namePackage,
                description: packageData.description,
                time_package: parseInt(packageData.timePackage),
                price: parseInt(packageData.price)
            }
            const res = await createPrimiumPackage(formData);
            setOpenModalPackage(false);
            fetchPrimiumPackage();
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdatePackage = async () => {
        try {
            const formData = {
                time_package: parseInt(packageData.timePackage),
                price: parseInt(packageData.price)
            }
            const res = await updatePrimiumPackage(formData, packageData.id);
            setOpenModalPackage(false);
            fetchPrimiumPackage();
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }

    const fetchPrimiumPackage = async () => {
        try {
            const response = await getPrimiumPackages();
            setPrimiumPackage(response.data);
        } catch (error) {
            setMessage(`Lỗi lấy dữ liệu primium package ${error}`)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrimiumPackage();
    }, []);


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
                                    <th className="py-2 px-2 text-left">Ngày cập nhật</th>
                                    <th className="py-2 px-2 text-left">Tên gói nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Mô tả</th>
                                    <th className="py-2 px-2 text-left">Thời gian nâng cấp</th>
                                    <th className="py-2 px-2 text-left">Giá tiền</th>
                                    <th className="py-2 px-2 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-950 text-sm font-light">
                                {userDataTabs.find(tab => tab.value === activeTab).data?.map((pg) => (
                                    <tr key={pg._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg._id}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.created_at}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.updated_at}</td>
                                        <td className="py-1 px-2 text-left whitespace-nowrap">{pg.name_package}</td>
                                        <td className="py-1 px-2 text-left">{pg.description}</td>
                                        <td className="py-1 px-2 text-left">{extractDays(pg.time_package)} Ngày</td>
                                        <td className="py-1 px-2 text-left">{pg.price}</td>
                                        <td className="py-1 px-2 flex space-x-4 justify-center items-center mt-5">
                                            <button onClick={() => handleEditPackage(pg)} className="w-6 h-6 text-black"><FaRegEdit /></button>
                                            <button onClick={() => handleDelete(pg._id)} className="w-6 h-6 text-red-600"><MdDelete />
                                            </button>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </table>)}
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
                                        value={packageData.namePackage}
                                        onChange={handleChange}
                                        readOnly={isEditPackage}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="timePackage" value="Thời gian gói nâng cấp" />
                                    <TextInput
                                        id="timePackage"
                                        placeholder="Nhập thời gian gói nâng cấp"
                                        type="number"
                                        min="1"
                                        value={packageData.timePackage}
                                        onChange={handleChange}
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
                                        value={packageData.price}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Label htmlFor="description" value="Mô tả gói nâng cấp" />
                            <TextInput
                                id="description"
                                placeholder="Nhập mô tả"
                                value={packageData.description}
                                onChange={handleChange}
                                readOnly={isEditPackage}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center space-x-5">
                        <Button onClick={isEditPackage ? handleUpdatePackage : handleSubmitPackage}>{isEditPackage ? "cập nhật" : "Tạo"}</Button>
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
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header> Bạn có chắc chắn muốn xóa gói nâng cấp này? </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"> Hành động này không thể hoàn tác! </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={confirmDelete}> Xóa </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}> Hủy </Button>
                </Modal.Footer>
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
        </main>
    )
}
export default ManagePayments
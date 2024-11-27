import { Modal, TextInput, Pagination, Button, Label, Textarea, ToggleSwitch } from "flowbite-react";
import { getReports, updateReport, deleteReport } from "../../service/ReportAPI";
import { getuser } from "../../service/UserAPI";
import { useEffect, useState } from "react";
const ManageReport = () => {
    const [switch1, setSwitch1] = useState(false);
    const [switch2, setSwitch2] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reportTraffic, setReportTraffic] = useState([]);
    const [reportUser, setReportUser] = useState([]);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalReportUser, setOpenModalReportUser] = useState(false);
    const [reportUserData, setReportUserData] = useState(null);
    const [reportTrafficData, setReportTrafficData] = useState(null);



    const getUser = async (userId) => {
        try {
            const userResponse = await getuser(userId);
            return userResponse.data;
        } catch (error) {
            setMessage(`Lỗi lấy dữ liệu người dùng: ${error.message}`);
            setShowMessageModal(true);
            return null;
        }
    };

    const fetchReportTraffic = async () => {
        try {
            const response = await getReports();
            if (response && response.data) {
                const trafficReports = response.data.filter(item => item.accept_report);
                const userReports = response.data.filter(item => !item.accept_report);

                // Lấy tên người dùng cho từng báo cáo
                for (let report of [...trafficReports, ...userReports]) {
                    if (report.user_id) {
                        const user = await getUser(report.user_id);
                        if (user) {
                            report.user_name = user.username;
                            // user.role = 0 : admin, user.role = 1 => generalUser, = 2 > corporateUser, = 3 => trafficAuthority
                            switch (user.role) {
                                case 0:
                                    report.user_role = "Admin"
                                    break;
                                case 1:
                                    report.user_role = "General user"
                                    break;
                                case 2:
                                    report.user_role = "Corporate user"
                                    break;
                                case 3:
                                    report.user_role = "Traffic authority user"
                                    break;
                                default:
                                    report.user_role = "Unknow";
                                    break
                            }
                        }
                    }
                }

                setReportTraffic(trafficReports);
                setReportUser(userReports);
            } else {
                setReportTraffic([]);
                setReportUser([]);
            }
        } catch (error) {
            setMessage(`Lỗi lấy dữ liệu report traffic: ${error.message}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };


    const extractDays = (timeString) => {
        if (!timeString) return "";
        const daysPart = timeString.split("T")[0];
        return daysPart;
    };

    const handleUpdateReportUser = (rUser) => {
        setOpenModalReportUser(true);
        setReportUserData(rUser);
    }


    const handleChange = (e) => {
        const { id, value } = e.target;
        setReportUserData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };


    const handleDeleteReportUser = async () => {
        try {
            const response = await deleteReport(reportUserData?._id);
            setOpenModalReportUser(false);
        } catch (error) {
            setMessage(`Lỗi xóa báo cáo từ người dùng: ${error.message}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }


    const handleConfirmReportUser = async () => {
        try {
            const formData = {
                accept_report: true
            }
            const reportId = reportUserData?._id;
            const response = await updateReport(formData, reportId);
            setOpenModalReportUser(false);
            fetchReportTraffic();
        } catch (error) {
            setMessage(`Lỗi xác nhận báo cáo từ người dùng: ${error.message}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateReportTraffic = async () => {
        try {
            const formData = {
                accept_report: false
            }
            const reportId = reportTrafficData?._id;
            const response = await updateReport(formData, reportId);
            setOpenModal(false);
            fetchReportTraffic();
        } catch (error) {
            setMessage(`Lỗi cập nhật báo cáo từ hệ thống: ${error.message}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }

    const handleEditReportTraffic = (report) => {
        setOpenModal(true);
        setReportTrafficData(report)
    };

    useEffect(() => {
        fetchReportTraffic()
    }, []);

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
                                    <tr className="bg-gray-200 text-gray-950 text-sm leading-normal">
                                        <th className="py-2 px-2 text-left">Thời gian báo cáo</th>
                                        <th className="py-2 px-2 text-left">Báo cáo bởi</th>
                                        <th className="py-2 px-2 text-left">Tuyến đường báo cáo</th>
                                        <th className="py-2 px-2 text-left">Mô tả của báo cáo</th>
                                        <th className="py-2 px-2 text-left">Tình trạng giao thông</th>
                                        <th className="py-2 px-2 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {reportTraffic?.map((report) => (
                                        <tr key={report?._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-2 px-2 text-left font-bold">{extractDays(report?.created_at)}</td>
                                            <td className="py-2 px-2 text-left font-bold"> {report?.user_role} </td>
                                            <td className="py-2 px-2 text-left font-bold">{report?.traffic_route.route_name}</td>
                                            <td className="py-2 px-2 text-left font-bold">{report?.description}</td>
                                            <td className="py-2 px-2 text-left text-red-500 font-bold">{report?.traffic_status}</td>
                                            <td className="py-2 px-2 text-left cursor-pointer">
                                                <Button type="primary" onClick={() => handleEditReportTraffic(report)} >Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center mt-3" style={{ justifyContent: 'center', display: 'flex' }}>
                            <Pagination
                                layout="pagination"
                                currentPage={currentPage}
                                totalPages={10}
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
                                    <tr className="bg-gray-200 text-gray-950 text-sm leading-normal">
                                        <th className="py-2 px-2 text-left">Tuyến đường báo cáo</th>
                                        <th className="py-2 px-2 text-left">Tình trạng giao thông</th>
                                        <th className="py-2 px-2 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {reportUser?.map((rUser) => (
                                        <tr key={rUser?._id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-2 px-2 text-left font-bold">{rUser?.traffic_route?.route_name}</td>
                                            <td className="py-2 px-2 text-red-500 font-bold">{rUser?.traffic_status}</td>
                                            <td className="py-2 px-2 text-left font-normal"><Button type="primary" onClick={() => handleUpdateReportUser(rUser)} >Edit</Button></td>
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
                                        <TextInput
                                            value={reportTrafficData?.traffic_route?.route_name}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label>Tình trạng giao thông</label>
                                        <TextInput
                                            value={reportTrafficData?.traffic_status}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '16px' }}>
                                        <label>Báo cáo bởi</label>
                                        <TextInput
                                            value={reportTrafficData?.user_role}
                                        />
                                    </div>
                                    <div className="flex justify-between gap-6">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Thời gian' />
                                            <TextInput
                                                value={extractDays(reportTrafficData?.created_at)}
                                            />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Dữ liệu hệ thống' />
                                            <ToggleSwitch className="mt-3" checked={switch1} onChange={setSwitch1} />
                                        </div>
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Mô tả báo cáo' />
                                        <Textarea
                                            id='description'
                                            value={reportTrafficData?.description}
                                        />
                                    </div>
                                    <div className="flex" style={{ justifyContent: 'space-evenly', margin: '0 20%' }}>
                                        <Button color="failure" onClick={() => setOpenModal(false)}>
                                            Hủy
                                        </Button>
                                        <Button type="submit" onClick={() => handleUpdateReportTraffic()}>
                                            Cập nhật
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Modal className="" show={openModalReportUser} size="3xl" onClose={() => setOpenModalReportUser(false)} popup>
                            <Modal.Header className='font-bold' style={{ textAlign: 'right' }}>Xác nhận thông tin báo cáo từ người dùng</Modal.Header>
                            <Modal.Body className="space-y-6" style={{ margin: '20px' }}>
                                <div>
                                    <div className='mb-6'>
                                        <Label htmlFor='routerName' value='Tuyến đường báo cáo' />
                                        <TextInput
                                            id='routerName'
                                            value={reportUserData?.traffic_route.route_name}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='userId' value='Báo cáo bởi' />
                                        <TextInput id='userId'
                                            value={reportUserData?._id}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="flex gap-6 justify-between">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='statusTraffic' value='Tình trạng giao thông từ báo cáo người dùng' />
                                            <TextInput id='statusTraffic'
                                                value={reportUserData?.traffic_status}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='currentStatusTraffic' value='Tình trạng giao thông hiện tại' />
                                            <TextInput
                                                id='currentStatusTraffic'
                                                value={reportUserData?.traffic_status}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-6 justify-between">
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='time' value='Thời gian' />
                                            <TextInput
                                                id='time'
                                                value={reportUserData?.created_at}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className='mb-6 w-1/2'>
                                            <Label htmlFor='description' value='Dữ liệu hệ thống (Tắt khi xác nhận)' />
                                            <ToggleSwitch className="mt-3" checked={switch2} onChange={setSwitch2} />
                                        </div>
                                    </div>
                                    <div className='mb-6'>
                                        <Label htmlFor='description' value='Mô tả báo cáo' />
                                        <Textarea
                                            id='description'
                                            value={reportUserData?.description}
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="flex" style={{ justifyContent: 'space-evenly', margin: '0 20%' }}>
                                        <Button color="failure" onClick={() => handleDeleteReportUser()}>
                                            Từ chối
                                        </Button>
                                        <Button type="submit" onClick={() => handleConfirmReportUser()}>
                                            Xác nhận
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
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
                    </div>
                </div>
            </div>
        </main>
    )
};
export default ManageReport
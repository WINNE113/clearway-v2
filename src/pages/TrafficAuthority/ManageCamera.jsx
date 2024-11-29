import { useState, useEffect } from 'react';
import { CiEdit, CiTrash } from "react-icons/ci";
import { Pagination, Spinner, Modal, Button, TextInput, Label, Textarea } from "flowbite-react";
import { GetListCamera } from '../../service/TrafficAPI';
import WebSocketVideo from '../../components/WebSocketVideo';
import GoogleMap from '../../components/Googlemap';
import {PutCamera, PostCamera, DeleteCamera} from '../../service/TrafficAPI'

const ManageCameras = () => {
    const [loading, setLoading] = useState(true);
    const [cameraMap, setCameraMap] = useState({ lat: 10.99835602, lng: 77.01502627 }); 
    const [cameras, setCameras] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);
    const [routeId, setRouteId] = useState('');
    const [selectedCamera, setSelectedCamera] = useState(null);

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessage] = useState(null);

    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState(null);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [formData, setFormData] = useState(null);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteData, setDeleteData] = useState(null);

    const onPageChange = (page) => setCurrentPage(page);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await GetListCamera();
                setCameras(response.data);
                console.log(response.data);
                 
                if (response.data.length > 0) {
                    setCameraMap({ 
                        lat: parseFloat(response.data[0].location[0]), 
                        lng: parseFloat(response.data[0].location[1]) 
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const markers = cameras.map(camera => ({
        lat: parseFloat(camera.location[0]),
        lng: parseFloat(camera.location[1]),
        routeId: camera.id_route
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cameras.slice(indexOfFirstItem, indexOfLastItem);

    const handleMarkerClick = (routeId) => {
        setRouteId(routeId);
        const camera = cameras.find(cam => cam.id_route === routeId);
        setSelectedCamera(camera);
        console.log(routeId);
    };

    const handleMapClick = ({ lat, lng }) => {
        setMessage(
            <div className='flex flex-col justify-start'>
                <strong>Vĩ độ:</strong> {lat}, 
                <strong>Kinh độ:</strong> {lng}
            </div>
        );
        setShowMessageModal(true);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "latitude" || id === "longitude") {
            setFormData(prevState => {
                const location = [...prevState.location];
                if (id === "latitude") {
                    location[0] = value.trim();
                } else if (id === "longitude") {
                    location[1] = value.trim();
                }
                return { ...prevState, location };
            });
        } else {
            setFormData({ ...formData, [id]: value.trim() });
        }
    };    

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await PostCamera(formData);
            if (res.status === 201) {
                setOpenCreateModal(false);
            } else {
                setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${res.detail}`);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    }

    const handleChangeUpdate = (e) => {
        const { id, value } = e.target;
        if (id === "latitude" || id === "longitude") {
            setUpdateData(prevState => {
                const location = [...prevState.location];
                if (id === "latitude") {
                    location[0] = value;
                } else if (id === "longitude") {
                    location[1] = value;
                }
                return { ...prevState, location };
            });
        } else {
            setUpdateData(prevState => ({ ...prevState, [id]: value }));
        }
    };
    

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await PutCamera(updateData._id, updateData);
            if (res.status === 200) {
                setOpenUpdateModal(false);
                setMessage("Cập nhật thành công");
                setShowMessageModal(true);
                setUpdateData(null);
            } else {
                setMessage(`Cập nhật thất bại: ${res.detail}`);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(`Có lỗi xảy ra. Vui lòng thử lại! ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async() => {
        setLoading(true);
        try {
            const res = await DeleteCamera(deleteData._id);
            if (res.status === 200) {
                setOpenDeleteModal(false);
                setOpenDeleteModal(false);
            } else {
                setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${res.detail}`);
                setShowMessageModal(true);
            }
        } catch (error) {
            setMessage(`Đã xảy ra lỗi không mong muốn. Vui lòng thử lại. ${error}`);
            setShowMessageModal(true);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                    <div className="bg-white p-3">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-xl mb-1 font-bold">Danh sách các Camera</h2>
                            </div>
                            <div className="flex items-center">
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={() => {setOpenCreateModal(true)}}>
                                    <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                        Thêm Camera
                                    </span>
                                </button>
                            </div>
                        </div>
                        {cameras.length === 0 ? (
                            <p className="text-center text-gray-500">Không có camera nào được tìm thấy.</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr className="bg-gray-200 text-sm">
                                                <th className="py-1 px-2 text-center">STT</th>
                                                <th className="py-1 px-2 text-center">Tuyến đường</th>
                                                <th className="py-1 px-2 text-center">Tình trạng</th>
                                                <th className="py-1 px-2 text-center">Cập nhật</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-950 text-sm font-light">
                                            {currentItems.map((camera, index) => (
                                                <tr key={camera._id} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-1 px-2 text-center whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                                                    <td className="py-1 px-2 text-center">{camera.route.route_name}</td>
                                                    <td className="py-1 px-2 text-center">{camera.route.connect_camera ? "Bật" : "Tắt"}</td>
                                                    <td className="py-1 px-2 flex space-x-4 justify-center items-center">
                                                        <CiEdit size={20} onClick={() => {setOpenUpdateModal(true); setUpdateData(camera);}}/>
                                                        <CiTrash className="text-red-500" size={20} onClick={() => {setOpenDeleteModal(true); setDeleteData(camera);}}/>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex overflow-x-auto justify-end sm:justify-center">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={Math.ceil(cameras.length / itemsPerPage)}
                                        onPageChange={onPageChange}
                                        previousLabel='Trước'
                                        nextLabel='Sau'
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-full h-2/3 flex justify-center items-center mt-2 bg-blue-300"> 
                        {routeId ? <WebSocketVideo routeId={routeId} /> : <p className='text-blue-950'>Không có video kết nối</p>} 
                        {selectedCamera && (
                            <div className="bg-white p-3 mt-2">
                                <h3 className="text-lg font-bold">Thông tin Camera</h3>
                                <p>Tuyến đường: {selectedCamera.route.route_name}</p>
                                <p>Tình trạng: {selectedCamera.route.connect_camera ? "Bật" : "Tắt"}</p>
                                <p>Liên kết: {selectedCamera.link_connect}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-1">
                    <GoogleMap center={cameraMap} markers={markers} onMarkerClick={handleMarkerClick} onMapClick={handleMapClick} />
                </div>
            </div>
            <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Thêm camera</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'> 
                        <div className='flex flex-col'>
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="latitude" value="Vĩ độ" />
                                        <TextInput id="latitude" placeholder="Nhập vĩ độ" onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label htmlFor="link_connect" value="Địa chỉ liên kết" />
                                        <TextInput id="link_connect" placeholder="Nhập địa chỉ liên kết" onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="longitude" value="Kinh độ" />
                                        <TextInput id="longitude" placeholder="Nhập kinh độ" onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label htmlFor="id_route" value="Tuyến đường" />
                                        <TextInput id="id_route" placeholder="Nhập tuyến đường" onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center w-full gap-16">
                        <Button className="bg-[#B80707] text-white w-32" onClick={() => setOpenCreateModal(false)}> Hủy </Button>
                        <Button className='bg-[#4B49AC] text-white w-32' onClick={handleSubmit}> Tạo </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* Sửa biển báo */}
            <Modal show={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Cập nhật camera</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'>
                        {updateData && 
                            <div className='flex flex-col'>
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="_id" value="Cam ID" />
                                            <TextInput id="_id" defaultValue={updateData._id} readOnly/>
                                        </div>
                                        <div>
                                            <Label htmlFor="latitude" value="Vĩ độ" />
                                            <TextInput id="latitude" defaultValue={updateData.location[0]} onChange={handleChangeUpdate}/>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="route_name" value="Tuyến đường" />
                                            <TextInput id="route_name" defaultValue={updateData.route.route_name} readOnly/>
                                        </div>
                                        <div>
                                            <Label htmlFor="longitude" value="Kinh độ" />
                                            <TextInput id="longitude" defaultValue={updateData.location[1]} onChange={handleChangeUpdate}/>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="link_connect" value='Liên kết'></Label>
                                            <Textarea id="link_connect" defaultValue={updateData.link_connect} onChange={handleChangeUpdate}></Textarea>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="connect_camera" value="Tình trạng camera" />
                                            <TextInput id="connect_camera" defaultValue={updateData.route.connect_camera ? "Đang hoạt động" : "Đóng kết nối"} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center w-full gap-16">
                        <Button className="bg-[#B80707] text-white w-32" onClick={() => setOpenUpdateModal(false)}> Hủy </Button>
                        <Button className='bg-[#4B49AC] text-white w-32' onClick={handleUpdate}> Cập nhật </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/*Xóa*/}
            <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <Modal.Header>
                    Bạn có chắc chắn muốn xóa camera này?
                </Modal.Header>
                <Modal.Body className=''>
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <div className="flex justify-center bg-sky-100 p-2 rounded-lg">
                            {deleteData && <div className='flex flex-col justify-center items-start'>
                            <p><strong>Cam ID:</strong> {deleteData._id}</p>
                            <p><strong>Tuyến đường:</strong> {deleteData.route.route_name}</p>
                            <p><strong>Địa chỉ liên kết:</strong> {deleteData.link_connect}</p>
                            </div>}
                        </div>
                        <p className="text-base leading-relaxed text-red-600 dark:text-red-700">
                            Hành động này không thể hoàn tác!
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-center gap-10'>
                    <Button color="failure" onClick={handleDelete}> Vâng, Tôi chắc chắn </Button>
                    <Button color="gray" onClick={() => setOpenDeleteModal(false)}> Không, Hủy lựa chọn </Button>
                </Modal.Footer>
            </Modal>
            {/* Thông báo lỗi */}
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
    );
};

export default ManageCameras;
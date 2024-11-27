import { useState, useEffect, useRef, useCallback } from 'react'
import { Pagination, Button, Modal, TextInput, Label, Spinner } from "flowbite-react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { CircularProgressbar } from "react-circular-progressbar";
import { app } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { GetListTrafficSigns, PostTrafficSign, DeleteTrafficSign, PutTrafficSign } from "../../service/TrafficAPI"

const ManageTrafficSigns = () => {
    const [loading, setLoading] = useState(true);
    const [trafficSigns, setTrafficSign] = useState(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [message, setMessage] = useState(null);
    
    const [formData, setFormData] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null);

    const filePickerRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);

    const [totalSigns, setTotalSigns] = useState(0);
    const [prohibitedSigns, setProhibitedSigns] = useState(0);
    const [dangerSigns, setDangerSigns] = useState(0);
    const [mandatorySigns, setMandatorySigns] = useState(0);
    const [guideSigns, setGuideSigns] = useState(0);
    const [additionalSigns, setAdditionalSigns] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [trafficSignPerPage] = useState(5);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleChangeUpdate = (e) => {
        const { id, value } = e.target;
        setUpdateData(prevState => ({ ...prevState, [id]: value}));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = useCallback(async () => {
        if (!imageFile) return;
        try {
            setImageFileUploading(true);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + imageFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },(error) => {
                    console.error("Upload error:", error);
                    setImageFileUploadProgress(null);
                    setImageFile(null);
                    setImageFileUrl(null);
                    setImageFileUploading(false);
                },async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageFileUrl(downloadURL);
                        setFormData({ ...formData, image_sign: downloadURL });
                        setUpdateData({...updateData, image_sign: downloadURL })
                    } catch (error) {
                        console.error("Download URL error:", error);
                    } finally {
                        setImageFileUploading(false);
                        setImageFileUploadProgress(null);
                    }
                }
            );
        } catch (error) {
            console.error("Lỗi tải hình ảnh:", error);
        }
    }, [imageFile, formData, updateData]);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await GetListTrafficSigns();
                setTrafficSign(response.data);

                const total = response.data.length;
                const prohibited = response.data.filter(sign => sign.type_sign === 'Biển báo cấm').length;
                const danger = response.data.filter(sign => sign.type_sign === 'Biển báo nguy hiểm và cảnh báo').length;
                const mandatory = response.data.filter(sign => sign.type_sign === 'Biển báo hiệu lệnh').length;
                const guide = response.data.filter(sign => sign.type_sign === 'Biển chỉ dẫn').length;
                const additional = response.data.filter(sign => sign.type_sign === 'Biển phụ').length;

                setTotalSigns(total);
                setProhibitedSigns(prohibited);
                setDangerSigns(danger);
                setMandatorySigns(mandatory);
                setGuideSigns(guide);
                setAdditionalSigns(additional);
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
          };
        fetchUsers();
    },[]);

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (imageFileUploading) {
            setLoading(false);
            return;
        }
        try {
            const res = await PostTrafficSign(formData);
            if (res.status === 201) {
                setTrafficSign(prevListData => [...prevListData, res.data]);
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

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await PutTrafficSign(updateData._id, updateData);
            if (res.status === 200) {
                setOpenEditModal(false);
                setMessage("Cập nhật thành công");
                setShowMessageModal(true);
                setTrafficSign(prevTrafficSign => prevTrafficSign.map(trafficsign => trafficsign._id === updateData._id ? { ...trafficsign, ...updateData } : trafficsign ) );
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
            const res = await DeleteTrafficSign(deleteData._id);
            if (res.status === 200) {
                setTrafficSign(prevListData => prevListData.filter(item => item._id !== deleteData._id));
                setOpenDeleteModal(false);
                setIsModalOpen(false);
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

    const indexOfLastSign = currentPage * trafficSignPerPage;
    const indexOfFirstSign = indexOfLastSign - trafficSignPerPage;
    const currentTrafficSigns = trafficSigns ? trafficSigns.slice(indexOfFirstSign, indexOfLastSign) : [];

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                    <div className=" bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Danh sách các biển báo</h2>
                            </div>
                            <div className="flex items-center h-10">
                                <Button className='bg-gradient-to-r from-[#4B49AC] to-[#4B49AC]' onClick={() => {setOpenCreateModal(true)}}>
                                    Thêm Biển Báo
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-100 text-sm leading-normal">
                                        <th className="px-1 py-2 text-center w-1/12">ID</th>
                                        <th className="px-1 py-2 text-center w-1/6">Hình ảnh</th>
                                        <th className="px-1 py-2 text-center w-1/12">Biển số</th>
                                        <th className="px-1 py-2 text-center w-1/5">Tên biển báo</th>
                                        <th className="px-1 py-2 text-center w-1/6">Loại biển báo</th>
                                        <th className="px-1 py-2 text-center w-1/6">Loại phương tiện</th>
                                        <th className="px-1 py-2 text-center w-1/6">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTrafficSigns && currentTrafficSigns.map((traffic, index) => (
                                        <tr key={traffic._id} className="border-b border-gray-200 hover:bg-gray-100 text-center">
                                            <td className="px-4 py-3 text-center whitespace-nowrap">{indexOfFirstSign + index + 1}</td>
                                            <td className="px-4 py-3 text-center whitespace-nowrap overflow-hidden w-20 h-20">
                                                <img src={traffic.image_sign} alt='image-traffic-sign' className="object-contain w-full h-full"/>
                                            </td>
                                            <td className="px-4 py-3 text-center">{traffic.number_sign}</td>
                                            <td className="px-4 py-3 text-center">{traffic.name_sign}</td>
                                            <td className="px-4 py-3 text-center">{traffic.type_sign}</td>
                                            <td className="px-4 py-3 text-center">{traffic.type_vehicle}</td>
                                            <td className="px-4 py-3 text-center space-x-4">
                                                <button className='font-medium text-green-500 hover:underline cursor-pointer' onClick={() => {setOpenEditModal(true); setUpdateData(traffic)}}>
                                                    <CiEdit size={20} />
                                                </button>
                                                <button className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => {setOpenDeleteModal(true); setDeleteData(traffic)}}>
                                                    <CiTrash size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex overflow-x-auto my-1 justify-end sm:justify-center">
                        <Pagination layout="pagination" currentPage={currentPage} totalPages={Math.ceil(trafficSigns.length / trafficSignPerPage)} onPageChange={onPageChange} previousLabel="Trước" nextLabel="Sau" showIcons/>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-2 mb-4 flex flex-col justify-center items-center">
                        <p className='mb-1 text-lg font-bold'>Tổng số biển báo</p>
                        <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                            <div className="w-16 h-16 bg-white rounded-full border-8 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-500">
                                {totalSigns}
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md mb-4 flex flex-row justify-center items-center gap-10 p-2">
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-1 text-lg text-center font-bold'>Biển cấm</p>
                            <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-16 h-16 bg-white rounded-full border-8 border-red-700 flex items-center justify-center text-lg font-bold text-red-500">
                                    {prohibitedSigns}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-1 text-lg text-center font-bold'>Biển nguy hiểm</p>
                            <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-16 h-16 bg-white rounded-full border-8 border-yellow-300 flex items-center justify-center text-lg font-bold text-yellow-300">
                                    {dangerSigns}
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md mb-4 flex flex-row justify-center items-center gap-10 p-2">
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-1 text-lg text-center font-bold'>Biển hiệu lệnh</p>
                            <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-16 h-16 bg-white rounded-full border-8 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-500">
                                    {mandatorySigns}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='mb-1 text-lg text-center font-bold'>Biển chỉ dẩn</p>
                            <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-16 h-16 bg-white rounded-full border-8 border-blue-700 flex items-center justify-center text-lg font-bold text-blue-700">
                                    {guideSigns}
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md p-2 mb-4 flex flex-col justify-center items-center">
                        <p className='mb-1 text-lg font-bold'>Biển phụ</p>
                        <div className="w-20 h-20 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                            <div className="w-16 h-16 bg-white rounded-full border-8 border-green-700 flex items-center justify-center text-lg font-bold text-green-700">
                                {additionalSigns}
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            {/* Thêm biển báo */}
            <Modal show={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Tạo biển báo mới</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'>
                        <div className='flex flex-col'>
                            <div className="relative w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                                {imageFileUploadProgress && (
                                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                                        styles={{
                                            root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 },
                                            path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                                        }}/>
                                )}
                                <img src={imageFileUrl || "../../../public/g8.svg"} alt="user" className={`rounded-full w-full h-full object-cover border-2 ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}/>
                            </div>  
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="number_sign" value="Biển số" />
                                        <TextInput id="number_sign" placeholder="Nhập biển số" onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label htmlFor="type_sign" value="Loại biển báo" />
                                        <TextInput id="type_sign" placeholder="Nhập loại biển báo" onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="nameTrafficSign" value="Tên biển báo" />
                                        <TextInput id="name_sign" placeholder="Nhập tên biển báo" onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <Label htmlFor="typeTrafficVehicle" value="Loại phương tiện" />
                                        <TextInput id="type_vehicle" placeholder="Nhập loại phương tiện áp dụng" onChange={handleChange}/>
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
            <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Cập nhật biển báo</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'>
                        {updateData && 
                            <div className='flex flex-col'>
                                <div className="relative w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                                    {imageFileUploadProgress && (
                                        <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5}
                                            styles={{
                                                root: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0 },
                                                path: { stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})` },
                                            }}/>
                                    )}
                                    <img src={imageFileUrl || updateData.image_sign} alt="user" className={`rounded-full w-full h-full object-cover border-2 ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}/>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="number_sign" value="Biển số" />
                                            <TextInput id="number_sign" placeholder="Nhập biển số" defaultValue={updateData.number_sign} onChange={handleChangeUpdate}/>
                                        </div>
                                        <div>
                                            <Label htmlFor="type_sign" value="Loại biển báo" />
                                            <TextInput id="type_sign" placeholder="Nhập loại biển báo" defaultValue={updateData.type_sign} onChange={handleChangeUpdate}/>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="name_sign" value="Tên biển báo" />
                                            <TextInput id="name_sign" placeholder="Nhập tên biển báo" defaultValue={updateData.name_sign} onChange={handleChangeUpdate}/>
                                        </div>
                                        <div>
                                            <Label htmlFor="type_vehicle" value="Loại phương tiện" />
                                            <TextInput id="type_vehicle" placeholder="Nhập loại phương tiện" defaultValue={updateData.type_vehicle} onChange={handleChangeUpdate}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center w-full gap-16">
                        <Button className="bg-[#B80707] text-white w-32" onClick={() => setOpenEditModal(false)}> Hủy </Button>
                        <Button className='bg-[#4B49AC] text-white w-32' onClick={handleUpdate}> Cập nhật </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* Xóa biển báo */}
            <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">Xóa biển báo</p>
                </Modal.Header>
                <Modal.Body>
                    <form className='bg-white'>
                        {deleteData && 
                            <div className='flex flex-col'>
                                <div className="relative w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                                    <img src={deleteData.image_sign} alt="user" className={`rounded-full w-full h-full object-cover border-2`}/>
                                </div>
                                <div className='grid grid-cols-2 gap-5 mt-5'>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="number_sign" value="Biển số" />
                                            <TextInput id="number_sign" placeholder="Nhập biển số" defaultValue={deleteData.number_sign} readOnly/>
                                        </div>
                                        <div>
                                            <Label htmlFor="type_sign" value="Loại biển báo" />
                                            <TextInput id="type_sign" placeholder="Nhập loại biển báo" defaultValue={deleteData.type_sign} readOnly/>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex flex-col space-y-5'>
                                        <div>
                                            <Label htmlFor="name_sign" value="Tên biển báo" />
                                            <TextInput id="name_sign" placeholder="Nhập tên biển báo" defaultValue={deleteData.name_sign} readOnly/>
                                        </div>
                                        <div>
                                            <Label htmlFor="type_vehicle" value="Loại phương tiện" />
                                            <TextInput id="type_vehicle" placeholder="Nhập loại phương tiện" defaultValue={deleteData.type_vehicle} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex items-center justify-center w-full gap-16">
                        <Button className="bg-[#B80707] text-white w-32" onClick={() => setOpenDeleteModal(false)}> Hủy </Button>
                        <Button className='bg-[#4B49AC] text-white w-32' onClick={() => setIsModalOpen(true)}> Xóa </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    Bạn có chắc chắn muốn xóa biển báo này?
                </Modal.Header>
                <Modal.Body className='flex justify-center'>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Hành động này không thể hoàn tác!
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-center gap-10'>
                    <Button color="failure" onClick={handleDelete}> Vâng, Tôi chắc chắn </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}> Không, Hủy lựa chọn </Button>
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
    )
}

export default ManageTrafficSigns
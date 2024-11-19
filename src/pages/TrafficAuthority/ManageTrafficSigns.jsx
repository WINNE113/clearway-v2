import { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Pagination, Button, Modal, TextInput, Label } from "flowbite-react";
import { CiCircleRemove } from "react-icons/ci";

const ManageTrafficSigns = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRid, setSelectedRid] = useState(null);
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

    const trafficSigns = [
        {
            id: 1,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Bn0k6dA55f5kIyHlC7a1PA7FP1oOj88BLA&s",
            licensePlate: "P.102",
            name: "Cấm đi ngược chiều",
            typeTrafficSign: "Biểm báo cấm",
            typeVehicle: "Tất cả"
        },
        {
            id: 2,
            image: "https://myanhsafety.com.vn/image/cache/catalog/bien-bao-giao-thong-cam-xe-o-to-p-103a-2-500x500.jpg",
            licensePlate: "P.103",
            name: "Cấm xe ô tô",
            typeTrafficSign: "Biểm báo cấm",
            typeVehicle: "Xe ô tô"
        },
        {
            id: 3,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWijqjt7gwP0L4mIytK17_OBiXm6Y2pTJxg&s",
            licensePlate: "P.104",
            name: "Tốc độ tối đa cho phép(40 km/h)",
            typeTrafficSign: "Biển báo cấm",
            typeVehicle: "Tất cả"
        },
        {
            id: 4,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAVVCEuZ7RZqJATixGAh-T4kjYJOw_qD-ctg&s",
            licensePlate: "P.105",
            name: "Công trường",
            typeTrafficSign: "Biểm báo nguy hiểm",
            typeVehicle: "Tất cả"
        },
        {
            id: 5,
            image: "https://bizweb.dktcdn.net/thumb/grande/100/352/036/products/bien-bao-104.jpg?v=1600502359843",
            licensePlate: "P.106",
            name: "Cấm xe máy",
            typeTrafficSign: "Biển báo cấm",
            typeVehicle: "Xe máy"
        }

    ]

    const handleDelete = (rid) => {
        setSelectedRid(rid);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        // Proceed with deletion
        console.log("Deleted traffic sign with ID:", selectedRid);
        setIsModalOpen(false);
    };

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
                                <Button onClick={handleAddNew}>
                                    <IoMdAdd size={20} className="text-white" /> Add New
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">ID</th>
                                        <th className="py-3 px-6 text-left">Hình ảnh</th>
                                        <th className="py-3 px-6 text-left">Biển số</th>
                                        <th className="py-3 px-6 text-left">Tên biển báo</th>
                                        <th className="py-3 px-6 text-left">Loại biển báo</th>
                                        <th className="py-3 px-6 text-left">Loại phương tiện</th>
                                        <th className="py-3 px-6 text-left">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-950 text-sm font-light">
                                    {trafficSigns.map((traffic) => (
                                        <tr key={traffic.id} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{traffic.id}</td>
                                            <td className="py-3 px-6 text-left whitespace-nowrap overflow-hidden w-24 h-20">
                                                <img src={traffic.image} alt='image-traffic-sign' className='w-max h-max object-cover' />
                                            </td>
                                            <td className="py-3 px-6 text-left">{traffic.licensePlate}</td>
                                            <td className="py-3 px-6 text-left">{traffic.name}</td>
                                            <td className="py-3 px-6 text-left">{traffic.typeTrafficSign}</td>
                                            <td className="py-3 px-6 text-left">{traffic.typeVehicle}</td>
                                            <td className="py-3 px-6 flex space-x-4 justify-center items-center">
                                                <FaRegEdit onClick={handleEdit} size={20} />
                                                <MdDelete className="text-red-500" onClick={() => handleDelete(traffic.id)} size={20} />
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
                            <p className='mb-5 text-lg font-bold'>Tổng số biển báo</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-500">
                                    42
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md mb-5 flex flex-row justify-center items-center space-x-5 p-5">
                        <div>
                            <p className='mb-5 text-lg text-center font-bold'>Biển cấm</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-red-700 flex items-center justify-center text-lg font-bold text-red-500">
                                    42
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='mb-5 text-lg text-center font-bold'>Biển nguy hiểm</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-yellow-300 flex items-center justify-center text-lg font-bold text-yellow-300">
                                    42
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md mb-5 flex flex-row justify-center items-center space-x-5 p-5">
                        <div>
                            <p className='mb-5 text-lg font-bold text-center'>Biển hiệu lệnh</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-blue-500 flex items-center justify-center text-lg font-bold text-blue-500">
                                    42
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='mb-5 text-lg font-bold text-center'>Biển chỉ dẩn</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-blue-700 flex items-center justify-center text-lg font-bold text-blu-700">
                                    42
                                </div>
                            </div>
                        </div>
                    </div >
                    <div className="bg-white rounded-lg shadow-md p-3 mb-5 flex flex-col justify-center items-center">
                        <div>
                            <p className='mb-5 text-lg text-center font-bold'>Biển phụ</p>
                            <div className="w-32 h-32 flex items-center justify-center border-gray-400 border-2 shadow-xl rounded-lg">
                                <div className="w-20 h-20 bg-white rounded-full border-8 border-green-700 flex items-center justify-center text-lg font-bold text-green-700">
                                    42
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    <p className="text-xl font-bold">{isEdit ? "Cập nhật biển báo" : "Tạo biển báo mới"}</p>
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
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="licensePlate" value="Biển số" />
                                        <TextInput
                                            id="licensePlate"
                                            placeholder="Nhập biển số"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="typeTrafficSign" value="Loại biển báo" />
                                        <TextInput
                                            id="typeTrafficSign"
                                            placeholder="Nhập loại biển báo"
                                        />
                                    </div>
                                </div>
                                <div className='col-span-1 flex flex-col space-y-5'>
                                    <div>
                                        <Label htmlFor="nameTrafficSign" value="Tên biển báo" />
                                        <TextInput
                                            id="nameTrafficSign"
                                            placeholder="Nhập tên biển báo"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="typeTrafficVehicle" value="Loại phương tiện" />
                                        <TextInput
                                            id="typeTrafficVehicle"
                                            placeholder="Nhập loại loại phương tiện"
                                        />
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
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>
                    Bạn có chắc chắn muốn xóa biển báo này?
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Hành động này không thể hoàn tác!
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={confirmDelete}>
                        Xóa
                    </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>

    )
}

export default ManageTrafficSigns
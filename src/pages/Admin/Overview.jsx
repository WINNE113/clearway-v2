import Reactm, { useState } from 'react'
import { BiSolidTrafficBarrier } from "react-icons/bi";
import { CiSun } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { Datepicker } from "flowbite-react";
import { FaUserCog, FaUserAstronaut, FaUsers } from 'react-icons/fa'; // Thư viện icon
import { PiTrafficSignalLight } from "react-icons/pi";
import { MdAdminPanelSettings, MdEmail, MdOutlineCircleNotifications } from "react-icons/md";
import { FaHireAHelper } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";

const Overview = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                            {/*Thông tin người dùng*/}
                            <div className=" bg-white rounded-lg shadow-sm p-2">
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-2 flex flex-col items-center space-y-8">
                                        <h2 className="text-xs font-bold">Thông tin hệ thống</h2>
                                        <div className="flex items-center mt-3 mb-3">
                                            <Datepicker />
                                        </div>
                                        <span className="text-xs font-bold">Tổng: 9 người dùng</span>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <FaUserCog className="mr-2" />General User
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <FaUserAstronaut className="mr-2" />Corporate User
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <PiTrafficSignalLight className="mr-2" />Traffic Authority
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <MdAdminPanelSettings className="mr-2" />Admin
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin hệ thống*/}
                            <div className=" bg-white rounded-lg shadow-sm p-2 mt-5">
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-2 flex flex-col items-center space-y-8">
                                        <h2 className="text-xs font-bold">Thông tin hệ thống</h2>
                                        <div className="flex items-center mt-3 mb-3">
                                            <Datepicker />
                                        </div>
                                        <span className="text-xs font-bold">Tổng: 9 tuyến đường</span>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md col-span-4 flex justify-center items-center flex-col">
                                        <h2 className="text-lg font-bold flex items-center justify-center">
                                            <CiSun className="mr-2" /> Tổng số
                                        </h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3 text-center">300 Tuyến đường</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin trafficS*/}
                            <div className=" bg-white rounded-lg shadow-sm p-2 mt-5">
                                <div className="grid grid-cols-6 gap-2">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-2 flex flex-col items-center space-y-8">
                                        <h2 className="text-xs font-bold">Thông tin hệ thống</h2>
                                        <div className="flex items-center mt-3 mb-3">
                                            <Datepicker />
                                        </div>
                                        <span className="text-xs font-bold">Tổng: 9 biển báo</span>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <BiSolidTrafficBarrier className="mr-2" /> Biển cấm
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <BiSolidTrafficBarrier className="mr-2" />Biển nguy hiểm
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <BiSolidTrafficBarrier className="mr-2" />Biển chỉ dẫn
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <BiSolidTrafficBarrier className="mr-2" />Biển hiệu lệnh
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">1200 Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">1200 Không Hoạt động</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Notifications Panel */}
                        <div className="bg-gray-100 rounded-lg shadow-md p-6 col-span-1">
                            <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-5">
                                <h2 className="text-2xl font-bold mb-4 flex items-center bord">
                                    Gửi thông báo
                                    <MdOutlineCircleNotifications size={40} className="ml-2 text-gray-500 text-red-400" />
                                </h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUsers className="mr-3" /> General User</li>
                                    <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUserCog className="mr-3" /> Corporate User</li>
                                    <li className="flex items-center p-2 bg-white text-blue-900 font-bold rounded shadow-md"><FaUserCog className="mr-3" />Traffic Authority</li>
                                </ul>
                            </div >
                            <div className="bg-gray-100 rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-4 flex items-center">
                                    Cần sự trợ giúp
                                    <FaHireAHelper size={50} className="ml-2 h-5 w-5 text-red-500" />
                                </h2>
                                <div className="flex items-center bg-white justify-center border p-4 shadow-md">
                                    <div className="mr-3">
                                        <img className="w-16 h-16" src="/introduction.svg"></img>
                                    </div>
                                    <div>
                                        <h1 className="text-blue-900">Bắt đầu với ClearWay</h1>
                                        <h1>Nhấn vào để tải về máy</h1>
                                        <Link>Hướng dẫn sử dụng</Link>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5 bg-white justify-center border p-4 shadow-md">
                                    <div className="mr-3">
                                        <img className="w-16 h-16" src="/introduction.svg"></img>
                                    </div>
                                    <div>
                                        <h1 className="text-blue-900">Lưu ý sử dụng hệ thống</h1>
                                        <Link>Nhấn vào để xem</Link>
                                    </div>
                                </div>
                                <div className="flex items-center mt-5 bg-white justify-center border p-4 shadow-md">
                                    <div>
                                        <h1 className="text-xl font-bold text-blue-800">Liên hệ hỗ trợ kỹ thuật: </h1>
                                        <h1 className="text-blue-900 flex items-center mt-3"><MdEmail className="mr-3 text-blue-700" />clearwaytms@gmail.com</h1>
                                        <h1 className="text-blue-900 flex items-center mt-3"><IoCallSharp className="mr-3 text-blue-600" />+84 332101033</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Overview
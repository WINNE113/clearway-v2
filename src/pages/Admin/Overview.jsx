import { BiSolidTrafficBarrier } from "react-icons/bi";
import { CiSun } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { Datepicker } from "flowbite-react";
import { FaUserCog, FaUserAstronaut, FaUsers } from 'react-icons/fa'; // Thư viện icon
import { PiTrafficSignalLight } from "react-icons/pi";
import { MdAdminPanelSettings, MdEmail, MdOutlineCircleNotifications } from "react-icons/md";
import { FaHireAHelper } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { getDataTrafficRoute, getDataTrafficSign } from "../../service/TrafficStatusAPI";
import { getusers } from "../../service/UserAPI";
import { useEffect, useState } from "react";
const Overview = () => {
    const [trafficsign, setTrafficsigns] = useState([]);
    const [trafficroute, setTrafficRoute] = useState([]);
    const [users, setUsers] = useState([]);
    const [rolesCount, setRolesCount] = useState({
        totalGeneralUser: 0,
        totalAdmin: 0,
        totalCorporate: 0,
        totalTrafficAuthority: 0,
        activeGeneralUser: 0,
        inactiveGeneralUser: 0,
        activeCorporate: 0,
        inactiveCorporate: 0,
        activeTrafficAuthority: 0,
        inactiveTrafficAuthority: 0,
        activeAdmin: 0,
        inactiveAdmin: 0,
    });
    const {
        totalGeneralUser, activeGeneralUser, inactiveGeneralUser,
        totalAdmin, activeAdmin, inactiveAdmin,
        totalCorporate, activeCorporate, inactiveCorporate,
        totalTrafficAuthority, activeTrafficAuthority, inactiveTrafficAuthority
    } = rolesCount;

    useEffect(() => {
        fetchDataTrafficSign();
    }, []);
    const fetchDataTrafficSign = async () => {
        try {
            const response = await getDataTrafficSign();
            const data = response.data;
            setTrafficsigns(data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
        }
    };

    console.log(trafficsign);

    const totalSigns = trafficsign.length;

    useEffect(() => {
        fetchDataTrafficRoute();
    }, []);
    const fetchDataTrafficRoute = async () => {
        try {
            const response = await getDataTrafficRoute();
            const data = response.data;
            setTrafficRoute(data);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
        }
    };

    console.log(trafficroute);

    const totalRoutes = trafficroute.length;


    useEffect(() => {
        fetchDataUsers();
    }, []);
    const fetchDataUsers = async () => {
        try {
            const response = await getusers();
            const data = response.data.users;
            setUsers(data);

            //Tính toán số lượng người dùng theo vai trò và trạng thái hoạt động
            const count = data.reduce((acc, user) => {
                const role = user.role;
                const isActive = !user.is_ban; // Nếu is_ban là false thì người dùng đang hoạt động, ngược lại là bị cấm

                //Thêm vào tổng số người dùng cho từng vai trò và trạng thái
                if (role === 1) {
                    acc.totalGeneralUser++;
                    if (isActive) acc.activeGeneralUser++;
                    else acc.inactiveGeneralUser++;
                }
                if (role === 2) {
                    acc.totalCorporate++;
                    if (isActive) acc.activeCorporate++;
                    else acc.inactiveCorporate++;
                }
                if (role === 3) {
                    acc.totalTrafficAuthority++;
                    if (isActive) acc.activeTrafficAuthority++;
                    else acc.inactiveTrafficAuthority++;
                }
                if (role === 0) {
                    acc.totalAdmin++;
                    if (isActive) acc.activeAdmin++;
                    else acc.inactiveAdmin++;
                }

                return acc;
            }, {
                totalGeneralUser: 0, totalAdmin: 0, totalCorporate: 0, totalTrafficAuthority: 0,
                activeGeneralUser: 0, inactiveGeneralUser: 0,
                activeCorporate: 0, inactiveCorporate: 0,
                activeTrafficAuthority: 0, inactiveTrafficAuthority: 0,
                activeAdmin: 0, inactiveAdmin: 0
            });

            setRolesCount(count); // Lưu vào state rolesCount
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
        }
    };



    console.log(users);

    const totalUser = users.length;
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
                                        <span className="text-xs font-bold">Tổng: {totalUser} người dùng</span>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <FaUserCog className="mr-2" />General User
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">{activeGeneralUser} Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">{inactiveGeneralUser} Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <FaUserAstronaut className="mr-2" />Corporate User
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">{activeCorporate} Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">{inactiveCorporate} Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <PiTrafficSignalLight className="mr-2" />Traffic Authority
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">{activeTrafficAuthority} Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">{inactiveTrafficAuthority} Không Hoạt động</h2>
                                    </div>
                                    <div className="bg-orange-100 p-4 rounded-lg shadow-md grid-cols-1">
                                        <h2 className="text-xs font-bold flex items-center justify-center">
                                            <MdAdminPanelSettings className="mr-2" />Admin
                                        </h2>
                                        <h2 className="text-sm text-green-400 mt-3">{activeAdmin} Hoạt động</h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3">{inactiveAdmin} Không Hoạt động</h2>
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
                                        <span className="text-xs font-bold">Tổng: {totalRoutes} tuyến đường</span>
                                    </div>
                                    <div className="bg-blue-100 p-4 rounded-lg shadow-md col-span-4 flex justify-center items-center flex-col">
                                        <h2 className="text-lg font-bold flex items-center justify-center">
                                            <CiSun className="mr-2" /> Tổng số
                                        </h2>
                                        <div className="w-full border-t border-gray-300 my-3" />
                                        <h2 className="text-sm text-orange-500 mt-3 text-center">{totalRoutes} Tuyến đường</h2>
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
                                        <span className="text-xs font-bold">Tổng: {totalSigns} biển báo</span>
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
                                    <MdOutlineCircleNotifications size={40} className="ml-2 text-gray-500" />
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
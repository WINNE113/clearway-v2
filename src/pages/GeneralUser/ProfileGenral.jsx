
import { DashSidebar, Header } from "../../components/index";
import { Modal, ModalBody, TextInput, Tabs } from "flowbite-react";

const ProfileGenral = () => {

    return (
        <div className="min-h-screen grid grid-cols-12 bg-slate-300">
            <div className="w-full col-span-2">
                {/* Sidebar */}
                <DashSidebar />
            </div>
            <div className="col-span-10">
                <div className="flex-row gap-2">
                    <Header />
                </div>
                <main className="mx-9 my-9">
                    <div className="container mx-auto bg-white mt-5 mb-5 p-5 rounded-lg">
                    <Tabs aria-label="Default tabs" variant="default">
                            <Tabs.Item active title="Chỉnh sửa hồ sơ" >
                                <>
                                    <div className="flex flex-wrap">
                                        {/* Left column */}
                                        <div className="w-full md:w-1/4 ">
                                            <div className="flex flex-col items-center text-center p-3 py-5">
                                                <div className="relative mt-5 cursor-pointer">
                                                    <img
                                                        className="rounded-full w-36 h-36"
                                                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                                                        alt="Profile"
                                                    />
                                                    <div className="absolute bottom-3 right-0 bg-blue-500 text-white p-2 rounded-full">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536M16.88 3.515a2.5 2.5 0 113.536 3.536L7.5 20.93l-4 1 1-4L16.88 3.515z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="w-full md:w-3/4 border-r px-5 ">
                                            <div className="py-5">
                                                <div className="flex justify-between items-center mb-3 mt-3">
                                                    <h4 className="text-lg font-semibold">Profile Settings</h4>
                                                </div>


                                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                    <div >
                                                        <label className="block font-medium">Họ tên</label>
                                                        <input
                                                            type="text"
                                                            className="border rounded-lg w-3/4 p-2"

                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium">Số điện thoại</label>
                                                        <input
                                                            type="text"
                                                            className="border rounded-lg w-3/4 p-2"

                                                        />
                                                    </div>
                                                </div>  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                    <div>
                                                        <label className="block font-medium">Email</label>
                                                        <input
                                                            type="text"
                                                            className="border rounded-lg w-3/4 p-2"

                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium">Ngày tháng năm sinh</label>
                                                        <input
                                                            type="date"
                                                            className="border rounded-lg w-3/4 p-2"

                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-3 mt-3">
                                                    <div>
                                                        <label className="block font-medium">Địa chỉ nhà</label>
                                                        <input
                                                            type="text"
                                                            className="border rounded-lg w-3/4 p-2"

                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-right mt-5" style={{ width: '85%' }}>
                                                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                        Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </>
                            </Tabs.Item>
                            <Tabs.Item title="Mật khẩu">
                                <>
                                    <section className="bg-gray-50 dark:bg-gray-900">
                                        <div className="flex flex-col  px-6 py-8 md:h-screen lg:py-0 mx-5 items-center">

                                            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 w-3/4 " action="#">
                                                <div>
                                                    <label
                                                        htmlFor="email"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Nhập mật khẩu cũ
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="email"
                                                        id="email"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder='Nhập mật khẩu hiện tại của bạn'
                                                        required=""
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Nhập mật khẩu mới
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Nhập mật khẩu mới"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block   w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required=""
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="confirm-password"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Xác nhận mật khẩu mới
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        id="confirm-password"
                                                        placeholder="Nhập mật khẩu xác nhận"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required=""
                                                    />
                                                </div>
                                                <div className="flex  justify-end">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 text-white align-right py-2 px-4 rounded-lg"
                                                    >
                                                        Reset passwod
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </section>

                                </>
                            </Tabs.Item>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>

    )
}
export default ProfileGenral
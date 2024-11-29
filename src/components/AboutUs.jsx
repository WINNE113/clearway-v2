import { useState } from 'react'
import { Button } from 'flowbite-react'
import { IoLocation } from "react-icons/io5";
import { FaAddressBook, FaClock } from "react-icons/fa6";
import { Header } from "../components/index";

export default function AboutUs() {
    const [collapse1, setCollapse1] = useState(false);
    const [collapse2, setCollapse2] = useState(false);
    return (
        <div className="min-h-screen !bg-gradient-to-b from-[#408DEF] to-[#408DEF]">
            <Header />
            <main className="container mx-auto justify-center mt-0">
                <section className="relative">
                    <img src="/public/tv_web_2015_home_placeholder4a.png" alt="Phone 1" style={{ width: '100%' }} className="object-contain "/>
                    <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-6xl font-bold mb-4">Giới thiệu về chúng tôi</h1>
                            <p className="text-lg max-w-2xl mx-auto">
                                Hệ thống của chúng tôi ứng dụng công nghệ AI tiên tiến, đem lại sự hiệu quả trong thời gian thực, đảm bảo hành trình suôn sẻ hơn và quy hoạch đô thị tốt hơn cho Thành phố Đà Nẵng.
                            </p>
                            <button className="mt-6 px-6 py-3 text-white rounded hover:bg-green-700" style={{ backgroundColor: '#386c23' }}>
                                Xem thêm
                            </button>
                        </div>
                    </div>
                </section>
                <>
                    <div style={{ height: '150px' }} className="flex justify-center items-center">
                        <h2 className="text-center text-3xl font-bold mb-8 mt-3 text-black">Tầm nhìn và Sứ mệnh Phát triển Người dùng</h2>
                    </div>
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="ml-32 md:text-left">
                                <h1 className="text-left text-2xl md:text-4xl font-bold mb-4 text-black	">
                                    Hệ thống camera an ninh
                                </h1>
                                <p className="text-left font-bold text-black">
                                    Hệ thống camera thông minh là trái tìm của dự án, được triển khai tại các vị trí giao thông trọng điểm tại thành phố Đà Nẵng.
                                    Tích hợp công nghệ tiên tiến YOLO (You Only Look Once), các camera này không chỉ ghi lại hình ảnh mà còn phân tích dữ liệu thời gian thực để nhận diện phương tiện,
                                    phát hiện tình trạng tắc nghẽn và đưa ra cảnh báo sớm.
                                    {collapse1 && (
                                        <p>
                                            Với độ phân giải cao, hoạt động 24/7 và phân tích AI chính xác, hệ thống cung cấp thông tỉn giao thông rõ ràng
                                            và kịp thời. Điều này không chỉ giúp người dân tối ưu hóa hành trình, giảm thời gian di chuyển mà còn hỗ trợ chính quyền. quản lý, điều tiết giao thông hiệu quả.
                                            Đây là bước đi quan trọng trong xây dựng thành phố thông minh và giao thông bền vững tại Đà Nẵng. </p>
                                    )}
                                </p>
                                <Button style={{ backgroundColor: '#63E72E' }} className="mt-4 px-6" size="xl" onClick={() => setCollapse1(true)}>Xem thêm</Button>
                            </div>
                            <div className="flex justify-center md:justify-end space-x-4" style={{ marginBottom: '5rem',marginRight:'17rem' }}>
                                <img src="/public/camera_giam_sat_giao_thong.jpg" alt="Phone 1"
                                    className="w-1/2 clip-pentagon max-w-[200px] object-contain"
                                    style={{transform: "rotate(-35deg) scale(1.4)"}}/>
                                <style>
                                    {`.clip-pentagon { clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);}`}
                                </style>
                            </div>
                        </div>
                    </section>
                    <div style={{ height: '70px', display: 'block' }}></div>
                    <section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                            <div className="flex justify-center md:justify-end space-x-4" style={{ marginRight: '15rem' }}>
                                <img src="/public/map1.jpg" alt="Phone 1"
                                    className="w-1/2 max-w-[200px] object-contain clip-pentagon"
                                    style={{transform: "rotate(-35deg) scale(1.6)"}}/>
                            </div>
                            <div className="md:text-left text-right px-20">
                                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black">
                                    Hệ thống bản đồ thông minh
                                </h1>
                                <p className="font-bold mb-4 text-black">
                                    Hệ thống bản đồ được tích hợp từ Google Maps đóng vai trò quan trọng trong dự án,
                                    cung cấp thông tin giao thông trực quan và chính xác theo thời gian thực.
                                    Với khả năng hiển thị toàn bộ mạng lưới giao thông tại Đà Nẵng, bản đồ giúp người dùng dễ dàng theo dõi tình trạng các tuyến đường chính,
                                    các điểm ùn tắc và khu vực đông đúc, được đánh dấu bằng các màu sắc trực quan (xanh lá cây, vàng, đỏ).
                                    {collapse2 && (
                                        <p>
                                            Kết hợp dữ liệu từ camera AI, hệ thống không chỉ gợi ý các tuyến đường tối ưu để tiết kiệm thời gian di chuyển mà còn cung cấp thông tin chỉ tiết
                                            về khoảng cách, thời gian ước tính và các tuyến đường thay thế.
                                        </p>)}
                                </p>
                                <div className="flex">
                                    <Button className="px-6" style={{ backgroundColor: '#63E72E' }} onClick={() => setCollapse2(true)} size="xl">Xem thêm</Button>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Contact Section */}
                    <section className="text-white py-14">
                        <h1 className="text-center text-4xl text-white  font-bold">Liên hệ với chúng tôi</h1>
                        <div className="flex md:grid-cols-3 gap-8 items-center mt-8 space-be">
                            <div className="flex flex-col items-center w-1/3">
                                <IoLocation style={{ transform: 'scale(2)', color: 'green' }} />
                                <h3 className="font-bold text-xl mb-4 mt-4">Địa chỉ</h3>
                                <p>123, Tran Dai Nghia, Hoa Hai, Ngu Hanh Son, Da Nang</p>
                            </div>
                            <div className="flex flex-col items-center w-1/3">
                                <FaAddressBook style={{ transform: 'scale(2)', color: 'green' }} />
                                <h3 className="font-bold text-xl mb-4 mt-4">Liên hệ</h3>
                                <p>Email: clearwaytms@gmail.com</p>
                                <p>Phone: +84 332101033</p>
                            </div>
                            <div className="flex flex-col items-center w-1/3">
                                <FaClock style={{ transform: 'scale(2)', color: 'green' }} />
                                <h3 className="font-bold text-xl mb-4 mt-4">Giờ làm việc</h3>
                                <p>Thứ 2 - Thứ 6</p>
                                <p>8:00 AM - 5:00 PM</p>
                            </div>
                        </div>
                    </section>
                </>
            </main>
        </div>
    );
}
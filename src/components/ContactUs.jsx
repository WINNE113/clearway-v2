import { Header } from "../components/index";

export default function ContactUs() {
    return (
        <div className="min-h-screen !bg-gradient-to-b from-[#408DEF] to-[#408DEF]" >
            <Header />
            <main className="container flex mx-auto justify-center mt-0" style={{ height: '86vh' }}>
                <>
                    <section className="w-3/4 h-100" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
                            <div className="flex justify-center md:justify-end space-x-4" style={{ marginleft: '25rem' }}>
                                <img src="/public/map2.png" alt="Phone 1" style={{ width: '100%', height: '370px' }} className="object-cover"/>
                            </div>
                            <div className="ml-32 md:text-left text-left">
                                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-left text-white ">
                                    Liên hệ với chúng tôi
                                </h1>
                                <div className=" text-white justify-between grid grid-cols-1 md:grid-cols-2 gap-8  mt-8 space-be">
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-2xl mb-4 mt-4 text-left" style={{ color: '#F89955' }}>Địa chỉ</h3>
                                        <p>123, Tran Dai Nghia, Hoa Hai, Ngu Hanh Son, Da Nang</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-2xl mb-4 mt-4" style={{ color: '#F89955' }}>Liên hệ</h3>
                                        <p>Email: clearwaytms@gmail.com</p>
                                        <p>Phone: +84 332101033</p>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h3 className="font-bold text-2xl mb-4 mt-4" style={{ color: '#F89955' }}>Giờ làm việc</h3>
                                        <p>Thứ 2 - Thứ 6</p>
                                        <p>8:00 AM - 5:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            </main>
        </div>
    );
}
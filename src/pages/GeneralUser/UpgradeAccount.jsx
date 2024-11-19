import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Button, Spinner } from 'flowbite-react';
import { get_package_premium, create_payment_link } from "../../service/UpgradeAccountAPI"

export default function UpgradeAccount() {
  const [loading, setLoading] = useState(true);
  const [premiumPackages, setPremiumPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [user, setUser] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await get_package_premium();
        const packages = response.data;
        setPremiumPackages(packages);
        setSelectedPackage(packages.length > 0 ? packages[0] : "");
      } catch (error) {
        console.error('Failed to fetch premium packages:', error);
      } finally{
        setLoading(false);
      }
    };
    fetchPackages();

    const storedData = localStorage.getItem("persist:root");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentUser = JSON.parse(parsedData.user).currentUser;
      setUser(currentUser);
    }else{
      navigation("/")
    }
  }, [navigation]);

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  const handleSelectChange = (event) => {    
    const selectedId = premiumPackages.find(pkg => pkg._id === event.target.value);
    setSelectedPackage(selectedId);
  };

  const handleBill = async () => {
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: selectedPackage.price,
      description: `${selectedPackage.name_package} ${formatPrice(selectedPackage.price)} VND`,
      package: selectedPackage._id,
      email: user.email,
      returnUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/generaluser/dashboard?tab=upgrade-account`,
    };
    const res =  await create_payment_link(body)
    window.location.href = res.data.checkoutUrl;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex m-9 bg-white h-full gap-9">
      <div className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <div className="justify-center text-center m-9 text-2xl font-bold">Giới thiệu gói nâng cấp</div>
        <div className="m-10 justify-center">
        {selectedPackage.name_package ? 
          <div className='flex-row'>
            <label className='text-lg font-semibold'>Gói nâng cấp</label>
            <p className='border-2 rounded-lg p-2'>{selectedPackage.name_package}</p>
            <label className='text-lg font-semibold'>Thời hạn</label>
            <p className='border-2 rounded-lg p-2'>{selectedPackage.time_package.split(',')[0].split(' ')[0]} Ngày</p>
            <label className='text-lg font-semibold'>Giá</label>
            <p className='border-2 rounded-lg p-2'>{formatPrice(selectedPackage.price)} VND</p>
            <label className='text-lg font-semibold'>Mô tả</label>
            <p className='border-2 rounded-lg p-2'>{selectedPackage.description}</p>
          </div>
          : 
        ''} 
        </div>
      </div>
      <div className='flex-1'>
        <div className='my-4'>
          <div className='justify-center text-center m-9 text-2xl font-bold'>Thông tin tài khoản</div>
          {user && (
              <div className='flex flex-col gap-2 border-2 rounded-lg p-4 mr-9'>
                <p><strong>Họ và Tên:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Số điện thoại:</strong> {user.phone_number ? user.phone_number : 'Chưa cập nhật vào tài khoản'}</p>
                <p><strong>Giới tính:</strong> {user.gender? (user.gender==="Male"?"Nam":"Nữ") :'Chưa cập nhật vào tài khoản'}</p>
              </div>
            )}
        </div>
        <div className="flex flex-col items-center gap-4">
          <strong>Chọn gói nâng cấp</strong>
          <Select className='w-fit' id="package_upgrade" required onChange={handleSelectChange}>
            {premiumPackages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name_package} - {formatPrice(pkg.price)} VND
              </option>
            ))}
          </Select> 
          <Button className='mt-8' gradientDuoTone="pinkToOrange" onClick={handleBill}>Nâng cấp tài khoản</Button>
        </div>
      </div>
    </div>
  );
}
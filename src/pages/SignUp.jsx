import { Alert, Button, Label, Spinner, TextInput, Modal } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {signup, verifyemail} from "../service/UserAPI"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, query, get, orderByChild, equalTo } from 'firebase/database';
import { db } from '../firebase';
import { generateKeywords } from '../redux/auth-context';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setErrorMessage(null);
  };

  const handleBlur = (e) => {
    setErrorMessage(null);
    const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");
    const validEmail = new RegExp("^[a-zA-Z0-9._:$!%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    const validOtp = new RegExp("/^[0-9]{0,6}$/");
    
    if(e.target.id === "email" && (!formData.email || formData.email === "")){
      return setErrorMessage('Vui lòng điền vào trường email.');
    }
    
    if(e.target.id === "re_password" && (!formData.re_password || formData.re_password === "")){
      return setErrorMessage('Vui lòng điền vào trường nhập lại mật khẩu.');
    }

    if(e.target.id === "password" && (!formData.password || formData.password === "")){
      return setErrorMessage('Vui lòng điền vào tất cả các trường.');
    }

    if(e.target.id === 'email' && !validEmail.test(formData.email)){
      return setErrorMessage('Email không hợp lệ');
    }

    if(e.target.id === 'password' && !validPassword.test(formData.password)){
      return setErrorMessage('Mật khẩu phải có ít nhất sáu ký tự, ít nhất một chữ cái, một số');
    }

    if(e.target.id === 'verify' && !validOtp.test(formData.verify)){
      return setErrorMessage('OTP chỉ cần nhập số');
    }
  }

  const handleVerifyEmail = async(e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.email || !formData.password || !formData.re_password || formData.email === "" || formData.password === "" || formData.re_password === "" ) {
      return setErrorMessage("Vui lòng điền vào tất cả các trường.");
    }

    if (formData.password !== formData.re_password) {
      return setErrorMessage("Mật khẩu không hợp lệ.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await verifyemail(formData)
      if (res.status !== 200) {
        setLoading(false);
        return setErrorMessage(res.message);
      }
      setLoading(false);
      if (res.status === 200) {
        setOpenModal(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.re_password || !formData.otp) {
      return setErrorMessage('Vui lòng điền vào tất cả các trường.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const emailQuery = query(ref(db, 'users'), orderByChild('email'), equalTo(formData.email));

      const emailSnapshot = await get(emailQuery);
      if (emailSnapshot.exists()) {
        setLoading(false);
        return setErrorMessage("Email đã được đăng ký.");
      }

      const res = await signup(formData)
      
      if (res.status !== 200) {
        return setErrorMessage(res.detail);
      }

      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      await set(ref(db, 'users/' + auth.currentUser.uid), {
        displayName: '',
        email: formData.email,
        photoURL: '',
        uid: auth.currentUser.uid,
        providerId: 'password',
        keywords: generateKeywords(formData.email),
      });

      setLoading(false);
      if(res.status === 200) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Clear
            </span>
            Way
          </Link>
          <p className='text-sm mt-5'>
            Bạn có thể đăng ký bằng email và mật khẩu hoặc bằng Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label value='Nhập mật khẩu' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Label value='Nhập lại mật khẩu' />
              <TextInput
                type='password'
                placeholder='Password'
                id='re_password'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='button'
              disabled={loading}
              onClick={handleVerifyEmail}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Đăng ký'
              )}
            </Button>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Mã xác minh email của bạn gồm 6 chữ số
                  </h3>
                  <div className="flex justify-center gap-4">
                    <input className="dark:bg-gray-800 dark:text-gray-200 text-center justify-between tracking-[1em] sm:p-2 sm:text-xs md:p-2.5 md:text-sm lg:p-4 lg:text-lg border-solid border-2 border-sky-500 hover:border-red-600" 
                    id="otp"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text" 
                    maxLength={6}></input>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="justify-center">
              <Button gradientDuoTone="pinkToOrange" type="submit" disabled={loading} onClick={handleSubmit}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Xác minh OTP"
                )}
              </Button>
              </Modal.Footer>
            </Modal>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Bạn đã có tài khoản chưa?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Đăng nhập
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {JSON.stringify(errorMessage)}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
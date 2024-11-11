import axios from "./axios"


export const verifyemail = async(data) => {
    try {
        console.log(data);
       
        const res = await axios.post('/api/auth/verify_email', data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch verify email');
    }
}


export const signup = async(data) => {
    try {
        const res = await axios.post('/api/auth/signup', data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch sign up');
    }
}


export const google = async(resultsFromGoogle) => {
    try {
        const res = await axios.post('/api/auth/google', {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL}
            )
        return res;
    } catch (error) {
        throw new Error('Failed to fetch sign in with google');
    }
}


export const login = async(data) => {
    try {
        const res = await axios.post('/api/auth/signin', data , { withCredentials: true });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch sign in');
    }
}


export const forgotpassword = async(data) => {
    try {
        const res = await axios.post('/api/auth/forgot_password', data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch forgot password');
    }
}


export const resetpasswordotp = async(data) => {
    try {
        const res = await axios.post('/api/auth/reset_password_otp', data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch reset password otp');
    }
}


export const resetpassword = async(data) => {
    try {
        const res = await axios.post('/api/auth/reset_password', data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch reset password');
    }
}


export const signout = async() => {
    try {
        const res = await axios.post('/api/user/signout', {}, { withCredentials: true });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch sign out');
    }
}


export const getusers = async() => {
    try {
        const res = await axios.post('/api/user/get_users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}


export const getuser = async(id) => {
    try {
        const res = await axios.post(`/api/user/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get user');
    }
}
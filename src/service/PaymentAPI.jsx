import axios from "./axios"

export const getPrimiumPackages = async () => {
    try {
        const res = await axios.get(`/api/payment/get_premium_packages`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get primium packages');
    }
}

export const createPrimiumPackage = async (data) => {
    try {
        const res = await axios.post(`/api/payment/create_premium_package`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create primium packages');
    }
}

export const updatePrimiumPackage = async (data, id) => {
    try {
        const res = await axios.put(`/api/payment/update_premium_package/${id}`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch update primium packages');
    }
}

export const deletePrimiumPackage = async (id) => {
    try {
        const res = await axios.delete(`/api/payment/delete_premium_package/${id}`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch delete primium packages');
    }
}

export const getUserPayment = async () => {
    try {
        const res = await axios.get(`/api/payment/get_payments`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get user payment');
    }
}

export const updateUserPayment = async (data, id) => {
    try {
        const res = await axios.put(`/api/payment/update_payment/${id}`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch update user payment');
    }
}


import axios from "./axios"

export const getPrimiumPackages = async() => {
    try {
        const res = await axios.get(`/api/payment/get_premium_packages`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get primium packages');
    }
}

export const createPrimiumPackage = async(data) => {
    try {
        const res = await axios.post(`/api/payment/create_premium_package`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create primium packages');
    }
}


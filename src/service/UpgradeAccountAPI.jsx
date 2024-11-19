import axios from "./axios"

export const get_package_premium = async() => {
    try {
        const res = await axios.get('/api/payment/get_premium_packages');
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get premium package');
    }
}

export const create_payment_link = async(data) => {
    try {
        const res = await axios.post('/api/payment/create_payment_link', data, {
            headers: { 'Content-Type': 'application/json' },
        });
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create payment link');
    }
}
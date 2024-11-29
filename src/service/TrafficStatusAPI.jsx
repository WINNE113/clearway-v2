import axios from "./axios"

export const getDataTraffics = async() => {
    try {
        const res = await axios.get('/api/camera/get_data_traffics');
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}

export const CreateDataTraffics = async (data) => {
    try {
        const res = await axios.post('/api/camera/create_data_traffic', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res; // Return response data
    } catch (error) {
       
        throw new Error('Failed to send traffic data');
    }
};

export const getDataTrafficSign = async() => {
    try {
        const res = await axios.get('/api/traffic_sign/get_traffic_signs');
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}

export const getDataTrafficRoute = async() => {
    try {
        const res = await axios.get('/api/traffic_route/get_traffic_routes');
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}
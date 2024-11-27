import axios from "./axios";

//// Traffic Sign - Biển Báo Giao Thông API ////
export const GetListTrafficSigns = async () => {
    try {
        const res = await axios.get(`/api/traffic_sign/get_traffic_signs`);
        return res;
    } catch (error) {
        throw new Error(`Failed to fetch list of traffic signs: ${error.message}`);
    }
};

export const GetTrafficSign = async (id) => {
    try {
        const res = await axios.get(`/api/traffic_sign/get_traffic_sign/${id}`);
        return res;
    } catch (error) {
        throw new Error(`Failed to fetch traffic sign by id: ${error.message}`);
    }
};

export const PostTrafficSign = async (data) => {
    try {
        const res = await axios.post(`/api/traffic_sign/create_traffic_sign`, data);
        return res;
    } catch (error) {
        throw new Error(`Failed to create traffic sign: ${error.message}`);
    }
};

export const PutTrafficSign = async (id, data) => {
    try {
        const res = await axios.put(`/api/traffic_sign/update_traffic_sign/${id}`, data);
        return res;
    } catch (error) {
        throw new Error(`Failed to update traffic sign: ${error.message}`);
    }
};

export const DeleteTrafficSign = async (id) => {
    try {
        const res = await axios.delete(`/api/traffic_sign/delete_traffic_sign/${id}`);
        return res;
    } catch (error) {
        throw new Error(`Failed to delete traffic sign: ${error.message}`);
    }
};
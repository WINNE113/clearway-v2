import axios from "./axios"

export const getRoads = async() => {
    try {
        const res = await axios.get(`/api/traffic_route/get_traffic_roads`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get traffic roads');
    }
}

export const createRoad = async(data) => {
    try {
        const res = await axios.post(`/api/traffic_route/create_traffic_road`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create road');
    }
}
export const createRouter = async(data) => {
    try {
        const res = await axios.post(`/api/traffic_route/create_traffic_route`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create route');
    }
}

export const updateRoad = async (data, id) => {
    try {
        const res = await axios.put(`/api/traffic_route/update_traffic_road/${id}`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch update road');
    }
}

export const updateRouter = async (data, id) => {
    try {
        const res = await axios.put(`/api/traffic_route/update_traffic_route/${id}`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch update router');
    }
}


export const deleteRoad= async (id) => {
    try {
        const res = await axios.delete(`/api/traffic_route/delete_traffic_road/${id}`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch delete road');
    }
}

export const deleteRouter= async (id) => {
    try {
        const res = await axios.delete(`/api/traffic_route/delete_traffic_route/${id}`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch delete router');
    }
}


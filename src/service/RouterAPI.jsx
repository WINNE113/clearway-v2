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
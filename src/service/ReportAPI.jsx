import axios from "./axios"

export const getReports = async() => {
    try {
        const res = await axios.get(`/api/report/get_reports`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get report');
    }
}

export const createReport = async(data) => {
    try {
        const res = await axios.post(`/api/report/create_report`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch create reports');
    }
}

export const updateReport = async (data, id) => {
    try {
        const res = await axios.put(`/api/report/update_report/${id}`, data);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch update report');
    }
}

export const deleteReport = async (id) => {
    try {
        const res = await axios.delete(`/api/report/delete_report/${id}`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch delete report');
    }
}



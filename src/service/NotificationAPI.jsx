import axios from "./axios"

export const getDataNotificationApi = async () => {
    try {
        const res = await axios.get('/api/notification/get_notifications');
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}

export const CreateNotificationsApi = async (data) => {
    try {
        const res = await axios.post('/api/notification/create_notification', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res; // Return response data
    } catch (error) {

        throw new Error('Failed to send traffic data');
    }
};



export const getDetailNotificationApi = async (id) => {
    try {
        const res = await axios.get(`/api/notification/get_notification/${id}`);
        return res;
    } catch (error) {
        throw new Error('Failed to fetch get list users');
    }
}


export const PutNotifcation = async (id, status) => {
    try {
        const res = await axios.put(`api/notification/update_notification/${id}`, status);
        return res;
    } catch (error) {
        throw new Error(`Failed to update camera: ${error.message}`);
    }
};


export const DeleteNotification = async (id) => {
    try {
        const res = await axios.delete(`/api/notification/delete_notification/${id}`);
        return res;
    } catch (error) {
        throw new Error(`Failed to delete camera: ${error.message}`);
    }
};
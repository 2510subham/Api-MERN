import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const fetchData = async (path) => {
    try {
        const response = await axios.get(`${url}${path}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
}

export const updateData = async (path, id, data) => {
    try {
        console.log(data)
        const response = await axios.put(`${url}${path}/${id}`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
}
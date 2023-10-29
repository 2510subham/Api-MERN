const axios = require('axios');
const { UserModel } = require('./model');

async function fetchDataFromAPI() {
    try {
        const response = await axios.get('https://gorest.co.in/public/v2/users');
        const data = response.data;

        await DataModel.bulkCreate(data);
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
}

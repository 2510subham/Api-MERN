const user = require('./model');

const addData = async (value) => {
    console.log(value);
    try {
        const response = await user.user.create(value);
        return response.dataValues;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { addData }
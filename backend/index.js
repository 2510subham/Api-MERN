const express = require('express');
const { sequelize } = require('./config');
const axios = require('axios');
const cors = require('cors');
const { user } = require('./model');
const { addData } = require('./controller');

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World");
})
async function connectDB() {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.get("/fetchUser", async (req, res) => {
    try {
        const response = await axios.get('https://gorest.co.in/public/v2/users');
        const data = response.data;
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            addData(data[i]);
        }
        res.send({ data })

    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
});

app.get("/getUser", async (req, res) => {
    try {
        const response = await user.findAll();
        res.send({ response })
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
});

app.put("/updateUser/:id", async (req, res) => {
    console.log(req.params.id, req.body)
    try {
        const response = await user.update(req.body, {
            where: { id: req.params.id }
        });
        console.log(response);
        res.send({ response })
    } catch (error) {
        console.error('Error fetching data from the API:', error);
    }
});



app.listen(3000, async () => {
    await connectDB();
    console.log("Server is running on port 3000");
})
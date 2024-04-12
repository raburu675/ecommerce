const axios = require('axios');
const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());

//import the controller functions
const { createToken } = require('./controllerFile')
const { stkPush } = require('./controllerFile')

// Set up routes
//When a GET request is made to /generateToken, the route handler function defined above will be executed. 
//This function calls the createToken function, which generates and returns an access token. 
//Once the token is obtained, it's sent back as a response to the client.

app.get('/generateToken', async (req, res) => {
    try {
        //pass the imported createToken() function from the controllerFile.js
        const token = await createToken();
        res.json({ token });
        console.log(token)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//this route is triggered from the frontend and calls the imported stkPush() function
app.post('/stkPush', async (req, res) => {
    try {
        //call the imported stkPush() function imported from controllerFile.js 
        await stkPush(req.body);
        res.sendStatus(200);
        //console.log(stkPush)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

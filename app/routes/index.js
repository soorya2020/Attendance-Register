const router = require('express').Router()

const baseUrl = '/api';


//all route file can be imported here
const userRoute = require(`./turorial.routes`);

//all the routes will be registered here
router.use(baseUrl, userRoute);

module.exports = router;

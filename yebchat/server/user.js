const express = require('express');
const Router = express.Router();

Router.get('/info', (req, rsp) =>{
	return rsp.json({code:1});
});

module.exports = Router;
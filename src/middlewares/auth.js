const { unAuthorizeCode, internalServerCode } = require("../status-code");
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {

		const headers = req.get('Authorization');
		
		if (headers === undefined) {
			return res.status(unAuthorizeCode.statusCode).send(
				{
					status: unAuthorizeCode.statusData,
					message: 'Access Denied!',
				});
		}

		const dataHeader = headers.split(' ');
		const authType = dataHeader[0];
		const token = dataHeader[1];
			
		if (!authType) {
			return res.status(unAuthorizeCode.statusCode).send(
				{
					status: unAuthorizeCode.statusData,
					message: 'Access Denied!',
				});
		}

		if (!token) {
			return res.status(unAuthorizeCode.statusCode).send(
				{
					status: unAuthorizeCode.statusData,
					message: 'Access Denied!',
				});
		}

		const SECRET_KEY = jwt.verify(token, process.env.SECRET_KEY);
		req.user = SECRET_KEY;
		next();

	} catch (error) {

		res.status(500).send({
			status: error.name,
			message: error.message
		});

	}
}

module.exports = auth;
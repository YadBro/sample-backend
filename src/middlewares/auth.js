const { unAuthorizeCode, internalServerCode } = require("../status-code");
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	try {

		const headers = req.get('Authorization').split(' ');
		const authType = headers[0];
		const token = headers[1];
	
		if (!authType) {
			res.status(unAuthorizeCode.statusCode).send(
				{
					status: unAuthorizeCode.statusData,
					message: 'Access Denied!',
				});
		}

		// const SECRET_KEY = jwt.verify(token, process.env.SECRET_KEY);
		// req.user = SECRET_KEY;
		return next();

	} catch (error) {

		res.status(500).send({
			status: error.name,
			message: error.message
		});
		console.log(error);

	}
}

module.exports = auth;
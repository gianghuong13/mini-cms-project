// input: req, res, proceed
// check authorization header then get token, auth header co dang: Bearer + token
// decode token to get user
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Missing or invalid token'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, sails.config.custom.jwtSecret);

        req.user = decoded;
        
        return proceed();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
}; 
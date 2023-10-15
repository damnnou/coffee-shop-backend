const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;

            next();
        } catch(e) {
            return res.json({
                message: 'unauthorized token'
            })
        }
    } else {
        return res.json({
            message: 'unauthorized token'
        })
    }
}

module.exports = { checkAuth };
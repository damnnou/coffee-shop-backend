const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;

            next();
        } catch(e) {
            return res.json({
                message: 'no success'
            })
        }
    } else {
        return res.json({
            message: 'no success'
        })
    }
}

module.exports = {checkAuth};
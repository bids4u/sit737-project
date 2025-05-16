const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET ;

const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
    };
    const options = { expiresIn: '1h' };
    return jwt.sign(payload, secret, options);
};

module.exports = generateToken;

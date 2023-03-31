require('dotenv').config()
const jwt = require("jsonwebtoken");

class TokenService {
    generateJwt(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '24h',
            }
        )
        return accessToken
    }
}

module.exports = new TokenService()

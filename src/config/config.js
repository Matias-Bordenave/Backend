const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, "../.env") })

const CONFIG = {
    mongo: {
        URI: process.env.MONGO_URI || ''
    },
    mailing: {
        SERVICE: process.env.MAILING_SERVICE || '',
        USER: process.env.MAILING_USER || '',
        PASSWORD: process.env.MAILING_PASSWORD || ''
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE || '',
        SECRET: process.env.JWT_SECRET || ''
    },
    PORT: process.env.PORT || 8080,
    DATASOURCE: process.env.DATASOURCE || '',
    ENVIRONMENT: process.env.ENVIRONMENT || ''
}

module.exports = CONFIG 
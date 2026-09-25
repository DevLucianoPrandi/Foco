const config = {
    appConfig:{
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },

    dbConfig:{
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
    },

    emailConfig:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
}

module.exports = config
const winston = require("winston")

const levelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        debug: 'white'
    }
}

const logger = winston.createLogger({
    levels: levelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format:
                winston.format.simple()
        }),

        new winston.transports.File({
            filename: 'errors.log',
            level: "error",
            format: winston.format.simple()
        })
    ]
});

const addLogger = (req, res, next) => {
    req.logger = logger
    /* req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger.warn(`Soy un warn`) */
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}



module.exports =
    addLogger
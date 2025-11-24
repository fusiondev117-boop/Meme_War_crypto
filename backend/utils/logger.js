const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'crypto-gamefi' },
    transports: [
        // Write all logs to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
                })
            )
        }),
        
        // Write all logs with level 'error' to error.log
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        
        // Write all logs to combined.log
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/exceptions.log')
        })
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/rejections.log')
        })
    ]
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Helper functions
const logInfo = (message, meta = {}) => {
    logger.info(message, meta);
};

const logError = (message, error = null, meta = {}) => {
    logger.error(message, { ...meta, error: error?.message, stack: error?.stack });
};

const logWarn = (message, meta = {}) => {
    logger.warn(message, meta);
};

const logDebug = (message, meta = {}) => {
    logger.debug(message, meta);
};

// Log user activity
const logUserActivity = (userId, action, details = {}) => {
    logger.info('User Activity', {
        userId,
        action,
        ...details,
        timestamp: new Date().toISOString()
    });
};

// Log game activity
const logGameActivity = (userId, gameType, action, details = {}) => {
    logger.info('Game Activity', {
        userId,
        gameType,
        action,
        ...details,
        timestamp: new Date().toISOString()
    });
};

// Log transaction
const logTransaction = (userId, type, amount, coinType, details = {}) => {
    logger.info('Transaction', {
        userId,
        type,
        amount,
        coinType,
        ...details,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    logger,
    info: logInfo,
    error: logError,
    warn: logWarn,
    debug: logDebug,
    success: logInfo, // Alias for success messages
    logInfo,
    logError,
    logWarn,
    logDebug,
    logUserActivity,
    logGameActivity,
    logTransaction
};

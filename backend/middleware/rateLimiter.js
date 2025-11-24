const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiter for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        status: false,
        message: 'Too many authentication attempts, please try again later.'
    },
    skipSuccessfulRequests: true,
});

// Game bet rate limiter
const betLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30, // Limit each IP to 30 bets per minute
    message: {
        status: false,
        message: 'Too many bets, please slow down.'
    },
});

// Email verification rate limiter
const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 email requests per hour
    message: {
        status: false,
        message: 'Too many email requests, please try again later.'
    },
});

module.exports = {
    apiLimiter,
    authLimiter,
    betLimiter,
    emailLimiter
};

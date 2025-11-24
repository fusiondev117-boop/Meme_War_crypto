const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Security middleware configuration
const securityMiddleware = (app) => {
    // Set security HTTP headers
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                imgSrc: ["'self'", 'data:', 'https:'],
            },
        },
        crossOriginEmbedderPolicy: false,
    }));

    // Sanitize data against NoSQL injection
    app.use(mongoSanitize());

    // Prevent XSS attacks
    app.use(xss());

    // Prevent HTTP Parameter Pollution
    app.use(hpp());

    // Add custom security headers
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        next();
    });
};

// Input validation helper
const validateInput = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    username: (username) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(username);
    },
    
    amount: (amount) => {
        return !isNaN(amount) && amount > 0 && amount <= 1000000;
    },
    
    coinType: (coinType) => {
        const validCoins = ['BTC', 'ETH', 'BNB', 'TRX', 'USDT', 'USDC', 'BIC', 'ZELO', 'SOL', 'BSC'];
        return validCoins.includes(coinType);
    },
    
    objectId: (id) => {
        return /^[0-9a-fA-F]{24}$/.test(id);
    }
};

// Sanitize user input
const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.trim().replace(/[<>]/g, '');
    }
    return input;
};

module.exports = {
    securityMiddleware,
    validateInput,
    sanitizeInput
};

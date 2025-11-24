// Global error handler middleware

const errorHandler = (err, req, res, next) => {
    // Log error details
    console.error('═══════════════════════════════════════════════════');
    console.error('❌ ERROR OCCURRED');
    console.error('Time:', new Date().toISOString());
    console.error('Path:', req.path);
    console.error('Method:', req.method);
    console.error('IP:', req.ip);
    console.error('User:', req.body?.userId || 'Not authenticated');
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    console.error('═══════════════════════════════════════════════════');

    // Determine error type and status code
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Don't leak error details in production
    const response = {
        status: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && {
            error: err.message,
            stack: err.stack
        })
    };

    res.status(statusCode).json(response);
};

// 404 handler
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    errorHandler,
    notFoundHandler,
    asyncHandler
};

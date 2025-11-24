const mongoose = require('mongoose');

// Health check endpoint handler
const healthCheck = async (req, res) => {
    const healthStatus = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        services: {}
    };

    try {
        // Check MongoDB connection
        const mongoStatus = mongoose.connection.readyState;
        healthStatus.services.mongodb = {
            status: mongoStatus === 1 ? 'connected' : 'disconnected',
            readyState: mongoStatus
        };

        // Check memory usage
        const memoryUsage = process.memoryUsage();
        healthStatus.memory = {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        };

        // Check CPU usage
        const cpuUsage = process.cpuUsage();
        healthStatus.cpu = {
            user: cpuUsage.user,
            system: cpuUsage.system
        };

        // Overall health status
        const isHealthy = mongoStatus === 1;
        healthStatus.status = isHealthy ? 'OK' : 'DEGRADED';

        res.status(isHealthy ? 200 : 503).json(healthStatus);
    } catch (error) {
        healthStatus.status = 'ERROR';
        healthStatus.error = error.message;
        res.status(503).json(healthStatus);
    }
};

// Readiness check (for Kubernetes)
const readinessCheck = async (req, res) => {
    try {
        // Check if MongoDB is ready
        const mongoReady = mongoose.connection.readyState === 1;
        
        if (mongoReady) {
            res.status(200).json({ status: 'ready' });
        } else {
            res.status(503).json({ status: 'not ready', reason: 'MongoDB not connected' });
        }
    } catch (error) {
        res.status(503).json({ status: 'not ready', error: error.message });
    }
};

// Liveness check (for Kubernetes)
const livenessCheck = (req, res) => {
    res.status(200).json({ status: 'alive' });
};

module.exports = {
    healthCheck,
    readinessCheck,
    livenessCheck
};

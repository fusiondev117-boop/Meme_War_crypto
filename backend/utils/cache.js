// Simple in-memory cache implementation
// For production, consider using Redis

class Cache {
    constructor() {
        this.cache = new Map();
        this.ttl = new Map();
    }

    // Set cache with TTL (time to live in seconds)
    set(key, value, ttlSeconds = 300) {
        this.cache.set(key, value);
        
        if (ttlSeconds > 0) {
            const expiryTime = Date.now() + (ttlSeconds * 1000);
            this.ttl.set(key, expiryTime);
            
            // Auto-cleanup after TTL
            setTimeout(() => {
                this.delete(key);
            }, ttlSeconds * 1000);
        }
        
        return true;
    }

    // Get cache value
    get(key) {
        // Check if expired
        if (this.ttl.has(key)) {
            const expiryTime = this.ttl.get(key);
            if (Date.now() > expiryTime) {
                this.delete(key);
                return null;
            }
        }
        
        return this.cache.get(key) || null;
    }

    // Check if key exists
    has(key) {
        return this.cache.has(key) && this.get(key) !== null;
    }

    // Delete cache entry
    delete(key) {
        this.cache.delete(key);
        this.ttl.delete(key);
        return true;
    }

    // Clear all cache
    clear() {
        this.cache.clear();
        this.ttl.clear();
        return true;
    }

    // Get cache size
    size() {
        return this.cache.size;
    }

    // Get all keys
    keys() {
        return Array.from(this.cache.keys());
    }

    // Cache statistics
    stats() {
        return {
            size: this.cache.size,
            keys: this.keys().length,
            memory: process.memoryUsage().heapUsed
        };
    }
}

// Create singleton instance
const cache = new Cache();

// Helper functions for common cache patterns
const cacheHelper = {
    // Cache user data
    cacheUser: (userId, userData, ttl = 300) => {
        return cache.set(`user:${userId}`, userData, ttl);
    },

    getUser: (userId) => {
        return cache.get(`user:${userId}`);
    },

    // Cache game data
    cacheGame: (gameId, gameData, ttl = 60) => {
        return cache.set(`game:${gameId}`, gameData, ttl);
    },

    getGame: (gameId) => {
        return cache.get(`game:${gameId}`);
    },

    // Cache balance
    cacheBalance: (userId, balance, ttl = 30) => {
        return cache.set(`balance:${userId}`, balance, ttl);
    },

    getBalance: (userId) => {
        return cache.get(`balance:${userId}`);
    },

    // Invalidate user cache
    invalidateUser: (userId) => {
        cache.delete(`user:${userId}`);
        cache.delete(`balance:${userId}`);
    }
};

module.exports = {
    cache,
    cacheHelper
};

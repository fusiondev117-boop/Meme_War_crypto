const themeConfig = {
    basename: '/',
    defaultPath: '/home',
    fontFamily: `'Inter', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    borderRadius: 16,
    // Modern gradient colors
    gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gaming: 'linear-gradient(135deg, #5A45D1 0%, #BA6AFF 100%)',
        dark: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
        gold: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    },
    // Modern shadow system
    shadows: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
        md: '0 4px 16px rgba(0, 0, 0, 0.12)',
        lg: '0 8px 32px rgba(0, 0, 0, 0.16)',
        xl: '0 16px 48px rgba(0, 0, 0, 0.20)',
        glow: '0 0 20px rgba(90, 69, 209, 0.4)',
    }
};

export default {
    themeConfig
};
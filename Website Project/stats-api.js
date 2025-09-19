/* ===== API INTEGRATION FOR DYNAMIC STATS ===== */

// Configuration object for API endpoints
const API_CONFIG = {
    // Replace with your actual API endpoints
    statsEndpoint: 'https://api.yourcompany.com/stats',
    
    // Alternative: Mock API for testing
    mockEndpoint: 'https://jsonplaceholder.typicode.com/posts/1',
    
    // Fallback data in case API fails
    fallbackData: {
        activeUsers: { value: 10000000, suffix: 'M+' },
        uptime: { value: 99.9, suffix: '%' },
        countries: { value: 150, suffix: '+' },
        support: { value: 24, suffix: '/7' }
    }
};

/* Fetch stats from API */
async function fetchStats() {
    try {
        // Show loading state
        showLoadingState();
        
        // Replace this URL with your actual API endpoint
        // Example API response should look like:
        // {
        //   "activeUsers": 12500000,
        //   "uptime": 99.97,
        //   "countries": 180,
        //   "support": "24/7"
        // }
        
        const response = await fetch(API_CONFIG.statsEndpoint);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process and display the data
        displayStats(data);
        
    } catch (error) {
        console.warn('Failed to fetch stats from API:', error);
        
        // Try fallback endpoint or use static data
        handleAPIError();
    }
}

/* Show loading state with shimmer effect */
function showLoadingState() {
    const statElements = document.querySelectorAll('.stat-item h3');
    statElements.forEach(element => {
        element.textContent = 'Loading...';
        element.className = 'loading';
    });
}

/* Display fetched stats with animation */
function displayStats(apiData) {
    // Map API data to display format
    const statsMapping = {
        activeUsers: {
            value: apiData.activeUsers || API_CONFIG.fallbackData.activeUsers.value,
            suffix: apiData.activeUsers >= 1000000 ? 'M+' : 'K+',
            element: document.querySelector('[data-stat="activeUsers"] h3')
        },
        uptime: {
            value: apiData.uptime || API_CONFIG.fallbackData.uptime.value,
            suffix: '%',
            element: document.querySelector('[data-stat="uptime"] h3')
        },
        countries: {
            value: apiData.countries || API_CONFIG.fallbackData.countries.value,
            suffix: '+',
            element: document.querySelector('[data-stat="countries"] h3')
        },
        support: {
            value: apiData.support || API_CONFIG.fallbackData.support.value,
            suffix: '/7',
            element: document.querySelector('[data-stat="support"] h3')
        }
    };

    // Animate each stat
    Object.keys(statsMapping).forEach(key => {
        const stat = statsMapping[key];
        if (stat.element) {
            // Remove loading class and add gradient styling
            stat.element.className = '';
            stat.element.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)';
            stat.element.style.backgroundClip = 'text';
            stat.element.style.webkitBackgroundClip = 'text';
            stat.element.style.webkitTextFillColor = 'transparent';
            
            // Create formatted final value
            const finalValue = formatStatValue(stat.value, stat.suffix);
            
            // Set the final value (animation will be handled by animations.js when scrolled into view)
            stat.element.textContent = finalValue;
        }
    });
}

/* Handle API errors gracefully */
function handleAPIError() {
    // You can implement different fallback strategies:
    
    // Option 1: Use fallback data
    displayStats(API_CONFIG.fallbackData);
    
    // Option 2: Show error message
    // showErrorState();
    
    // Option 3: Hide the section entirely
    // hideStatsSection();
}

/* Format stat values for display */
function formatStatValue(value, suffix) {
    if (suffix === 'M+') {
        return (value / 1000000).toFixed(1) + 'M+';
    } else if (suffix === 'K+') {
        return (value / 1000).toFixed(0) + 'K+';
    } else if (suffix === '%') {
        return value.toFixed(1) + '%';
    } else {
        return value + suffix;
    }
}

/* Show error state (alternative to fallback) */
function showErrorState() {
    const statElements = document.querySelectorAll('.stat-item h3');
    statElements.forEach(element => {
        element.textContent = 'Unable to load';
        element.className = 'error';
    });
}

/* Hide stats section entirely (alternative to fallback) */
function hideStatsSection() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsSection.style.display = 'none';
    }
}

/* Update stats periodically (optional) */
function startStatsUpdater(intervalMinutes = 5) {
    // Fetch immediately
    fetchStats();
    
    // Then fetch every X minutes
    setInterval(fetchStats, intervalMinutes * 60 * 1000);
}

/* Initialize stats when page loads */
document.addEventListener('DOMContentLoaded', () => {
    // Start fetching stats
    fetchStats();
    
    // Optional: Auto-refresh stats every 5 minutes
    // startStatsUpdater(5);
});
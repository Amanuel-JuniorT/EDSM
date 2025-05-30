// DOM Elements
const marketPage = document.getElementById('market-page');
const stockDetailsPage = document.getElementById('stock-details-page');
const stocksTableBody = document.getElementById('stocks-table-body');
const watchlistBody = document.getElementById('watchlist-body');
const marketSearch = document.querySelector('.market-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const backToMarketBtn = document.getElementById('back-to-market');
const addToWatchlistBtn = document.getElementById('add-to-watchlist');
const tradeSharesInput = document.getElementById('trade-shares');
const tradeTotalValue = document.querySelector('.trade-total-value');
const toast = document.getElementById('toast');
const menuItems = document.querySelectorAll('.menu-item');

// Portfolio Data
const portfolioData = {
    labels: ['ETHAIR', 'ETHCOM', 'ETHEL', 'ETHBNK', 'ETHCES'],
    data: [2500.04, 656.00, 453.1, 342.00, 1233.76],
    backgroundColor: [
        '#1dbf73',
        '#ff5a5f',
        '#ffb800',
        '#4a90e2',
        '#9b59b6'
    ]
};

// State
let currentStock = null;
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let stocks = [
    { symbol: 'ETHAIR', name: 'Ethiopian Airlines', price: 2500.04, change: 2.0, marketCap: '45.2B', sector: 'Transportation', open: 2450.00, high: 2550.00, low: 2400.00, afterHours: 2510.00 },
    { symbol: 'ETHCOM', name: 'Ethio Telecom', price: 656.00, change: -23.1, marketCap: '12.8B', sector: 'Technology', open: 680.00, high: 690.00, low: 650.00, afterHours: 660.00 },
    { symbol: 'ETHBANK', name: 'Commercial Bank of Ethiopia', price: 1200.50, change: 5.2, marketCap: '28.4B', sector: 'Finance', open: 1180.00, high: 1220.00, low: 1170.00, afterHours: 1205.00 },
    { symbol: 'ETHSUGAR', name: 'Ethiopian Sugar Corporation', price: 450.75, change: -1.5, marketCap: '8.9B', sector: 'Consumer Goods', open: 455.00, high: 460.00, low: 445.00, afterHours: 452.00 },
    { symbol: 'ETHMIN', name: 'Ethiopian Mining Corporation', price: 890.25, change: 3.8, marketCap: '15.6B', sector: 'Energy', open: 880.00, high: 900.00, low: 875.00, afterHours: 895.00 },
    { symbol: 'ETHOIL', name: 'Ethiopian Oil & Gas', price: 1340.00, change: 1.2, marketCap: '20.1B', sector: 'Energy', open: 1320.00, high: 1355.00, low: 1310.00, afterHours: 1345.00 },
    { symbol: 'ETHAGR', name: 'Ethiopian Agriculture', price: 780.50, change: -0.8, marketCap: '10.2B', sector: 'Agriculture', open: 790.00, high: 800.00, low: 775.00, afterHours: 782.00 },
    { symbol: 'ETHBANK2', name: 'Dashen Bank', price: 1100.00, change: 2.5, marketCap: '18.7B', sector: 'Finance', open: 1080.00, high: 1115.00, low: 1075.00, afterHours: 1102.00 },
    { symbol: 'ETHFOOD', name: 'Ethiopian Food Processing', price: 320.00, change: 0.5, marketCap: '5.3B', sector: 'Consumer Goods', open: 318.00, high: 325.00, low: 315.00, afterHours: 321.00 },
    { symbol: 'ETHPHAR', name: 'Ethiopian Pharmaceuticals', price: 670.00, change: -2.2, marketCap: '7.8B', sector: 'Healthcare', open: 675.00, high: 680.00, low: 665.00, afterHours: 672.00 },
    { symbol: 'ETHCEM', name: 'Ethiopian Cement', price: 540.00, change: 4.1, marketCap: '6.2B', sector: 'Materials', open: 530.00, high: 545.00, low: 528.00, afterHours: 541.00 },
    { symbol: 'ETHCON', name: 'Ethiopian Construction', price: 980.00, change: 0.0, marketCap: '9.5B', sector: 'Industrials', open: 980.00, high: 990.00, low: 975.00, afterHours: 980.00 },
    { symbol: 'ETHINS', name: 'Ethiopian Insurance', price: 410.00, change: 1.7, marketCap: '4.8B', sector: 'Finance', open: 405.00, high: 415.00, low: 400.00, afterHours: 412.00 },
    { symbol: 'ETHLOG', name: 'Ethiopian Logistics', price: 600.00, change: -0.3, marketCap: '3.9B', sector: 'Transportation', open: 605.00, high: 610.00, low: 595.00, afterHours: 601.00 },
    { symbol: 'ETHTOUR', name: 'Ethiopian Tourism', price: 720.00, change: 2.9, marketCap: '8.1B', sector: 'Services', open: 710.00, high: 730.00, low: 705.00, afterHours: 722.00 },
    { symbol: 'ETHEDU', name: 'Ethiopian Education', price: 210.00, change: -1.1, marketCap: '2.2B', sector: 'Services', open: 212.00, high: 215.00, low: 208.00, afterHours: 211.00 },
    { symbol: 'ETHWAT', name: 'Ethiopian Water Works', price: 390.00, change: 0.9, marketCap: '3.1B', sector: 'Utilities', open: 388.00, high: 395.00, low: 385.00, afterHours: 391.00 },
    { symbol: 'ETHIT', name: 'Ethiopian IT Solutions', price: 1500.00, change: 6.0, marketCap: '13.5B', sector: 'Technology', open: 1480.00, high: 1515.00, low: 1475.00, afterHours: 1502.00 },
    { symbol: 'ETHFASH', name: 'Ethiopian Fashion', price: 250.00, change: -0.6, marketCap: '1.9B', sector: 'Consumer Goods', open: 252.00, high: 255.00, low: 248.00, afterHours: 251.00 },
    { symbol: 'ETHAUTO', name: 'Ethiopian Automotive', price: 1750.00, change: 3.3, marketCap: '16.2B', sector: 'Industrials', open: 1720.00, high: 1760.00, low: 1715.00, afterHours: 1752.00 }
];

let lastWatchlistAction = null;
let lastPage = 'market';

// Mock data for Buy and Sell
const mockPrices = { AAPL: 250, TSLA: 700, MSFT: 300 };
const mockOwnedStocks = [
  { ticker: 'AAPL', shares: 50, currentPrice: 250 },
  { ticker: 'TSLA', shares: 20, currentPrice: 700 }
];

// --- THEME MANAGEMENT REFACTOR ---
class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.themeToggleIcon = document.getElementById('theme-toggle-icon');
        this.settingsThemeSelect = document.getElementById('settings-theme-select');
        this.themeKey = 'theme';
        this.currentTheme = this.getInitialTheme();
        this.init();
    }

    getInitialTheme() {
        // 1. User preference
        const stored = localStorage.getItem(this.themeKey);
        if (stored === 'light' || stored === 'dark') return stored;
        // 2. System preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    init() {
        this.applyTheme(this.currentTheme);
        // Toggle button
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
            this.themeToggleBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
        // Settings select
        if (this.settingsThemeSelect) {
            this.settingsThemeSelect.addEventListener('change', (e) => {
                this.setTheme(e.target.value.toLowerCase());
            });
        }
        // System preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.themeKey)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem(this.themeKey, theme);
        this.applyTheme(theme);
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        // Sync UI
        if (this.themeToggleIcon) {
            this.themeToggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            this.themeToggleIcon.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
        if (this.themeToggleBtn) {
            this.themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
        if (this.settingsThemeSelect) {
            this.settingsThemeSelect.value = theme.charAt(0).toUpperCase() + theme.slice(1);
        }
        // Dispatch event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    // Initialize rest of the app
    initializeApp();
    renderPortfolioOverviewTable();
    renderMarketFeedTable();
    setupSettingsNavigation();
    setupTopSettingsTabs();
    setupHelpSectionNavigation();
});

function initializeApp() {
    renderStocksTable();
    renderWatchlist();
    setupEventListeners();
    setupMenuNavigation();
    initializePortfolioChart();
}

function setupEventListeners() {
    // Market search
    marketSearch.addEventListener('input', handleSearch);

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            handleFilter(btn.id);
        });
    });

    // Back to market button
    backToMarketBtn.addEventListener('click', () => {
        stockDetailsPage.style.display = 'none';
        marketPage.style.display = 'block';
    });

    // Back to watchlist button
    const backToWatchlistBtn = document.getElementById('back-to-watchlist');
    if (backToWatchlistBtn) {
        backToWatchlistBtn.addEventListener('click', () => {
            stockDetailsPage.style.display = 'none';
            const watchlistPage = document.getElementById('watchlist-page');
            if (watchlistPage) {
                watchlistPage.style.display = 'block';
            }
        });
    }

    // Add to watchlist button
    addToWatchlistBtn.addEventListener('click', handleAddToWatchlist);

    // Trade shares input
    tradeSharesInput.addEventListener('input', updateTradeTotal);

    // Quick Action: Buy Stock button
    const buyStockBtn = document.getElementById('quick-buy-stock');
    if (buyStockBtn) {
        buyStockBtn.addEventListener('click', () => {
            // Simulate clicking the Market menu item
            const marketMenuItem = Array.from(menuItems).find(item => item.dataset.page === 'market');
            if (marketMenuItem) {
                marketMenuItem.click();
            } else {
                handlePageNavigation('market');
            }
        });
    }

    // Quick Action: Add Fund button
    const addFundBtn = document.getElementById('quick-add-fund');
    if (addFundBtn) {
        addFundBtn.addEventListener('click', () => {
            // Simulate clicking the Portfolio menu item and show Add Fund modal/toast
            const portfolioMenuItem = Array.from(menuItems).find(item => item.dataset.page === 'portfolio');
            if (portfolioMenuItem) {
                portfolioMenuItem.click();
            } else {
                handlePageNavigation('portfolio');
            }
            // Optionally, trigger the Add Fund modal or toast here
            showToast('Add Fund clicked!');
        });
    }

    // Quick Action: Search button
    const searchBtn = document.getElementById('quick-search');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            // Go to Market page and focus the search input
            const marketMenuItem = Array.from(menuItems).find(item => item.dataset.page === 'market');
            if (marketMenuItem) {
                marketMenuItem.click();
            } else {
                handlePageNavigation('market');
            }
            setTimeout(() => {
                if (marketSearch) marketSearch.focus();
            }, 200);
        });
    }

    // Quick Action: View Watchlist button
    const viewWatchlistBtn = document.getElementById('quick-view-watchlist');
    if (viewWatchlistBtn) {
        viewWatchlistBtn.addEventListener('click', () => {
            handlePageNavigation('watchlist');
        });
    }
}

function setupMenuNavigation() {
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const page = item.dataset.page;
            handlePageNavigation(page);
        });
    });
}

function handlePageNavigation(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    
    // Show selected page
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        if (page === 'portfolio') {
            renderPortfolioPage();
        }
    }
    if (page === 'news') {
        setupNewsFilters();
        renderNews();
    }
    if (page === 'watchlist') {
        renderWatchlistPage();
    }
}

// Render Functions
function renderStocksTable(filteredStocks = stocks) {
    stocksTableBody.innerHTML = filteredStocks.map(stock => {
        const isInWatchlist = getWatchlist().includes(stock.symbol);
        return `
            <tr class="stock-row${isInWatchlist ? ' in-watchlist-row' : ''}" data-symbol="${stock.symbol}">
                <td>
                    <div class="stock-info">
                        <div class="stock-symbol">${stock.symbol}</div>
                        <div class="stock-name">${stock.name}</div>
                    </div>
                </td>
                <td>ETB ${stock.price.toFixed(2)}</td>
                <td class="${stock.change >= 0 ? 'positive' : 'negative'}">
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(1)}%
                </td>
                <td>ETB ${stock.marketCap}</td>
                <td>
                    <button class="btn btn-outline save-watchlist-btn${isInWatchlist ? ' in-watchlist' : ''}" data-symbol="${stock.symbol}" title="${isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}">
                        <i class="${isInWatchlist ? 'fas' : 'far'} fa-star"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Add click handlers for stock rows
    document.querySelectorAll('.stock-row').forEach(row => {
        row.addEventListener('click', (e) => {
            if (!e.target.closest('.save-watchlist-btn')) {
                const symbol = row.dataset.symbol;
                showStockDetails(symbol);
            }
        });
    });

    // Add click handlers for watchlist buttons
    document.querySelectorAll('.save-watchlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent row click
            const symbol = btn.dataset.symbol;
            const wl = getWatchlist();
            if (wl.includes(symbol)) {
                removeFromWatchlist(symbol);
            } else {
                handleAddToWatchlist(symbol);
            }
            // Animate button for feedback
            btn.classList.add('watchlist-animate');
            setTimeout(() => btn.classList.remove('watchlist-animate'), 300);
        });
    });
}

function renderWatchlist() {
    const wl = getWatchlist();
    watchlistBody.innerHTML = wl.map(symbol => {
        const stock = stocks.find(s => s.symbol === symbol);
        if (!stock) return '';
        return `
            <tr>
                <td>
                    <div class="stock-info">
                        <div class="stock-symbol">${stock.symbol}</div>
                        <div class="stock-name">${stock.name}</div>
                    </div>
                </td>
                <td>ETB ${stock.price.toFixed(2)}</td>
                <td class="${stock.change >= 0 ? 'positive' : 'negative'}">
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(1)}%
                </td>
                <td>
                    <button class="btn btn-outline remove-watchlist-btn" data-symbol="${stock.symbol}">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Add click handlers for remove buttons
    document.querySelectorAll('.remove-watchlist-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const symbol = btn.dataset.symbol;
            removeFromWatchlist(symbol);
        });
    });
}

function showStockDetails(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;

    currentStock = stock;
    
    // Store the current page before showing details
    lastPage = document.querySelector('.page-content[style*="display: block"]').id.replace('-page', '');
    
    // First hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    
    // Then show the stock details page
    stockDetailsPage.style.display = 'block';

    // Update stock details
    document.getElementById('details-symbol').textContent = stock.symbol;
    document.getElementById('details-name').textContent = stock.name;
    document.getElementById('details-price').textContent = `ETB ${stock.price.toFixed(2)}`;
    document.getElementById('details-price-change').textContent = `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(1)}%`;
    document.getElementById('details-price-change').className = `price-change ${stock.change >= 0 ? 'positive' : 'negative'}`;
    document.getElementById('details-open').textContent = `ETB ${stock.open.toFixed(2)}`;
    document.getElementById('details-low').textContent = `ETB ${stock.low.toFixed(2)}`;
    document.getElementById('details-high').textContent = `ETB ${stock.high.toFixed(2)}`;
    document.getElementById('details-after-hours').textContent = `ETB ${stock.afterHours.toFixed(2)}`;
    document.getElementById('details-trade-stock').value = stock.symbol;

    // Update trade total
    updateTradeTotal();

    // Update watchlist button state
    updateWatchlistButtonState();
    setupTradePanelTabs();

    // Use requestAnimationFrame to ensure the page is rendered before scrolling
    requestAnimationFrame(() => {
        // Scroll to top of the page smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Event Handlers
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredStocks = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm) || 
        stock.name.toLowerCase().includes(searchTerm)
    );
    renderStocksTable(filteredStocks);
}

function handleFilter(filterId) {
    let filteredStocks = stocks;
    switch (filterId) {
        case 'tab-all':
            renderStocksTable(stocks);
            return;
        case 'tab-top-movers':
            filteredStocks = stocks.filter(stock => Math.abs(stock.change) > 2);
            break;
        case 'tab-technology':
            filteredStocks = stocks.filter(stock => stock.sector === 'Technology');
            break;
        case 'tab-finance':
            filteredStocks = stocks.filter(stock => stock.sector === 'Finance');
            break;
        case 'tab-energy':
            filteredStocks = stocks.filter(stock => stock.sector === 'Energy');
            break;
    }
    renderStocksTable(filteredStocks);
}

function handleAddToWatchlist(symbol = currentStock?.symbol) {
    if (!symbol) return;
    const wl = getWatchlist();
    if (wl.includes(symbol)) {
        showToast('Stock already in watchlist');
        return;
    }
    wl.push(symbol);
    setWatchlist(wl);
    renderWatchlist();
    updateWatchlistButtonState();
    renderStocksTable();
    renderWatchlistPage();
    lastWatchlistAction = { type: 'add', symbol };
    showToastWithUndo(`Added to watchlist`, undoWatchlistAction);
}

function removeFromWatchlist(symbol) {
    let wl = getWatchlist();
    wl = wl.filter(s => s !== symbol);
    setWatchlist(wl);
    renderWatchlist();
    updateWatchlistButtonState();
    renderStocksTable();
    renderWatchlistPage();
    lastWatchlistAction = { type: 'remove', symbol };
    showToastWithUndo(`Removed from watchlist`, undoWatchlistAction);
}

function updateWatchlistButtonState() {
    if (!currentStock) return;
    const isInWatchlist = watchlist.includes(currentStock.symbol);
    addToWatchlistBtn.innerHTML = `
        <i class="fas fa-star"></i>
        <span>${isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
    `;
    addToWatchlistBtn.onclick = () => {
        if (isInWatchlist) {
            removeFromWatchlist(currentStock.symbol);
        } else {
            handleAddToWatchlist();
        }
    };
}

function updateTradeTotal() {
    if (!currentStock) return;
    const shares = parseInt(tradeSharesInput.value) || 0;
    const total = shares * currentStock.price;
    tradeTotalValue.textContent = `ETB ${total.toFixed(2)}`;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initializePortfolioChart() {
    const ctx = document.getElementById('portfolio-donut').getContext('2d');
    const assets = getOwnedAssets();
    // Destroy previous chart instance if exists
    if (window.portfolioChart) {
        window.portfolioChart.destroy();
    }
    if (!assets.length) {
        // Show empty chart or clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '14px Ubuntu, Arial, sans-serif';
        ctx.fillStyle = '#888';
        ctx.textAlign = 'center';
        ctx.fillText('No Data', ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }
    window.portfolioChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: assets.map(a => a.symbol),
            datasets: [{
                data: assets.map(a => a.value),
                backgroundColor: [
                    '#1dbf73', '#ff5a5f', '#ffb800', '#4a90e2', '#9b59b6', '#e67e22', '#e74c3c', '#2ecc71', '#3498db', '#f39c12'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ETB ${value.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function renderPortfolioOverviewTable() {
    const tableBody = document.querySelector('.portfolio-table tbody');
    if (!tableBody) return;
    const assets = getOwnedAssets();
    if (!assets.length) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:#aaa;">No assets owned yet. Buy stocks from the Market to see them here.</td></tr>`;
        return;
    }
    tableBody.innerHTML = assets.map(asset => `
        <tr data-symbol="${asset.symbol}">
            <td>${asset.symbol}</td>
            <td>${asset.avgPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            <td class="${asset.change && asset.change >= 0 ? 'positive' : 'negative'}">${asset.change ? (asset.change > 0 ? '+' : '') + asset.change + '%' : ''}</td>
        </tr>
    `).join('');
    // Add click handlers for stock rows
    tableBody.querySelectorAll('tr[data-symbol]').forEach(row => {
        row.addEventListener('click', () => {
            const symbol = row.getAttribute('data-symbol');
            if (symbol) showStockDetails(symbol);
        });
    });
}

function renderMarketFeedTable() {
    const tableBody = document.querySelector('.market-feed-table tbody');
    if (!tableBody) return;
    const marketFeedRows = [
        { symbol: 'ETHAIR', price: 2500.04, change: 2 },
        { symbol: 'ETHCOM', price: 656.00, change: -23.1 },
        { symbol: 'ETHEL', price: 453.1, change: 21 },
        { symbol: 'ETHBNK', price: 342.00, change: 13.3 },
        { symbol: 'ETHCES', price: 1233.76, change: -1 },
        { symbol: 'ETHAIR', price: 2500.04, change: 2 },
        { symbol: 'ETHCOM', price: 656.00, change: -23.1 },
        { symbol: 'ETHEL', price: 453.1, change: 21 },
        { symbol: 'ETHBNK', price: 342.00, change: 13.3 },
        { symbol: 'ETHCES', price: 1233.76, change: -1 }
    ];
    // Only include rows where the symbol exists in the main stocks array
    const validSymbols = new Set(stocks.map(s => s.symbol));
    const filteredFeedRows = marketFeedRows.filter(row => validSymbols.has(row.symbol));
    tableBody.innerHTML = filteredFeedRows.map(row => `
        <tr data-symbol="${row.symbol}">
            <td>${row.symbol}</td>
            <td>${row.price}</td>
            <td class="${row.change >= 0 ? 'positive' : 'negative'}">${row.change > 0 ? '+' : ''}${row.change}%</td>
        </tr>
    `).join('');
    // Add click handlers for stock rows
    tableBody.querySelectorAll('tr[data-symbol]').forEach(row => {
        row.addEventListener('click', () => {
            const symbol = row.getAttribute('data-symbol');
            if (symbol) showStockDetails(symbol);
        });
    });
}

function undoWatchlistAction() {
    if (!lastWatchlistAction) return;
    
    if (lastWatchlistAction.type === 'add') {
        // Undo add: remove from watchlist
        watchlist = watchlist.filter(s => s !== lastWatchlistAction.symbol);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        showToast('Undo: Removed from watchlist');
    } else if (lastWatchlistAction.type === 'remove') {
        // Undo remove: add back to watchlist
        if (!watchlist.includes(lastWatchlistAction.symbol)) {
            watchlist.push(lastWatchlistAction.symbol);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            showToast('Undo: Added back to watchlist');
        }
    }
    
    // Update all relevant UI components
    renderWatchlist();
    updateWatchlistButtonState();
    renderStocksTable();
    renderWatchlistPage();
    
    // Clear the last action after undoing
    lastWatchlistAction = null;
}

function showToastWithUndo(message, undoCallback) {
    toast.innerHTML = `${message} <button id="undo-toast-btn" style="margin-left:16px;padding:2px 10px;border-radius:4px;border:none;background:var(--primary-color);color:#fff;cursor:pointer;">Undo</button>`;
    toast.classList.add('show');
    const undoBtn = document.getElementById('undo-toast-btn');
    if (undoBtn) {
        undoBtn.onclick = () => {
            undoCallback();
            toast.classList.remove('show');
        };
    }
    setTimeout(() => {
        toast.classList.remove('show');
    }, 6000);
}

// Trade panel tab switching
function setupTradePanelTabs() {
    const tradeTabs = document.querySelectorAll('.trade-tab');
    const tradeForm = document.querySelector('.trade-form');
    if (!tradeTabs.length || !tradeForm) return;
    tradeTabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            tradeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTradeForm(tab.textContent.trim());
        });
    });
    // Initial render
    const activeTab = document.querySelector('.trade-tab.active');
    renderTradeForm(activeTab ? activeTab.textContent.trim() : 'Buy');
}

function renderTradeForm(type) {
    const tradeForm = document.querySelector('.trade-form');
    if (!tradeForm) return;
    if (type === 'Buy') {
        tradeForm.innerHTML = `
            <div class="form-group">
                <label for="buy-stock-ticker">Stock</label>
                <input type="text" id="buy-stock-ticker" class="form-control" placeholder="AAPL, TSLA, MSFT">
            </div>
            <div class="form-group">
                <label for="buy-shares">Number of Shares</label>
                <input type="number" id="buy-shares" class="form-control" value="1" min="1">
            </div>
            <div class="trade-summary">
                <div class="summary-row">
                    <span>Estimated Cost</span>
                    <span class="trade-total-value">ETB 0.00</span>
                </div>
            </div>
            <button type="button" class="btn btn-primary trade-btn buy">Buy Stock</button>
        `;
        setupBuyTradeEvents();
    } else {
        // Sell
        tradeForm.innerHTML = `
            <div class="form-group">
                <label for="sell-stock-ticker">Stock</label>
                <select id="sell-stock-ticker" class="form-control">
                    ${mockOwnedStocks.map(s => `<option value="${s.ticker}">${s.ticker} (You own: ${s.shares})</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label for="sell-shares">Number of Shares</label>
                <input type="number" id="sell-shares" class="form-control" value="1" min="1">
            </div>
            <div class="trade-summary">
                <div class="summary-row">
                    <span>Estimated Return</span>
                    <span class="trade-total-value">ETB 0.00</span>
                </div>
            </div>
            <button type="button" class="btn btn-primary trade-btn sell">Sell Stock</button>
        `;
        setupSellTradeEvents();
    }
}

function setupBuyTradeEvents() {
    const tickerInput = document.getElementById('buy-stock-ticker');
    const sharesInput = document.getElementById('buy-shares');
    const totalValueElem = document.querySelector('.trade-total-value');
    const buyBtn = document.querySelector('.trade-btn.buy');
    function updateCost() {
        const ticker = tickerInput.value.trim().toUpperCase();
        const stock = stocks.find(s => s.symbol === ticker);
        const shares = Math.max(1, parseInt(sharesInput.value) || 1);
        const price = stock ? stock.price : 0;
        const total = shares * price;
        totalValueElem.textContent = `ETB ${total.toFixed(2)}`;
    }
    tickerInput.addEventListener('input', updateCost);
    sharesInput.addEventListener('input', () => {
        if (parseInt(sharesInput.value) < 1) sharesInput.value = 1;
        updateCost();
    });
    buyBtn.addEventListener('click', () => {
        const ticker = tickerInput.value.trim().toUpperCase();
        const shares = Math.max(1, parseInt(sharesInput.value) || 1);
        const stock = stocks.find(s => s.symbol === ticker);
        if (!ticker || !stock) {
            showToast('Please enter a valid stock ticker.');
            return;
        }
        if (shares < 1) {
            showToast('Number of shares must be at least 1.');
            return;
        }
        addOrUpdateOwnedAsset(stock.symbol, stock.name, shares, stock.price);
        showToast(`Successfully bought ${shares} shares of ${ticker} at ETB ${stock.price} each!`);
        // Update portfolio page if visible
        const portfolioPage = document.getElementById('portfolio-page');
        if (portfolioPage && portfolioPage.style.display !== 'none') {
            renderPortfolioPage();
        }
    });
    updateCost();
}

function setupSellTradeEvents() {
    const stockSelect = document.getElementById('sell-stock-ticker');
    const sharesInput = document.getElementById('sell-shares');
    const totalValueElem = document.querySelector('.trade-total-value');
    const sellBtn = document.querySelector('.trade-btn.sell');
    function getSelectedStock() {
        return mockOwnedStocks.find(s => s.ticker === stockSelect.value);
    }
    function updateReturn() {
        const stock = getSelectedStock();
        const maxShares = stock ? stock.shares : 1;
        let shares = parseInt(sharesInput.value) || 1;
        if (shares < 1) shares = 1;
        if (shares > maxShares) shares = maxShares;
        sharesInput.value = shares;
        const total = shares * (stock ? stock.currentPrice : 0);
        totalValueElem.textContent = `ETB ${total.toFixed(2)}`;
    }
    stockSelect.addEventListener('change', updateReturn);
    sharesInput.addEventListener('input', updateReturn);
    sellBtn.addEventListener('click', () => {
        const stock = getSelectedStock();
        const shares = parseInt(sharesInput.value) || 1;
        if (!stock) {
            showToast('Please select a stock to sell.');
            return;
        }
        if (shares < 1 || shares > stock.shares) {
            showToast('Invalid number of shares.');
            return;
        }
        showToast(`Successfully sold ${shares} shares of ${stock.ticker} at ETB ${stock.currentPrice} each!`);
        sharesInput.value = 1;
        updateReturn();
    });
    updateReturn();
}

// --- Advanced Add Fund & Withdraw Modal Logic ---
// Utility: get/set balance
function getAvailableBalance() {
    return parseFloat(localStorage.getItem('availableBalance')) || 10340.32;
}
function setAvailableBalance(val) {
    localStorage.setItem('availableBalance', val.toFixed(2));
    // Update all UI locations
    const balEls = [
        document.querySelector('.dashboard-summary-cards .summary-card:nth-child(3) .summary-value'),
        document.getElementById('portfolio-cash'),
        document.getElementById('add-fund-current-balance'),
        document.getElementById('withdraw-current-balance')
    ];
    balEls.forEach(el => { if (el) el.textContent = 'ETB ' + val.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}); });
}
setAvailableBalance(getAvailableBalance());

// --- Add Fund Modal ---
const addFundModal = document.getElementById('add-fund-modal');
const addFundAmountInput = document.getElementById('add-fund-amount');
const addFundConfirmBtn = document.getElementById('add-fund-confirm');
const addFundCancelBtn = document.getElementById('add-fund-cancel');
const addFundAmountError = document.getElementById('add-fund-amount-error');
const addFundMethods = document.getElementById('add-fund-methods');
const addFundNote = document.getElementById('add-fund-note');
const addFundLoading = document.getElementById('add-fund-loading');
const addFundSuccess = document.getElementById('add-fund-success');
const addFundCurrentBalance = document.getElementById('add-fund-current-balance');
let addFundSelectedMethod = 'bank';

function showAddFundModal() {
    if (addFundModal) {
        addFundModal.style.display = 'flex';
        addFundAmountInput.value = '';
        addFundNote.value = '';
        addFundAmountError.textContent = '';
        addFundLoading.style.display = 'none';
        addFundSuccess.style.display = 'none';
        addFundConfirmBtn.disabled = false;
        addFundCurrentBalance.textContent = 'ETB ' + getAvailableBalance().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
        addFundAmountInput.focus();
        // Reset method
        Array.from(addFundMethods.children).forEach(btn => btn.classList.remove('active'));
        addFundMethods.querySelector('[data-method="bank"]').classList.add('active');
        addFundSelectedMethod = 'bank';
    }
}
function hideAddFundModal() {
    if (addFundModal) addFundModal.style.display = 'none';
}
if (addFundMethods) {
    addFundMethods.onclick = function(e) {
        if (e.target.closest('.modal-method-btn')) {
            Array.from(addFundMethods.children).forEach(btn => btn.classList.remove('active'));
            e.target.closest('.modal-method-btn').classList.add('active');
            addFundSelectedMethod = e.target.closest('.modal-method-btn').dataset.method;
        }
    };
}
if (addFundConfirmBtn) {
    addFundConfirmBtn.onclick = function() {
        const amt = parseFloat(addFundAmountInput.value);
        addFundAmountError.textContent = '';
        if (!amt || amt < 1) {
            addFundAmountError.textContent = 'Enter a valid amount (min 1 ETB).';
            addFundAmountInput.focus();
            return;
        }
        addFundConfirmBtn.disabled = true;
        addFundLoading.style.display = 'flex';
        setTimeout(() => {
            addFundLoading.style.display = 'none';
            setAvailableBalance(getAvailableBalance() + amt);
            addFundSuccess.style.display = 'flex';
            setTimeout(() => {
                hideAddFundModal();
            }, 1200);
        }, 1200);
    };
}
if (addFundCancelBtn) addFundCancelBtn.onclick = hideAddFundModal;
if (addFundModal) {
    addFundModal.addEventListener('click', (e) => {
        if (e.target === addFundModal) hideAddFundModal();
    });
}
addFundAmountInput && addFundAmountInput.addEventListener('input', function() {
    addFundAmountError.textContent = '';
    addFundConfirmBtn.disabled = false;
});
addFundAmountInput && addFundAmountInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addFundConfirmBtn.click();
});
addFundNote && addFundNote.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addFundConfirmBtn.click();
});

// --- Withdraw Modal ---
const withdrawModal = document.getElementById('withdraw-modal');
const withdrawAmountInput = document.getElementById('withdraw-amount');
const withdrawConfirmBtn = document.getElementById('withdraw-confirm');
const withdrawCancelBtn = document.getElementById('withdraw-cancel');
const withdrawAmountError = document.getElementById('withdraw-amount-error');
const withdrawMethods = document.getElementById('withdraw-methods');
const withdrawNote = document.getElementById('withdraw-note');
const withdrawLoading = document.getElementById('withdraw-loading');
const withdrawSuccess = document.getElementById('withdraw-success');
const withdrawCurrentBalance = document.getElementById('withdraw-current-balance');
let withdrawSelectedMethod = 'bank';

function showWithdrawModal() {
    if (withdrawModal) {
        withdrawModal.style.display = 'flex';
        withdrawAmountInput.value = '';
        withdrawNote.value = '';
        withdrawAmountError.textContent = '';
        withdrawLoading.style.display = 'none';
        withdrawSuccess.style.display = 'none';
        withdrawConfirmBtn.disabled = false;
        withdrawCurrentBalance.textContent = 'ETB ' + getAvailableBalance().toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
        withdrawAmountInput.focus();
        // Reset method
        Array.from(withdrawMethods.children).forEach(btn => btn.classList.remove('active'));
        withdrawMethods.querySelector('[data-method="bank"]').classList.add('active');
        withdrawSelectedMethod = 'bank';
    }
}
function hideWithdrawModal() {
    if (withdrawModal) withdrawModal.style.display = 'none';
}
if (withdrawMethods) {
    withdrawMethods.onclick = function(e) {
        if (e.target.closest('.modal-method-btn')) {
            Array.from(withdrawMethods.children).forEach(btn => btn.classList.remove('active'));
            e.target.closest('.modal-method-btn').classList.add('active');
            withdrawSelectedMethod = e.target.closest('.modal-method-btn').dataset.method;
        }
    };
}
if (withdrawConfirmBtn) {
    withdrawConfirmBtn.onclick = function() {
        const amt = parseFloat(withdrawAmountInput.value);
        withdrawAmountError.textContent = '';
        if (!amt || amt < 1) {
            withdrawAmountError.textContent = 'Enter a valid amount (min 1 ETB).';
            withdrawAmountInput.focus();
            return;
        }
        if (amt > getAvailableBalance()) {
            withdrawAmountError.textContent = 'Insufficient balance!';
            withdrawAmountInput.focus();
            return;
        }
        withdrawConfirmBtn.disabled = true;
        withdrawLoading.style.display = 'flex';
        setTimeout(() => {
            withdrawLoading.style.display = 'none';
            setAvailableBalance(getAvailableBalance() - amt);
            withdrawSuccess.style.display = 'flex';
            setTimeout(() => {
                hideWithdrawModal();
            }, 1200);
        }, 1200);
    };
}
if (withdrawCancelBtn) withdrawCancelBtn.onclick = hideWithdrawModal;
if (withdrawModal) {
    withdrawModal.addEventListener('click', (e) => {
        if (e.target === withdrawModal) hideWithdrawModal();
    });
}
withdrawAmountInput && withdrawAmountInput.addEventListener('input', function() {
    withdrawAmountError.textContent = '';
    withdrawConfirmBtn.disabled = false;
});
withdrawAmountInput && withdrawAmountInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') withdrawConfirmBtn.click();
});
withdrawNote && withdrawNote.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') withdrawConfirmBtn.click();
});

// Patch Add Fund/Withdraw buttons after renderPortfolioPage
function patchAddFundButtons() {
    const addFundBtn = document.getElementById('quick-add-fund');
    if (addFundBtn) {
        addFundBtn.onclick = () => {
            const portfolioMenuItem = Array.from(menuItems).find(item => item.dataset.page === 'portfolio');
            if (portfolioMenuItem) {
                portfolioMenuItem.click();
            } else {
                handlePageNavigation('portfolio');
            }
            setTimeout(showAddFundModal, 200);
        };
    }
    const portfolioAddFundBtn = document.getElementById('portfolio-add-fund');
    if (portfolioAddFundBtn) {
        portfolioAddFundBtn.onclick = showAddFundModal;
    }
}
function patchWithdrawButtons() {
    const portfolioWithdrawBtn = document.getElementById('portfolio-withdraw');
    if (portfolioWithdrawBtn) {
        portfolioWithdrawBtn.onclick = showWithdrawModal;
    }
    const quickWithdrawBtn = document.getElementById('quick-withdraw');
    if (quickWithdrawBtn) {
        quickWithdrawBtn.onclick = showWithdrawModal;
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        patchAddFundButtons();
        patchWithdrawButtons();
    });
} else {
    patchAddFundButtons();
    patchWithdrawButtons();
}
const origRenderPortfolioPage = renderPortfolioPage;
renderPortfolioPage = function() {
    origRenderPortfolioPage();
    patchAddFundButtons();
    patchWithdrawButtons();
    setAvailableBalance(getAvailableBalance());
};

// --- Portfolio Asset Tracking ---
function getOwnedAssets() {
    return JSON.parse(localStorage.getItem('ownedAssets') || '[]');
}
function setOwnedAssets(assets) {
    localStorage.setItem('ownedAssets', JSON.stringify(assets));
}
function addOrUpdateOwnedAsset(symbol, name, shares, price) {
    let assets = getOwnedAssets();
    const idx = assets.findIndex(a => a.symbol === symbol);
    if (idx !== -1) {
        // Update avg price and shares
        const old = assets[idx];
        const totalShares = old.shares + shares;
        const newAvgPrice = ((old.avgPrice * old.shares) + (price * shares)) / totalShares;
        assets[idx] = {
            ...old,
            shares: totalShares,
            avgPrice: newAvgPrice,
            currentPrice: price,
            value: totalShares * price
        };
    } else {
        assets.push({ symbol, name, shares, avgPrice: price, currentPrice: price, value: shares * price });
    }
    setOwnedAssets(assets);
}
function removeOrReduceOwnedAsset(symbol, sharesToRemove) {
    let assets = getOwnedAssets();
    const idx = assets.findIndex(a => a.symbol === symbol);
    if (idx !== -1) {
        if (assets[idx].shares > sharesToRemove) {
            assets[idx].shares -= sharesToRemove;
            assets[idx].value = assets[idx].shares * assets[idx].currentPrice;
        } else {
            assets.splice(idx, 1);
        }
        setOwnedAssets(assets);
    }
}

// Patch Buy logic in Market (main table and detail view)
function patchBuyLogic() {
    // Main Market Table: Not used for direct buy, but detail view is
    // Detail View: Trade panel
    function patchDetailTradePanel() {
        const tradeForm = document.querySelector('.trade-form');
        if (!tradeForm) return;
        const buyBtn = tradeForm.querySelector('.trade-btn.buy');
        const stockInput = document.getElementById('details-trade-stock');
        const sharesInput = document.getElementById('trade-shares');
        if (buyBtn && stockInput && sharesInput) {
            buyBtn.onclick = function() {
                const symbol = stockInput.value.trim();
                const shares = Math.max(1, parseInt(sharesInput.value) || 1);
                const stock = stocks.find(s => s.symbol === symbol);
                if (!stock) {
                    showToast('Invalid stock.');
                    return;
                }
                addOrUpdateOwnedAsset(stock.symbol, stock.name, shares, stock.price);
                showToast(`Successfully bought ${shares} shares of ${symbol} at ETB ${stock.price} each!`);
                // Optionally, update portfolio page if open
                if (document.getElementById('portfolio-page').style.display !== 'none') {
                    renderPortfolioPage();
                }
            };
        }
    }
    // Patch after showing stock details
    const origShowStockDetails = showStockDetails;
    showStockDetails = function(symbol) {
        origShowStockDetails(symbol);
        setTimeout(patchDetailTradePanel, 100); // Wait for DOM
    };
    // Patch on DOMContentLoaded for initial load
    document.addEventListener('DOMContentLoaded', patchDetailTradePanel);
}
patchBuyLogic();

// Portfolio page: render only owned assets
function renderPortfolioAssetsTable() {
    const tbody = document.getElementById('portfolio-assets-tbody');
    if (!tbody) return;
    const assets = getOwnedAssets();
    if (!assets.length) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#aaa;">No assets owned yet. Buy stocks from the Market to see them here.</td></tr>`;
        return;
    }
    tbody.innerHTML = assets.map(asset => `
        <tr>
            <td><span style="display:inline-block;width:18px;height:18px;background:#e0e0e0;border-radius:50%;margin-right:8px;vertical-align:middle;"></span> ${asset.name}<br><span style="color:#aaa;font-size:0.95em;">${asset.symbol}</span></td>
            <td>${asset.shares}</td>
            <td>${asset.avgPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            <td>ETB ${asset.currentPrice.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
            <td>${asset.value.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</td>
        </tr>
    `).join('');
}
// Patch renderPortfolioPage to call this
const origRenderPortfolioPageAssets = renderPortfolioPage;
renderPortfolioPage = function() {
    origRenderPortfolioPageAssets();
    renderPortfolioAssetsTable();
};
// On load, render assets if portfolio page is visible
if (document.getElementById('portfolio-page') && document.getElementById('portfolio-page').style.display !== 'none') {
    renderPortfolioAssetsTable();
}

// --- Settings Page Navigation ---
function setupSettingsNavigation() {
    // Sidebar navigation
    const menuSecurity = document.getElementById('settings-menu-security');
    const menuAppearance = document.getElementById('settings-menu-appearance');
    const sectionSecurity = document.getElementById('settings-section-security');
    const sectionAppearance = document.getElementById('settings-section-appearance');

    // Horizontal tab navigation
    const tabSecurity = document.getElementById('settings-section-menu-security');
    const tabAppearance = document.getElementById('settings-section-menu-appearance');
    // Second set of horizontal tabs (in the appearance section)
    const tabSecurity2 = document.getElementById('settings-section-menu-security2');
    const tabAppearance2 = document.getElementById('settings-section-menu-appearance2');

    function activateSection(section) {
        if (section === 'security') {
            // Sidebar
            if (menuSecurity) menuSecurity.classList.add('active');
            if (menuAppearance) menuAppearance.classList.remove('active');
            // Horizontal tabs
            if (tabSecurity) tabSecurity.classList.add('active');
            if (tabAppearance) tabAppearance.classList.remove('active');
            if (tabSecurity2) tabSecurity2.classList.add('active');
            if (tabAppearance2) tabAppearance2.classList.remove('active');
            // Content
            if (sectionSecurity) sectionSecurity.style.display = 'block';
            if (sectionAppearance) sectionAppearance.style.display = 'none';
        } else if (section === 'appearance') {
            // Sidebar
            if (menuAppearance) menuAppearance.classList.add('active');
            if (menuSecurity) menuSecurity.classList.remove('active');
            // Horizontal tabs
            if (tabAppearance) tabAppearance.classList.add('active');
            if (tabSecurity) tabSecurity.classList.remove('active');
            if (tabAppearance2) tabAppearance2.classList.add('active');
            if (tabSecurity2) tabSecurity2.classList.remove('active');
            // Content
            if (sectionAppearance) sectionAppearance.style.display = 'block';
            if (sectionSecurity) sectionSecurity.style.display = 'none';
        }
    }

    if (menuSecurity) {
        menuSecurity.addEventListener('click', () => activateSection('security'));
    }
    if (menuAppearance) {
        menuAppearance.addEventListener('click', () => activateSection('appearance'));
    }
    if (tabSecurity) {
        tabSecurity.addEventListener('click', () => activateSection('security'));
    }
    if (tabAppearance) {
        tabAppearance.addEventListener('click', () => activateSection('appearance'));
    }
    if (tabSecurity2) {
        tabSecurity2.addEventListener('click', () => activateSection('security'));
    }
    if (tabAppearance2) {
        tabAppearance2.addEventListener('click', () => activateSection('appearance'));
    }
}

// --- Top-level Settings/Help Tab Navigation ---
function setupTopSettingsTabs() {
    const tabSetting = document.getElementById('settings-tab-main');
    const tabHelp = document.getElementById('settings-tab-help');
    const settingsContent = document.querySelector('.settings-content-row');
    const helpContent = document.getElementById('help-main-content');

    if (tabSetting && tabHelp && settingsContent && helpContent) {
        tabSetting.addEventListener('click', () => {
            tabSetting.classList.add('active');
            tabHelp.classList.remove('active');
            settingsContent.style.display = 'flex';
            helpContent.style.display = 'none';
        });
        tabHelp.addEventListener('click', () => {
            tabHelp.classList.add('active');
            tabSetting.classList.remove('active');
            settingsContent.style.display = 'none';
            helpContent.style.display = 'block';
        });
    }
}

// --- Help Section Navigation (FAQs & Troubleshooting) ---
function setupHelpSectionNavigation() {
    const helpCards = document.getElementById('help-cards');
    const faqSection = document.getElementById('faq-section');
    const troubleshootingSection = document.getElementById('troubleshooting-section');
    const viewFaqsLink = document.getElementById('view-faqs-link');
    const troubleshootingLink = document.getElementById('troubleshooting-link');
    const backToHelpFaq = document.getElementById('back-to-help-faq');
    const backToHelpTroubleshooting = document.getElementById('back-to-help-troubleshooting');

    if (viewFaqsLink && helpCards && faqSection) {
        viewFaqsLink.addEventListener('click', function(e) {
            e.preventDefault();
            helpCards.style.display = 'none';
            faqSection.style.display = 'block';
        });
    }
    if (troubleshootingLink && helpCards && troubleshootingSection) {
        troubleshootingLink.addEventListener('click', function(e) {
            e.preventDefault();
            helpCards.style.display = 'none';
            troubleshootingSection.style.display = 'block';
        });
    }
    if (backToHelpFaq && helpCards && faqSection) {
        backToHelpFaq.addEventListener('click', function(e) {
            e.preventDefault();
            faqSection.style.display = 'none';
            helpCards.style.display = 'grid';
        });
    }
    if (backToHelpTroubleshooting && helpCards && troubleshootingSection) {
        backToHelpTroubleshooting.addEventListener('click', function(e) {
            e.preventDefault();
            troubleshootingSection.style.display = 'none';
            helpCards.style.display = 'grid';
        });
    }
}

// Filter Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const filterModal = document.getElementById('filter-modal');
    const filterBtn = document.getElementById('market-filters-btn');
    const sortSelect = document.getElementById('sort-select');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const cancelFilterBtn = document.getElementById('cancel-filter-btn');

    if (filterBtn) {
        filterBtn.onclick = function() {
            if (filterModal) filterModal.style.display = 'flex';
        };
    }
    if (cancelFilterBtn) {
        cancelFilterBtn.onclick = function() {
            if (filterModal) filterModal.style.display = 'none';
        };
    }
    if (filterModal) {
        filterModal.addEventListener('click', function(e) {
            if (e.target === filterModal) filterModal.style.display = 'none';
        });
    }
    if (applyFilterBtn) {
        applyFilterBtn.onclick = function() {
            const sortValue = sortSelect.value;
            let sortedStocks = [...stocks];
            switch (sortValue) {
                case 'price-asc':
                    sortedStocks.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedStocks.sort((a, b) => b.price - a.price);
                    break;
                case 'change-asc':
                    sortedStocks.sort((a, b) => a.change - b.change);
                    break;
                case 'change-desc':
                    sortedStocks.sort((a, b) => b.change - a.change);
                    break;
                case 'name-asc':
                    sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sortedStocks.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    // No sort
                    break;
            }
            renderStocksTable(sortedStocks);
            if (filterModal) filterModal.style.display = 'none';
        };
    }
});

function renderNews(category = 'Recent') {
    const newsGrid = document.getElementById('news-grid');
    const news = [
        {
            title: "Stock Market Hits Record Highs",
            summary: "The Ethiopian stock market reached new heights today as...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            category: 'Recent',
        },
        {
            title: "New IPO Announced",
            summary: "A new company is going public on EDSM. Find out how you can participate...",
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
            category: 'Finance',
        },
        {
            title: "Finance Sector Sees Growth",
            summary: "Finance stocks are on the rise this quarter, with several outperforming expectations...",
            image: "https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80",
            category: 'Finance',
        },
        {
            title: "Technology Stocks Lead the Rally",
            summary: "Tech companies are driving the market rally, with ETHIT and ETHCOM up double digits...",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            category: 'Technology',
        },
        {
            title: "Energy Sector Faces Volatility",
            summary: "Energy stocks experienced swings as oil prices fluctuated in global markets...",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
            category: 'Energy',
        },
        {
            title: "Ethiopian Bank Reports Record Profits",
            summary: "Commercial Bank of Ethiopia announced record profits for the fiscal year...",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
            category: 'Finance',
        },
        {
            title: "Agriculture Stocks Stable Amid Uncertainty",
            summary: "Agriculture sector remains stable despite market uncertainty, experts say...",
            image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
            category: 'Recent',
        },
        {
            title: "Consumer Goods Demand Rises",
            summary: "Consumer goods companies see increased demand as spending rebounds...",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
            category: 'Recent',
        },
        {
            title: "Insurance Sector Expands Offerings",
            summary: "Ethiopian insurance companies are expanding their product lines to attract new customers...",
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
            category: 'Finance',
        },
        {
            title: "Infrastructure Projects Boost Industrials",
            summary: "Major infrastructure projects are boosting industrial stocks across the board...",
            image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
            category: 'Energy',
        }
    ];
    let filteredNews = news;
    if (category && category !== 'All') {
        if (category === 'Recent') {
            filteredNews = news.slice(0, 3);
        } else {
            filteredNews = news.filter(item => item.category === category);
        }
    }
    if (!filteredNews.length) {
        newsGrid.innerHTML = "<div style='color:#888;text-align:center;padding:32px;'>No news available.</div>";
        return;
    }
    newsGrid.innerHTML = filteredNews.map(item => `
        <div class=\"news-card\">\n            <img class=\"news-card-img\" src=\"${item.image}\" alt=\"News image\">\n            <div class=\"news-card-content\">\n                <div class=\"news-card-title\">${item.title}</div>\n                <div class=\"news-card-summary\">${item.summary}</div>\n            </div>\n        </div>\n    `).join('');
}

// Add event listeners to news filter buttons
function setupNewsFilters() {
    const filterBtns = document.querySelectorAll('.news-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.textContent.trim();
            renderNews(category);
        });
    });
}

// Watchlist page functionality
function renderWatchlistPage() {
    const watchlistGrid = document.getElementById('watchlist-grid');
    const watchlistEmpty = document.getElementById('watchlist-empty');
    const watchlistSearch = document.querySelector('.watchlist-search input');
    const watchlistSort = document.getElementById('watchlist-sort');

    if (!watchlistGrid || !watchlistEmpty) return;

    // Always get the latest valid stocks in the watchlist
    let watchlistStocks = getWatchlistStocks();

    // Show empty state if no stocks in watchlist
    if (!watchlistStocks.length) {
        watchlistGrid.innerHTML = '';
        watchlistGrid.style.display = 'none';
        watchlistEmpty.style.display = 'block';
        watchlistEmpty.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-star"></i>
                <h3>Your watchlist is empty</h3>
                <p>Add stocks to your watchlist from the Market page to see them here.<br>
                <span style='color:#888;font-size:0.95em;'>If you recently removed invalid stocks, your watchlist may have been cleaned up automatically.</span></p>
                <button class="btn btn-primary" id="browse-stocks-btn">
                    <i class="fas fa-chart-line"></i>
                    Browse Stocks
                </button>
            </div>
        `;
        // Add click handler for browse stocks button
        const browseBtn = document.getElementById('browse-stocks-btn');
        if (browseBtn) {
            browseBtn.addEventListener('click', () => {
                handlePageNavigation('market');
            });
        }
        return;
    }

    // Show grid if there are stocks
    watchlistGrid.style.display = 'grid';
    watchlistEmpty.style.display = 'none';

    // Render watchlist cards
    renderWatchlistCards(watchlistStocks);

    // Remove previous event listeners by replacing nodes
    if (watchlistSearch) {
        const newSearch = watchlistSearch.cloneNode(true);
        watchlistSearch.parentNode.replaceChild(newSearch, watchlistSearch);
        newSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredStocks = getWatchlistStocks().filter(stock => 
                stock.symbol.toLowerCase().includes(searchTerm) || 
                stock.name.toLowerCase().includes(searchTerm)
            );
            renderWatchlistCards(filteredStocks);
        });
    }

    if (watchlistSort) {
        const newSort = watchlistSort.cloneNode(true);
        watchlistSort.parentNode.replaceChild(newSort, watchlistSort);
        newSort.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            let sortedStocks = [...getWatchlistStocks()];
            switch (sortValue) {
                case 'price-asc':
                    sortedStocks.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedStocks.sort((a, b) => b.price - a.price);
                    break;
                case 'change-asc':
                    sortedStocks.sort((a, b) => a.change - b.change);
                    break;
                case 'change-desc':
                    sortedStocks.sort((a, b) => b.change - a.change);
                    break;
                case 'name-asc':
                    sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sortedStocks.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    // No sort
                    break;
            }
            renderWatchlistCards(sortedStocks);
        });
    }
}

function renderWatchlistCards(stocks) {
    const watchlistGrid = document.getElementById('watchlist-grid');
    if (!watchlistGrid) return;

    watchlistGrid.innerHTML = stocks.map(stock => `
        <div class="watchlist-card" data-symbol="${stock.symbol}">
            <div class="watchlist-card-header">
                <div class="watchlist-card-title">
                    <div class="watchlist-card-symbol">${stock.symbol}</div>
                    <div class="watchlist-card-name">${stock.name}</div>
                </div>
                <button class="btn btn-outline remove-watchlist-btn" data-symbol="${stock.symbol}" title="Remove from Watchlist">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="watchlist-card-price">ETB ${stock.price.toFixed(2)}</div>
            <div class="watchlist-card-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(1)}%
            </div>
            <div class="watchlist-card-stats">
                <div class="watchlist-card-stat">
                    <div class="watchlist-card-stat-label">Open</div>
                    <div class="watchlist-card-stat-value">ETB ${stock.open.toFixed(2)}</div>
                </div>
                <div class="watchlist-card-stat">
                    <div class="watchlist-card-stat-label">High</div>
                    <div class="watchlist-card-stat-value">ETB ${stock.high.toFixed(2)}</div>
                </div>
                <div class="watchlist-card-stat">
                    <div class="watchlist-card-stat-label">Low</div>
                    <div class="watchlist-card-stat-value">ETB ${stock.low.toFixed(2)}</div>
                </div>
                <div class="watchlist-card-stat">
                    <div class="watchlist-card-stat-label">Market Cap</div>
                    <div class="watchlist-card-stat-value">ETB ${stock.marketCap}</div>
                </div>
            </div>
            <div class="watchlist-card-actions">
                <button class="btn btn-outline view-stock-btn" data-symbol="${stock.symbol}">
                    <i class="fas fa-chart-line"></i>
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    // Add click handlers for remove buttons
    document.querySelectorAll('.remove-watchlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const symbol = btn.dataset.symbol;
            removeFromWatchlist(symbol);
            renderWatchlistPage();
            showToast('Stock removed from watchlist');
        });
    });

    // Add click handlers for view details buttons
    document.querySelectorAll('.view-stock-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const symbol = btn.dataset.symbol;
            showStockDetails(symbol);
        });
    });
}

// --- WATCHLIST UTILITIES ---
function getWatchlist() {
    try {
        const wl = JSON.parse(localStorage.getItem('watchlist'));
        return Array.isArray(wl) ? wl : [];
    } catch (e) {
        console.error('Failed to parse watchlist from localStorage:', e);
        return [];
    }
}
function setWatchlist(arr) {
    localStorage.setItem('watchlist', JSON.stringify(arr));
}
function getWatchlistStocks() {
    const wl = getWatchlist();
    if (!Array.isArray(stocks)) {
        console.error('Stocks array is not defined or not an array:', stocks);
        return [];
    }
    // Only keep symbols that exist in stocks
    const validSymbols = new Set(stocks.map(s => s.symbol));
    const filteredWl = wl.filter(symbol => validSymbols.has(symbol));
    // If any invalid symbols were removed, update localStorage
    if (filteredWl.length !== wl.length) {
        setWatchlist(filteredWl);
    }
    return stocks.filter(stock => filteredWl.includes(stock.symbol));
}

// --- Dashboard News Refactor ---
function getDashboardNews() {
    // In a real app, this could fetch from an API or be dynamic
    return [
        {
            title: "Stock Market Hits Record Highs",
            summary: "The Ethiopian stock market reached new heights today as...",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            date: "2024-06-01",
            category: "Market"
        },
        {
            title: "New IPO Announced",
            summary: "A new company is going public on EDSM. Find out how you can participate...",
            image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
            date: "2024-05-28",
            category: "Finance"
        },
        {
            title: "Technology Stocks Lead the Rally",
            summary: "Tech companies are driving the market rally, with ETHIT and ETHCOM up double digits...",
            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            date: "2024-05-25",
            category: "Technology"
        }
    ];
}

function renderDashboardNews() {
    const newsList = document.getElementById('dashboard-news-list');
    if (!newsList) {
        console.warn('Dashboard news list element not found!');
        return;
    }
    const news = getDashboardNews();
    console.debug('Rendering dashboard news:', news);
    if (!news.length) {
        newsList.innerHTML = '<div style="color:#888;padding:24px;">No news available.</div>';
        return;
    }
    newsList.innerHTML = news.map(item => `
        <div class="dashboard-news-item">
            <img class="dashboard-news-img" src="${item.image}" alt="News image">
            <div class="dashboard-news-content">
                <div class="dashboard-news-title">${item.title}</div>
                <div class="dashboard-news-summary">${item.summary}</div>
                <div class="dashboard-news-meta">
                    <span class="dashboard-news-category">${item.category}</span>
                    <span class="dashboard-news-date">${item.date}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Ensure dashboard news is rendered when dashboard is shown
function showDashboardPage() {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    // Show dashboard
    const dashboardPage = document.getElementById('dashboard-page');
    if (dashboardPage) {
        dashboardPage.style.display = 'block';
        renderDashboardNews();
    }
}
// Patch menu navigation to use showDashboardPage
menuItems.forEach(item => {
    if (item.dataset.page === 'dashboard') {
        item.addEventListener('click', showDashboardPage);
    }
});
// Optionally, call on load if dashboard is default
if (document.getElementById('dashboard-page') && document.getElementById('dashboard-page').style.display !== 'none') {
    renderDashboardNews();
}
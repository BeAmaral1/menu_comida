// Enhanced Menu Data with ratings and nutritional info
const menuData = [
    // Lanches
    {
        id: 1,
        name: "X-Burger Especial",
        description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial da casa",
        price: 28.90,
        category: "lanches",
        icon: "🍔",
        popular: true,
        rating: 4.8,
        reviewCount: 127,
        calories: 650,
        protein: 35,
        carbs: 45
    },
    {
        id: 2,
        name: "X-Bacon Duplo",
        description: "Dois hambúrgueres 120g, bacon crocante, queijo, alface, tomate e maionese temperada",
        price: 32.90,
        category: "lanches",
        icon: "🥓",
        popular: false,
        rating: 4.6,
        reviewCount: 89,
        calories: 820,
        protein: 45,
        carbs: 52
    },
    {
        id: 3,
        name: "Chicken Crispy",
        description: "Peito de frango empanado crocante, queijo, alface americana, tomate e molho ranch",
        price: 26.90,
        category: "lanches",
        icon: "🍗",
        popular: true
    },
    {
        id: 4,
        name: "Veggie Burger",
        description: "Hambúrguer de grão-de-bico e quinoa, queijo vegano, rúcula, tomate seco e molho de ervas",
        price: 24.90,
        category: "lanches",
        icon: "🥬",
        popular: false
    },

    // Pizzas
    {
        id: 5,
        name: "Pizza Margherita",
        description: "Molho de tomate artesanal, mussarela de búfala, manjericão fresco e azeite extravirgem",
        price: 42.90,
        category: "pizzas",
        icon: "🍕",
        popular: true
    },
    {
        id: 6,
        name: "Pizza Pepperoni",
        description: "Molho de tomate, mussarela, pepperoni premium e orégano",
        price: 46.90,
        category: "pizzas",
        icon: "🍕",
        popular: true
    },
    {
        id: 7,
        name: "Pizza Quatro Queijos",
        description: "Mussarela, gorgonzola, parmesão, provolone e orégano",
        price: 48.90,
        category: "pizzas",
        icon: "🧀",
        popular: false
    },
    {
        id: 8,
        name: "Pizza Portuguesa",
        description: "Presunto, ovos, cebola, azeitona, ervilha, mussarela e molho de tomate",
        price: 44.90,
        category: "pizzas",
        icon: "🍕",
        popular: false
    },

    // Bebidas
    {
        id: 9,
        name: "Refrigerante Lata",
        description: "Coca-Cola, Guaraná Antarctica, Fanta Laranja ou Sprite - 350ml",
        price: 5.90,
        category: "bebidas",
        icon: "🥤",
        popular: true
    },
    {
        id: 10,
        name: "Suco Natural",
        description: "Laranja, limão, maracujá ou acerola - 500ml",
        price: 8.90,
        category: "bebidas",
        icon: "🧃",
        popular: true
    },
    {
        id: 11,
        name: "Água Mineral",
        description: "Água mineral sem gás - 500ml",
        price: 3.90,
        category: "bebidas",
        icon: "💧",
        popular: false
    },
    {
        id: 12,
        name: "Cerveja Artesanal",
        description: "IPA ou Pilsen - 600ml gelada",
        price: 12.90,
        category: "bebidas",
        icon: "🍺",
        popular: false
    },

    // Sobremesas
    {
        id: 13,
        name: "Brownie com Sorvete",
        description: "Brownie de chocolate quente com sorvete de baunilha e calda de chocolate",
        price: 16.90,
        category: "sobremesas",
        icon: "🍰",
        popular: true
    },
    {
        id: 14,
        name: "Pudim de Leite",
        description: "Pudim cremoso de leite condensado com calda de caramelo",
        price: 12.90,
        category: "sobremesas",
        icon: "🍮",
        popular: false
    },
    {
        id: 15,
        name: "Sorvete Artesanal",
        description: "Duas bolas de sorvete artesanal - sabores: chocolate, baunilha, morango ou coco",
        price: 14.90,
        category: "sobremesas",
        icon: "🍨",
        popular: true
    },
    {
        id: 16,
        name: "Torta de Limão",
        description: "Fatia generosa de torta de limão com merengue",
        price: 15.90,
        category: "sobremesas",
        icon: "🥧",
        popular: false
    }
];

// Enhanced State Management
let cart = [];
let favorites = [];
let currentCategory = '';
let searchTerm = '';
let currentSort = 'name';
let showOnlyFavorites = false;
let currentUser = null;
let appliedPromo = null;
let orderHistory = [];
let userAddresses = [];

// Promo codes
const promoCodes = {
    'PRIMEIRA10': { discount: 0.10, type: 'percentage', description: '10% off no primeiro pedido' },
    'FRETE5': { discount: 5.00, type: 'fixed', description: 'R$ 5 off na entrega' },
    'COMBO15': { discount: 0.15, type: 'percentage', description: '15% off em combos', minItems: 2 }
};

// Enhanced DOM Elements
const menuItemsContainer = document.getElementById('menu-items');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const userModal = new bootstrap.Modal(document.getElementById('userModal'));
const favoritesModal = new bootstrap.Modal(document.getElementById('favoritesModal'));
const promoModal = new bootstrap.Modal(document.getElementById('promoModal'));
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const categoryTabs = document.getElementById('category-tabs');
const themeToggle = document.getElementById('theme-toggle');
const favoritesBtn = document.getElementById('favorites-btn');
const userBtn = document.getElementById('user-btn');
const showFavoritesBtn = document.getElementById('show-favorites');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadFavoritesFromStorage();
    loadThemeFromStorage();
    renderMenuItems();
    setupEventListeners();
    updateCartUI();
    updateFavoritesUI();
});

// Enhanced Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Category filter
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Sort filter
    sortFilter.addEventListener('change', handleSortFilter);
    
    // Category tabs
    categoryTabs.addEventListener('click', handleCategoryTab);
    
    // Cart button
    cartBtn.addEventListener('click', () => cartModal.show());
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Favorites button
    favoritesBtn.addEventListener('click', () => favoritesModal.show());
    
    // User button
    userBtn.addEventListener('click', () => userModal.show());
    
    // Show favorites filter
    showFavoritesBtn.addEventListener('click', toggleFavoritesFilter);
    
    // Modal quantity controls
    document.getElementById('increase-qty').addEventListener('click', increaseQuantity);
    document.getElementById('decrease-qty').addEventListener('click', decreaseQuantity);
    
    // Add to cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', addToCartFromModal);
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    
    // Promo code functionality
    document.getElementById('add-promo-btn').addEventListener('click', () => promoModal.show());
    document.getElementById('apply-promo').addEventListener('click', applyPromoCode);
    document.getElementById('remove-promo').addEventListener('click', removePromoCode);
    
    // User authentication
    document.getElementById('show-register').addEventListener('click', showRegisterForm);
    document.getElementById('show-login').addEventListener('click', showLoginForm);
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('register-btn').addEventListener('click', handleRegister);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Render Menu Items
function renderMenuItems() {
    const filteredItems = filterMenuItems();
    
    // Show loading animation
    showLoadingAnimation();
    
    setTimeout(() => {
        menuItemsContainer.innerHTML = '';
        
        if (filteredItems.length === 0) {
            menuItemsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Nenhum item encontrado</h4>
                    <p class="text-muted">Tente ajustar sua busca ou filtro</p>
                </div>
            `;
            return;
        }
        
        filteredItems.forEach((item, index) => {
            const itemCard = createMenuItemCard(item);
            itemCard.style.opacity = '0';
            itemCard.style.transform = 'translateY(30px)';
            menuItemsContainer.appendChild(itemCard);
            
            // Staggered animation
            setTimeout(() => {
                itemCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                itemCard.style.opacity = '1';
                itemCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
}

// Show Loading Animation
function showLoadingAnimation() {
    menuItemsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="loading" style="width: 50px; height: 50px; border-width: 5px; margin: 0 auto;"></div>
        </div>
    `;
}

// Enhanced Create Menu Item Card
function createMenuItemCard(item) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';

    const isFavorite = favorites.includes(item.id);
    const rating = item.rating || 0;
    const reviewCount = item.reviewCount || 0;

    // Generate star rating display
    const starsHtml = generateStarsHtml(rating);

    col.innerHTML = `
        <div class="menu-card" onclick="openItemModal(${item.id})">
            <div class="menu-card-image position-relative">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${item.id})" title="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                    <i class="fas fa-heart"></i>
                </button>
                <span class="menu-card-category">${getCategoryName(item.category)}</span>
                ${item.icon}
                ${item.popular ? '<div class="position-absolute top-0 start-0 m-2" style="top: 60px !important;"><span class="badge popular-badge"><i class="fas fa-star me-1"></i>Popular</span></div>' : ''}
            </div>
            <div class="menu-card-body">
                <h5 class="menu-card-title">${item.name}</h5>
                ${rating > 0 ? `
                <div class="menu-card-rating">
                    <div class="rating-display">
                        <span class="stars">${starsHtml}</span>
                        <span class="count">(${reviewCount})</span>
                    </div>
                </div>
                ` : ''}
                <p class="menu-card-description">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="menu-card-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); quickAddToCart(${item.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    return col;
}

// Enhanced Filter Menu Items
function filterMenuItems() {
    let filteredItems = menuData.filter(item => {
        const matchesCategory = !currentCategory || item.category === currentCategory;
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFavorites = !showOnlyFavorites || favorites.includes(item.id);
        
        return matchesCategory && matchesSearch && matchesFavorites;
    });
    
    // Apply sorting
    return sortMenuItems(filteredItems);
}

// Sort Menu Items
function sortMenuItems(items) {
    return items.sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'popular':
                return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            default:
                return 0;
        }
    });
}

// Get Category Name
function getCategoryName(category) {
    const categories = {
        'lanches': 'Lanches',
        'pizzas': 'Pizzas',
        'bebidas': 'Bebidas',
        'sobremesas': 'Sobremesas'
    };
    return categories[category] || category;
}

// Handle Search
function handleSearch(e) {
    searchTerm = e.target.value;
    renderMenuItems();
}

// Handle Category Filter
function handleCategoryFilter(e) {
    currentCategory = e.target.value;
    renderMenuItems();
    updateCategoryTabs();
}

// Handle Category Tab
function handleCategoryTab(e) {
    if (e.target.tagName === 'BUTTON') {
        currentCategory = e.target.dataset.category;
        categoryFilter.value = currentCategory;
        renderMenuItems();
        updateCategoryTabs();
    }
}

// Update Category Tabs
function updateCategoryTabs() {
    document.querySelectorAll('#category-tabs .nav-link').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === currentCategory) {
            tab.classList.add('active');
        }
    });
}

// Open Item Modal
function openItemModal(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;
    
    document.getElementById('item-modal-title').textContent = item.name;
    document.getElementById('item-modal-image').innerHTML = item.icon;
    document.getElementById('item-modal-description').textContent = item.description;
    document.getElementById('item-modal-price').textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('item-qty').textContent = '1';
    document.getElementById('add-to-cart-btn').dataset.itemId = itemId;
    
    itemModal.show();
}

// Quantity Controls
function increaseQuantity() {
    const qtyElement = document.getElementById('item-qty');
    const currentQty = parseInt(qtyElement.textContent);
    qtyElement.textContent = currentQty + 1;
}

function decreaseQuantity() {
    const qtyElement = document.getElementById('item-qty');
    const currentQty = parseInt(qtyElement.textContent);
    if (currentQty > 1) {
        qtyElement.textContent = currentQty - 1;
    }
}

// Quick Add to Cart
function quickAddToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;
    
    // Add visual feedback to button
    const button = event.target;
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    setTimeout(() => {
        button.innerHTML = originalContent;
        button.style.background = '';
    }, 1000);
    
    addToCart(item, 1);
    showToast(`<strong>${item.name}</strong> foi adicionado ao seu carrinho! 🛒`, 'success');
}

// Add to Cart from Modal
function addToCartFromModal() {
    const itemId = parseInt(document.getElementById('add-to-cart-btn').dataset.itemId);
    const quantity = parseInt(document.getElementById('item-qty').textContent);
    const item = menuData.find(i => i.id === itemId);
    
    if (!item) return;
    
    // Add loading state to button
    const button = document.getElementById('add-to-cart-btn');
    const originalContent = button.innerHTML;
    button.innerHTML = '<span class="loading" style="width: 20px; height: 20px; border-width: 2px;"></span> Adicionando...';
    button.disabled = true;
    
    setTimeout(() => {
        addToCart(item, quantity);
        itemModal.hide();
        
        button.innerHTML = originalContent;
        button.disabled = false;
        
        const quantityText = quantity > 1 ? `${quantity}x ` : '';
        showToast(`${quantityText}<strong>${item.name}</strong> adicionado com sucesso! 🎉`, 'success');
    }, 800);
}

// Add to Cart
function addToCart(item, quantity) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }
    
    updateCartUI();
    saveCartToStorage();
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
    saveCartToStorage();
}

// Update Cart Quantity
function updateCartQuantity(itemId, newQuantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    document.getElementById('cart-total').textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartItemsContainer.style.display = 'block';
    emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center g-2">
                <div class="col-auto">
                    <div class="cart-item-image">
                        ${item.icon}
                    </div>
                </div>
                <div class="col">
                    <h6 class="mb-1 text-truncate">${item.name}</h6>
                    <small class="text-muted">R$ ${item.price.toFixed(2).replace('.', ',')}</small>
                </div>
                <div class="col-auto">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" title="Diminuir quantidade">-</button>
                        <span class="fw-bold mx-1">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" title="Aumentar quantidade">+</button>
                    </div>
                </div>
                <div class="col-auto">
                    <button class="btn btn-link text-danger p-1" onclick="removeFromCart(${item.id})" title="Remover item">
                        <i class="fas fa-trash" style="font-size: 0.8rem;"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle Checkout
function handleCheckout() {
    if (cart.length === 0) {
        showToast('Ops! Seu carrinho está vazio. Adicione alguns itens deliciosos! 🍔', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Simulate order processing
    const checkoutBtn = document.getElementById('checkout-btn');
    const originalText = checkoutBtn.innerHTML;
    
    // Step 1: Processing
    checkoutBtn.innerHTML = '<span class="loading"></span> Processando pedido...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        // Step 2: Confirming
        checkoutBtn.innerHTML = '<i class="fas fa-credit-card"></i> Confirmando pagamento...';
        
        setTimeout(() => {
            // Step 3: Success
            cart = [];
            updateCartUI();
            saveCartToStorage();
            cartModal.hide();
            
            checkoutBtn.innerHTML = originalText;
            checkoutBtn.disabled = false;
            
            showToast(`🎉 <strong>Pedido confirmado!</strong><br>${itemCount} ${itemCount === 1 ? 'item' : 'itens'} - Total: <strong>R$ ${total.toFixed(2).replace('.', ',')}</strong><br>Tempo estimado: 25-35 min`, 'success');
            
            // Show additional success message
            setTimeout(() => {
                showToast('Você receberá atualizações do seu pedido em breve! 📱', 'info');
            }, 2000);
        }, 1500);
    }, 1000);
}

// Show Toast Notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    
    // Define icons and colors for different types
    const toastConfig = {
        success: { icon: 'fas fa-check-circle', color: '#27ae60', title: 'Sucesso!' },
        warning: { icon: 'fas fa-exclamation-triangle', color: '#f1c40f', title: 'Atenção!' },
        error: { icon: 'fas fa-times-circle', color: '#e74c3c', title: 'Erro!' },
        info: { icon: 'fas fa-info-circle', color: '#3498db', title: 'Informação' }
    };
    
    const config = toastConfig[type] || toastConfig.success;
    
    toast.className = `custom-toast ${type}`;
    toast.id = toastId;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="${config.icon} toast-icon" style="color: ${config.color};"></i>
            <strong class="me-auto">${config.title}</strong>
            <button type="button" class="btn-close" onclick="removeToast('${toastId}')"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add click sound effect (optional)
    playNotificationSound(type);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        removeToast(toastId);
    }, 4000);
}

// Remove Toast
function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// Play notification sound (optional)
function playNotificationSound(type) {
    // Create audio context for subtle sound feedback
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for different notification types
        const frequencies = {
            success: 800,
            warning: 600,
            error: 400,
            info: 700
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 700, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Silently fail if audio context is not supported
    }
}

// Save Cart to Local Storage
function saveCartToStorage() {
    try {
        localStorage.setItem('saborexpress_cart', JSON.stringify(cart));
    } catch (error) {
        console.warn('Erro ao salvar carrinho no localStorage:', error);
        showToast('Não foi possível salvar o carrinho. Verifique o armazenamento do navegador.', 'warning');
    }
}

// Load Cart from Local Storage
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('saborexpress_cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Validate cart data
            if (Array.isArray(parsedCart)) {
                cart = parsedCart.filter(item => 
                    item && 
                    typeof item.id === 'number' && 
                    typeof item.quantity === 'number' && 
                    item.quantity > 0
                );
                updateCartUI();
                
                if (cart.length > 0) {
                    setTimeout(() => {
                        showToast(`Carrinho restaurado! ${cart.length} ${cart.length === 1 ? 'item encontrado' : 'itens encontrados'} 🛒`, 'info');
                    }, 2000);
                }
            }
        }
    } catch (error) {
        console.warn('Erro ao carregar carrinho do localStorage:', error);
        cart = [];
        localStorage.removeItem('saborexpress_cart');
    }
}

// Initialize cart from storage
loadCartFromStorage();

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce search input
const debouncedSearch = debounce(handleSearch, 300);
searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);

// Add loading states to all interactive elements
function addLoadingState(element, duration = 1000) {
    const originalContent = element.innerHTML;
    const originalDisabled = element.disabled;
    
    element.innerHTML = '<span class="loading" style="width: 16px; height: 16px; border-width: 2px;"></span>';
    element.disabled = true;
    
    setTimeout(() => {
        element.innerHTML = originalContent;
        element.disabled = originalDisabled;
    }, duration);
}

// Welcome message
setTimeout(() => {
    showToast('Bem-vindo ao <strong>Sabor Express</strong>! 👋<br>Explore nosso cardápio e faça seu pedido.', 'info');
}, 1000);

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(231, 76, 60, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backgroundColor = '';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements when they're added to the DOM
function observeElements() {
    document.querySelectorAll('.menu-card, .cart-item').forEach(el => {
        observer.observe(el);
    });
}

// Call observe elements after DOM updates
setTimeout(observeElements, 100);

// Add loading animation for menu items
function showLoading() {
    menuItemsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="loading" style="width: 40px; height: 40px; border-width: 4px;"></div>
            <p class="mt-3 text-muted">Carregando cardápio...</p>
        </div>
    `;
}

// Simulate loading when changing categories
function handleCategoryTabWithLoading(e) {
    if (e.target.tagName === 'BUTTON') {
        showLoading();
        setTimeout(() => {
            handleCategoryTab(e);
        }, 500);
    }
}

// Enhanced category tab handling
function handleCategoryTabWithLoading(e) {
    if (e.target.tagName === 'BUTTON') {
        // Add visual feedback
        const clickedTab = e.target;
        clickedTab.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedTab.style.transform = '';
        }, 150);
        
        showLoadingAnimation();
        setTimeout(() => {
            handleCategoryTab(e);
        }, 400);
    }
}

// Replace the original event listener
categoryTabs.removeEventListener('click', handleCategoryTab);
categoryTabs.addEventListener('click', handleCategoryTabWithLoading);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });
    }
    
    // Enter key on focused elements
    if (e.key === 'Enter' && e.target.classList.contains('menu-card')) {
        e.target.click();
    }
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.closest('.menu-card, .btn')) {
            e.target.style.transform = 'scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.closest('.menu-card, .btn')) {
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
}

// Responsive cart adjustments
function adjustCartForScreenSize() {
    const screenWidth = window.innerWidth;
    const cartModal = document.getElementById('cartModal');
    
    if (screenWidth <= 320) {
        // Ultra small screens
        cartModal.classList.add('ultra-small-screen');
    } else if (screenWidth <= 480) {
        // Small screens
        cartModal.classList.add('small-screen');
        cartModal.classList.remove('ultra-small-screen');
    } else {
        // Normal screens
        cartModal.classList.remove('small-screen', 'ultra-small-screen');
    }
}

// Call on load and resize
window.addEventListener('load', adjustCartForScreenSize);
window.addEventListener('resize', debounce(adjustCartForScreenSize, 250));

// ===== NEW ENHANCED FUNCTIONALITY =====

// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    localStorage.setItem('theme', newTheme);
    
    showToast(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado! 🎨`, 'info');
}

function loadThemeFromStorage() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Favorites Management
function toggleFavorite(itemId) {
    const index = favorites.indexOf(itemId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Item removido dos favoritos! 💔', 'info');
    } else {
        favorites.push(itemId);
        showToast('Item adicionado aos favoritos! ❤️', 'success');
    }
    
    saveFavoritesToStorage();
    updateFavoritesUI();
    renderMenuItems(); // Re-render to update heart buttons
}

function updateFavoritesUI() {
    const favoritesCount = document.getElementById('favorites-count');
    const count = favorites.length;
    
    favoritesCount.textContent = count;
    favoritesCount.style.display = count > 0 ? 'block' : 'none';
    
    renderFavoritesModal();
}

function renderFavoritesModal() {
    const favoritesItems = document.getElementById('favorites-items');
    const emptyFavorites = document.getElementById('empty-favorites');
    
    if (favorites.length === 0) {
        favoritesItems.style.display = 'none';
        emptyFavorites.style.display = 'block';
        return;
    }
    
    favoritesItems.style.display = 'block';
    emptyFavorites.style.display = 'none';
    
    const favoriteItems = menuData.filter(item => favorites.includes(item.id));
    
    favoritesItems.innerHTML = favoriteItems.map(item => `
        <div class="row mb-3 p-3 border rounded">
            <div class="col-auto">
                <div class="favorite-item-image" style="font-size: 2rem;">
                    ${item.icon}
                </div>
            </div>
            <div class="col">
                <h6 class="mb-1">${item.name}</h6>
                <p class="text-muted mb-2 small">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-success fw-bold">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                    <div>
                        <button class="btn btn-sm btn-outline-danger me-2" onclick="toggleFavorite(${item.id})">
                            <i class="fas fa-heart-broken"></i>
                        </button>
                        <button class="btn btn-sm btn-primary" onclick="quickAddToCart(${item.id}); favoritesModal.hide();">
                            <i class="fas fa-plus"></i> Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleFavoritesFilter() {
    showOnlyFavorites = !showOnlyFavorites;
    const btn = document.getElementById('show-favorites');
    
    if (showOnlyFavorites) {
        btn.classList.add('filter-active');
        btn.innerHTML = '<i class="fas fa-heart"></i> Mostrando Favoritos';
    } else {
        btn.classList.remove('filter-active');
        btn.innerHTML = '<i class="fas fa-heart"></i> Favoritos';
    }
    
    renderMenuItems();
}

function saveFavoritesToStorage() {
    localStorage.setItem('saborexpress_favorites', JSON.stringify(favorites));
}

function loadFavoritesFromStorage() {
    try {
        const savedFavorites = localStorage.getItem('saborexpress_favorites');
        if (savedFavorites) {
            favorites = JSON.parse(savedFavorites);
        }
    } catch (error) {
        console.warn('Erro ao carregar favoritos:', error);
        favorites = [];
    }
}

// Sort Filter Handler
function handleSortFilter(e) {
    currentSort = e.target.value;
    renderMenuItems();
}

// Generate Stars HTML
function generateStarsHtml(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
    }
    
    return starsHtml;
}

// Promo Code Management
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value.toUpperCase().trim();
    const promoResult = document.getElementById('promo-result');
    
    if (!promoCode) {
        promoResult.innerHTML = '<div class="alert alert-warning">Digite um código promocional</div>';
        return;
    }
    
    const promo = promoCodes[promoCode];
    
    if (!promo) {
        promoResult.innerHTML = '<div class="alert alert-danger">Código promocional inválido</div>';
        return;
    }
    
    // Check minimum items for combo discount
    if (promo.minItems && cart.length < promo.minItems) {
        promoResult.innerHTML = `<div class="alert alert-warning">Este código requer pelo menos ${promo.minItems} itens no carrinho</div>`;
        return;
    }
    
    appliedPromo = { code: promoCode, ...promo };
    promoResult.innerHTML = '<div class="alert alert-success">Código aplicado com sucesso!</div>';
    
    updateCartUI();
    promoModal.hide();
    
    showToast(`Código ${promoCode} aplicado! 🎉`, 'success');
}

function removePromoCode() {
    appliedPromo = null;
    updateCartUI();
    showToast('Código promocional removido', 'info');
}

// User Authentication
function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user-plus me-2"></i>Criar Conta';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user me-2"></i>Entrar';
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showToast('Preencha todos os campos', 'warning');
        return;
    }
    
    // Simulate login
    currentUser = {
        id: 1,
        name: 'Usuário Demo',
        email: email,
        phone: '(11) 99999-9999'
    };
    
    saveUserData();
    updateUserUI();
    userModal.hide();
    
    showToast(`Bem-vindo, ${currentUser.name}! 👋`, 'success');
}

function handleRegister() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    
    if (!name || !email || !phone || !password) {
        showToast('Preencha todos os campos', 'warning');
        return;
    }
    
    // Simulate registration
    currentUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone
    };
    
    saveUserData();
    updateUserUI();
    userModal.hide();
    
    showToast(`Conta criada com sucesso! Bem-vindo, ${name}! 🎉`, 'success');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('saborexpress_user');
    updateUserUI();
    userModal.hide();
    showToast('Logout realizado com sucesso! 👋', 'info');
}

function updateUserUI() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userProfile = document.getElementById('user-profile');
    
    if (currentUser) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        userProfile.style.display = 'block';
        
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-email').textContent = currentUser.email;
        document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user me-2"></i>Minha Conta';
    } else {
        userProfile.style.display = 'none';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user me-2"></i>Entrar';
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('saborexpress_user', JSON.stringify(currentUser));
    }
}

function loadUserData() {
    try {
        const savedUser = localStorage.getItem('saborexpress_user');
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            updateUserUI();
        }
    } catch (error) {
        console.warn('Erro ao carregar dados do usuário:', error);
        currentUser = null;
    }
}

// Add ratings to existing menu items that don't have them
menuData.forEach(item => {
    if (!item.rating) {
        item.rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // Random rating between 3.0 and 5.0
        item.reviewCount = Math.floor(Math.random() * 200) + 10; // Random review count
        item.calories = Math.floor(Math.random() * 400) + 200; // Random calories
        item.protein = Math.floor(Math.random() * 30) + 10; // Random protein
        item.carbs = Math.floor(Math.random() * 50) + 20; // Random carbs
    }
});

// Enhanced updateCartUI function
const originalUpdateCartUI = updateCartUI;
updateCartUI = function() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let discount = 0;
    if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
            discount = subtotal * appliedPromo.discount;
        } else {
            discount = appliedPromo.discount;
        }
    }
    
    const deliveryFee = subtotal > 0 ? 5.00 : 0;
    const total = subtotal - discount + deliveryFee;
    
    cartCount.textContent = totalItems;
    
    // Update cart summary elements if they exist
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    
    if (cartSubtotal) cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (cartTotal) cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    if (deliveryFeeElement) deliveryFeeElement.textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;
    
    // Show/hide discount row
    const discountRow = document.getElementById('discount-row');
    const cartDiscount = document.getElementById('cart-discount');
    const appliedPromoDiv = document.getElementById('applied-promo');
    const promoName = document.getElementById('promo-name');
    
    if (appliedPromo && discount > 0 && discountRow) {
        discountRow.style.display = 'flex';
        if (cartDiscount) cartDiscount.textContent = `-R$ ${discount.toFixed(2).replace('.', ',')}`;
        if (appliedPromoDiv) appliedPromoDiv.style.display = 'block';
        if (promoName) promoName.textContent = `${appliedPromo.code} - ${appliedPromo.description}`;
    } else {
        if (discountRow) discountRow.style.display = 'none';
        if (appliedPromoDiv) appliedPromoDiv.style.display = 'none';
    }
    
    renderCartItems();
};

// Welcome message with new features
setTimeout(() => {
    showToast('🎉 <strong>Sabor Express Melhorado!</strong><br>✨ Modo escuro/claro<br>❤️ Sistema de favoritos<br>⭐ Avaliações e filtros<br>🏷️ Códigos promocionais<br>👤 Sistema de usuário', 'success');
}, 2000);

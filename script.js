// Menu Data
const menuData = [
    // Lanches
    {
        id: 1,
        name: "X-Burger Especial",
        description: "Hambúrguer artesanal 180g, queijo cheddar, alface, tomate, cebola roxa e molho especial da casa",
        price: 28.90,
        category: "lanches",
        icon: "🍔",
        popular: true
    },
    {
        id: 2,
        name: "X-Bacon Duplo",
        description: "Dois hambúrgueres 120g, bacon crocante, queijo, alface, tomate e maionese temperada",
        price: 32.90,
        category: "lanches",
        icon: "🥓",
        popular: false
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

// Cart Management
let cart = [];
let currentCategory = '';
let searchTerm = '';

// DOM Elements
const menuItemsContainer = document.getElementById('menu-items');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const categoryTabs = document.getElementById('category-tabs');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems();
    setupEventListeners();
    updateCartUI();
});

// Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Category filter
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Category tabs
    categoryTabs.addEventListener('click', handleCategoryTab);
    
    // Cart button
    cartBtn.addEventListener('click', () => cartModal.show());
    
    // Modal quantity controls
    document.getElementById('increase-qty').addEventListener('click', increaseQuantity);
    document.getElementById('decrease-qty').addEventListener('click', decreaseQuantity);
    
    // Add to cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', addToCartFromModal);
    
    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    
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
            <p class="mt-3 text-muted">Carregando delícias...</p>
        </div>
    `;
}

// Create Menu Item Card
function createMenuItemCard(item) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="menu-card" onclick="openItemModal(${item.id})">
            <div class="menu-card-image position-relative">
                <span class="menu-card-category">${getCategoryName(item.category)}</span>
                ${item.icon}
                ${item.popular ? '<div class="position-absolute top-0 start-0 m-2"><span class="badge popular-badge"><i class="fas fa-star me-1"></i>Popular</span></div>' : ''}
            </div>
            <div class="menu-card-body">
                <h5 class="menu-card-title">${item.name}</h5>
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

// Filter Menu Items
function filterMenuItems() {
    return menuData.filter(item => {
        const matchesCategory = !currentCategory || item.category === currentCategory;
        const matchesSearch = !searchTerm || 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesSearch;
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

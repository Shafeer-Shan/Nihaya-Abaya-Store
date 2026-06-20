// Nihaya Local Storage State Manager

// Default Whatsapp Business Number (can be customized by user in Settings)
const DEFAULT_WHATSAPP_NUMBER = '971500000000'; // Placeholder UAE country format

// Initialize store keys
const CART_KEY = 'nihaya_cart';
const WISHLIST_KEY = 'nihaya_wishlist';
const PROFILE_KEY = 'nihaya_profile';
const SETTINGS_KEY = 'nihaya_settings';

// CART FUNCTIONS
function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
}

function addToCart(productId, size = '54', quantity = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += parseInt(quantity);
  } else {
    cart.push({ id: productId, size, quantity: parseInt(quantity) });
  }

  saveCart(cart);
  showNotification('🛒 Item added to Cart!', 'success');
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart(cart);
  showNotification('🗑️ Item removed from Cart.', 'info');
}

function updateCartQuantity(productId, size, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId && item.size === size);
  if (item) {
    item.quantity = Math.max(1, parseInt(quantity));
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

// WISHLIST FUNCTIONS
function getWishlist() {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: wishlist }));
}

function addToWishlist(productId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveWishlist(wishlist);
    showNotification('✨ Added to Wishlist!', 'success');
  } else {
    showNotification('ℹ️ Already in Wishlist.', 'info');
  }
}

function removeFromWishlist(productId) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter(id => id !== productId);
  saveWishlist(wishlist);
  showNotification('💔 Removed from Wishlist.', 'info');
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// PROFILE FUNCTIONS
function getProfile() {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : {
    name: '',
    email: '',
    phone: '',
    address: '',
    points: 150,
    avatar: 'assets/images/default-avatar.svg'
  };
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent('profile-updated', { detail: profile }));
  showNotification('👤 Profile updated successfully!', 'success');
}

// SETTINGS FUNCTIONS
function getSettings() {
  const settings = localStorage.getItem(SETTINGS_KEY);
  return settings ? JSON.parse(settings) : {
    darkMode: false,
    notificationsEnabled: true,
    notificationFrequency: 'medium', // low, medium, high
    whatsappNumber: DEFAULT_WHATSAPP_NUMBER
  };
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('settings-updated', { detail: settings }));
  
  // Apply changes
  if (settings.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// WHATSAPP API INTEGRATION
function getWhatsAppUrl(text) {
  const settings = getSettings();
  const phone = settings.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  // Clean phone number (remove +, spaces, leading zeroes in country code if necessary)
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

// Order builder for a single product
function orderSingleOnWhatsApp(productId, size, quantity = 1) {
  // Ensure products.js is loaded
  if (typeof PRODUCTS === 'undefined') return;
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const profile = getProfile();
  
  let message = `*✨ NIHAYA - Order Inquiry ✨*\n\n`;
  message += `Hello Nihaya team, I would like to order this item:\n\n`;
  message += `*Product:* ${product.name}\n`;
  message += `*SKU:* ${product.sku}\n`;
  message += `*Size:* ${size}\n`;
  message += `*Quantity:* ${quantity}\n`;
  message += `*Price:* ₹${product.price.toFixed(2)} INR each\n`;
  
  const total = product.price * quantity;
  message += `*Total:* ₹${total.toFixed(2)} INR\n\n`;
  
  message += `*Delivery Details:*\n`;
  message += `*Name:* ${profile.name}\n`;
  message += `*Phone:* ${profile.phone}\n`;
  message += `*Address:* ${profile.address}\n\n`;
  message += `Please confirm availability and bank transfer details. Thank you!`;

  window.open(getWhatsAppUrl(message), '_blank');
}

// Order builder for whole cart
function checkoutCartOnWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification('⚠️ Your cart is empty.', 'error');
    return;
  }
  
  if (typeof PRODUCTS === 'undefined') return;
  const profile = getProfile();

  let message = `*🛍️ NIHAYA - Cart Checkout 🛍️*\n\n`;
  message += `Hello Nihaya team, I would like to purchase the following items in my cart:\n\n`;

  let totalSum = 0;
  cart.forEach((item, index) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      const lineTotal = product.price * item.quantity;
      totalSum += lineTotal;
      message += `${index + 1}. *${product.name}*\n`;
      message += `   - Size: ${item.size}\n`;
      message += `   - Qty: ${item.quantity}\n`;
      message += `   - Price: ₹${product.price.toFixed(2)} INR\n`;
      message += `   - Subtotal: ₹${lineTotal.toFixed(2)} INR\n\n`;
    }
  });

  message += `*Total Order Value:* ₹${totalSum.toFixed(2)} INR\n\n`;
  message += `*Delivery Details:*\n`;
  message += `*Name:* ${profile.name}\n`;
  message += `*Phone:* ${profile.phone}\n`;
  message += `*Address:* ${profile.address}\n\n`;
  message += `Please confirm my order and let me know the payment details.`;

  window.open(getWhatsAppUrl(message), '_blank');
}

// HELPER NOTIFICATION TRIGGER
function showNotification(message, type = 'info') {
  // Dispatches notification event which notifications.js will capture
  window.dispatchEvent(new CustomEvent('nihaya-toast', {
    detail: { message, type }
  }));
}

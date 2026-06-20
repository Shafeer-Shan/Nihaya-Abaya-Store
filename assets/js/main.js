// Nihaya Main global logic controller

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initTheme();
  initSearch();
  updateHeaderCounters();
  highlightActiveBottomNav();
  setupGlobalListeners();
});

// 1. SPLASH SCREEN
function initSplashScreen() {
  const splash = document.getElementById('nihaya-splash-screen');
  if (!splash) return;

  const hasVisited = sessionStorage.getItem('nihaya_visited');
  if (hasVisited === 'true') {
    splash.style.display = 'none';
  } else {
    // Reveal and fade out after a brief delay
    setTimeout(() => {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.style.display = 'none';
        sessionStorage.setItem('nihaya_visited', 'true');
      }, 1000); // matches CSS transition duration
    }, 2200); // display splash logo for 2.2s
  }
}

// 2. THEME / DARK MODE
function initTheme() {
  // Read theme settings from store
  const settings = typeof getSettings === 'function' ? getSettings() : { darkMode: false };
  if (settings.darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    const toggles = document.querySelectorAll('.theme-toggle-checkbox');
    toggles.forEach(t => t.checked = true);
    updateThemeToggleIcons(true);
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateThemeToggleIcons(false);
  }
}

function updateThemeToggleIcons(enabled) {
  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  themeButtons.forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('bi-moon-stars-fill', enabled);
    icon.classList.toggle('bi-sun-fill', !enabled);
    btn.setAttribute('aria-label', enabled ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = enabled ? 'Switch to light mode' : 'Switch to dark mode';
  });
}

function toggleDarkModeGlobal(enabled) {
  if (typeof getSettings === 'function' && typeof saveSettings === 'function') {
    const settings = getSettings();
    settings.darkMode = enabled;
    saveSettings(settings);
  }

  if (enabled) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  const themeCheckboxes = document.querySelectorAll('.theme-toggle-checkbox');
  themeCheckboxes.forEach(input => input.checked = enabled);
  updateThemeToggleIcons(enabled);

  showNotification({
    title: enabled ? 'Dark Canopy Active' : 'Light Canopy Active',
    subtitle: enabled ? 'Beige-luxury aesthetics configured for night-time comfort.' : 'Boutique standard palette restored.',
    footer: 'NIHAYA PUSH • INSTANT BROADCAST'
  }, 'info');
}

// 3. SEARCH BAR INSTANT RESULTS
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchDropdown = document.getElementById('search-results-dropdown');
  
  if (!searchInput || !searchDropdown) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length === 0) {
      hideSearchDropdown();
      return;
    }

    if (typeof PRODUCTS === 'undefined') return;

    // Filter products matching name or category or SKU
    const results = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.sku.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query)
    );

    renderSearchResults(results);
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      hideSearchDropdown();
    }
  });
}

function renderSearchResults(results) {
  const searchDropdown = document.getElementById('search-results-dropdown');
  if (!searchDropdown) return;

  searchDropdown.innerHTML = '';

  if (results.length === 0) {
    searchDropdown.innerHTML = '<div class="search-no-results">No luxury items match your search</div>';
  } else {
    // Limit to top 5 results
    results.slice(0, 5).forEach(product => {
      const item = document.createElement('a');
      item.href = `product.html?id=${product.id}`;
      item.className = 'search-item';
      item.innerHTML = `
        <img src="${product.primaryImage}" alt="${product.name}" class="search-thumb">
        <div class="search-info">
          <div class="search-name">${product.name}</div>
          <div class="search-price">₹${product.price.toFixed(2)} INR</div>
        </div>
      `;
      searchDropdown.appendChild(item);
    });
  }

  searchDropdown.classList.add('show');
}

function hideSearchDropdown() {
  const searchDropdown = document.getElementById('search-results-dropdown');
  if (searchDropdown) {
    searchDropdown.classList.remove('show');
  }
}

// 4. COUNTER BADGES
function updateHeaderCounters() {
  if (typeof getCart !== 'function' || typeof getWishlist !== 'function') return;

  const cart = getCart();
  const wishlist = getWishlist();

  // Sum cart quantity
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Cart Badge (Desktop & Bottom Mobile Nav)
  const cartBadges = document.querySelectorAll('.cart-badge');
  cartBadges.forEach(badge => {
    if (cartCount > 0) {
      badge.textContent = cartCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });

  // Wishlist Badge (Desktop & Bottom Mobile Nav)
  const wishlistBadges = document.querySelectorAll('.wishlist-badge');
  wishlistBadges.forEach(badge => {
    if (wishlistCount > 0) {
      badge.textContent = wishlistCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });
}

// 5. MOBILE BOTTOM NAV HIGHLIGHT
function highlightActiveBottomNav() {
  const navItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
  const currentPath = window.location.pathname.toLowerCase();

  navItems.forEach(item => {
    const itemHref = item.getAttribute('href');
    if (!itemHref) return;
    
    const pageName = itemHref.toLowerCase();
    
    // Check if the current URL path ends with or contains the nav page name
    if (currentPath.endsWith(pageName) || 
       (pageName === 'index.html' && (currentPath === '/' || currentPath.endsWith('nihaya-antigravity/'))) ||
       (pageName === 'profile.html' && currentPath.includes('dashboard.html')) ||
       (pageName === 'profile.html' && currentPath.includes('settings.html'))) {
      
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
    }
  });
}

// 6. GLOBAL STATE EVENT LISTENERS
function setupGlobalListeners() {
  // Update badges whenever cart or wishlist updates
  window.addEventListener('cart-updated', updateHeaderCounters);
  window.addEventListener('wishlist-updated', updateHeaderCounters);
  
  // Theme toggle controls
  const themeCheckboxes = document.querySelectorAll('.theme-toggle-checkbox');
  themeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      toggleDarkModeGlobal(e.target.checked);
      // Synchronize other checkboxes
      themeCheckboxes.forEach(other => {
        if (other !== checkbox) other.checked = e.target.checked;
      });
    });
  });

  const themeButtons = document.querySelectorAll('.theme-toggle-btn');
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      toggleDarkModeGlobal(!isDark);
    });
  });
}

// Helper to check and active query parameter in single product detail pages
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// 7. HEADER / MOBILE AVATAR SYNC
function updateHeaderAvatar() {
  if (typeof getProfile !== 'function') return;
  const profile = getProfile();
  const defaultAvatarPath = new URL('assets/images/default-avatar.svg', location.href).href;
  const avatarSrc = profile && profile.avatar ? profile.avatar : defaultAvatarPath;
  const name = profile && profile.name ? profile.name : 'Customer';

  // Desktop header avatar (anchor with id 'profile-header-link')
  const headerLink = document.getElementById('profile-header-link');
  if (headerLink) {
    let img = headerLink.querySelector('#header-user-avatar');
    // remove only icon elements (like <i>) but preserve other content
    const iconEls = headerLink.querySelectorAll('i, svg');
    iconEls.forEach(el => el.remove());
    if (!img) {
      img = document.createElement('img');
      img.id = 'header-user-avatar';
      img.className = 'rounded-circle';
      img.style.width = '34px';
      img.style.height = '34px';
      img.style.objectFit = 'cover';
      img.style.border = '1px solid rgba(0,0,0,0.05)';
      img.style.display = 'inline-block';
      img.style.verticalAlign = 'middle';
      img.setAttribute('aria-hidden', 'true');
      headerLink.prepend(img);
      headerLink.setAttribute('aria-label', 'User Profile');
    }
    img.src = avatarSrc;
    img.alt = name + ' avatar';
    img.onerror = function() {
      if (img.src !== defaultAvatarPath) img.src = defaultAvatarPath;
    };
  }

  // Mobile bottom nav avatar: anchor that links to profile.html inside .mobile-bottom-nav
    const mobileProfileAnchor = document.querySelector('.mobile-bottom-nav a[href="profile.html"]');
    if (mobileProfileAnchor) {
      let mimg = mobileProfileAnchor.querySelector('#mobile-user-avatar');
      const icon = mobileProfileAnchor.querySelector('i, svg');
      if (icon) icon.remove();
      if (!mimg) {
        mimg = document.createElement('img');
        mimg.id = 'mobile-user-avatar';
        mimg.className = 'rounded-circle';
        mimg.style.width = '22px';
        mimg.style.height = '22px';
        mimg.style.objectFit = 'cover';
        mimg.style.display = 'inline-block';
        mimg.style.verticalAlign = 'middle';
        mobileProfileAnchor.prepend(mimg);
      }
      mimg.src = avatarSrc;
      mimg.alt = name + ' avatar';
      mimg.onerror = function() {
        if (mimg.src !== defaultAvatarPath) mimg.src = defaultAvatarPath;
      };
    }
}

// Run once when DOM ready and after any profile update
document.addEventListener('DOMContentLoaded', updateHeaderAvatar);
window.addEventListener('profile-updated', updateHeaderAvatar);

document.addEventListener('DOMContentLoaded', () => {
  const ADMIN_AUTH_TOKEN = 'nihaya_admin_authenticated';
  const ADMIN_PASSPHRASE = 'nihaya-atelier-2026';

  const authCard = document.getElementById('admin-auth-card');
  const adminPanel = document.getElementById('admin-panel');
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminPasscode = document.getElementById('admin-passcode');
  const adminLoginError = document.getElementById('admin-login-error');

  const productForm = document.getElementById('admin-product-form');
  const formTitle = document.getElementById('admin-form-title');
  const formStateBadge = document.getElementById('admin-form-state');
  const cancelEditBtn = document.getElementById('admin-cancel-edit-btn');
  const resetCatalogBtn = document.getElementById('admin-reset-catalog-btn');
  const productTableBody = document.getElementById('admin-product-table-body');
  const productCountLabel = document.getElementById('admin-product-count');
  const totalProductsLabel = document.getElementById('admin-total-products');
  const trendingProductsLabel = document.getElementById('admin-trending-products');
  const categoryCountLabel = document.getElementById('admin-category-count');
  const searchInput = document.getElementById('admin-search-input');
  const exportBtn = document.getElementById('admin-export-btn');
  const importBtn = document.getElementById('admin-import-btn');
  const importFileInput = document.getElementById('admin-import-file');

  const productIdInput = document.getElementById('admin-edit-product-id');
  const nameInput = document.getElementById('admin-product-name');
  const skuInput = document.getElementById('admin-product-sku');
  const priceInput = document.getElementById('admin-product-price');
  const categoryInput = document.getElementById('admin-product-category');
  const materialInput = document.getElementById('admin-product-material');
  const descriptionInput = document.getElementById('admin-product-description');
  const detailsInput = document.getElementById('admin-product-details');
  const colorsInput = document.getElementById('admin-product-colors');
  const sizesInput = document.getElementById('admin-product-sizes');
  const primaryUrlInput = document.getElementById('admin-primary-image-url');
  const secondaryUrlInput = document.getElementById('admin-secondary-image-url');
  const primaryFileInput = document.getElementById('admin-primary-image-file');
  const secondaryFileInput = document.getElementById('admin-secondary-image-file');
  const trendingCheckbox = document.getElementById('admin-product-trending');

  let editingProductId = null;

  function isAdminAuthenticated() {
    return sessionStorage.getItem(ADMIN_AUTH_TOKEN) === 'true';
  }

  function setAdminAuthenticated() {
    sessionStorage.setItem(ADMIN_AUTH_TOKEN, 'true');
  }

  function showAdminPanel() {
    authCard.hidden = true;
    adminPanel.hidden = false;
    loadAdminState();
  }

  function showAuthForm() {
    authCard.hidden = false;
    adminPanel.hidden = true;
  }

  function loadAdminState() {
    renderSummaryCards();
    renderProductTable();
    resetProductForm();
  }

  function renderSummaryCards() {
    const products = typeof getAllProducts === 'function' ? getAllProducts() : [];
    const trending = products.filter(p => p.trending).length;
    const categories = new Set(products.map(p => p.category || '').filter(Boolean));

    totalProductsLabel.textContent = products.length;
    trendingProductsLabel.textContent = trending;
    categoryCountLabel.textContent = categories.size;
  }

  function renderProductTable(searchTerm = '') {
    const products = typeof getAllProducts === 'function' ? getAllProducts() : [];
    const filterTerm = searchTerm.trim().toLowerCase();
    const filtered = products.filter(product => {
      if (!filterTerm) return true;
      return [product.name, product.sku, product.category]
        .filter(Boolean)
        .some(value => value.toLowerCase().includes(filterTerm));
    });

    productTableBody.innerHTML = '';
    if (filtered.length === 0) {
      productTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-muted py-4">No products match your search.</td>
        </tr>
      `;
      productCountLabel.textContent = '0 products displayed';
      return;
    }

    filtered.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${product.primaryImage || 'assets/images/abaya_beige.png'}" alt="${product.name}" class="product-preview-thumb">
        </td>
        <td>
          <strong>${product.name}</strong><br>
          <span class="text-muted small">${product.sku || 'No SKU'}</span>
        </td>
        <td>${product.category || 'Uncategorized'}</td>
        <td>₹${Number(product.price || 0).toFixed(2)}</td>
        <td>${product.trending ? '<span class="badge bg-success">Trending</span>' : '<span class="badge bg-secondary">Standard</span>'}</td>
        <td class="text-end">
          <button type="button" class="btn btn-sm btn-outline-nihaya admin-edit-btn" data-id="${product.id}"><i class="bi bi-pencil-square"></i></button>
          <button type="button" class="btn btn-sm btn-outline-danger admin-delete-btn" data-id="${product.id}"><i class="bi bi-trash"></i></button>
        </td>
      `;
      productTableBody.appendChild(row);
    });
    productCountLabel.textContent = `${filtered.length} product${filtered.length === 1 ? '' : 's'} displayed`;
  }

  function resetProductForm() {
    editingProductId = null;
    productIdInput.value = '';
    nameInput.value = '';
    skuInput.value = '';
    priceInput.value = '';
    categoryInput.value = '';
    materialInput.value = '';
    descriptionInput.value = '';
    detailsInput.value = '';
    colorsInput.value = '';
    sizesInput.value = '';
    primaryUrlInput.value = '';
    secondaryUrlInput.value = '';
    primaryFileInput.value = '';
    secondaryFileInput.value = '';
    trendingCheckbox.checked = false;
    formTitle.textContent = 'Add New Product';
    formStateBadge.textContent = 'New';
    cancelEditBtn.classList.add('d-none');
    document.getElementById('admin-save-product-btn').textContent = 'Save Product';
  }

  function setFormForEdit(product) {
    editingProductId = product.id;
    productIdInput.value = product.id;
    nameInput.value = product.name || '';
    skuInput.value = product.sku || '';
    priceInput.value = Number(product.price || 0).toFixed(2);
    categoryInput.value = product.category || '';
    materialInput.value = product.material || '';
    descriptionInput.value = product.description || '';
    detailsInput.value = Array.isArray(product.details) ? product.details.join('\n') : '';
    colorsInput.value = Array.isArray(product.colorOptions) ? product.colorOptions.join(', ') : '';
    sizesInput.value = Array.isArray(product.sizes) ? product.sizes.join(', ') : '';
    primaryUrlInput.value = product.primaryImage || '';
    secondaryUrlInput.value = product.secondaryImage || '';
    trendingCheckbox.checked = Boolean(product.trending);
    formTitle.textContent = 'Edit Product';
    formStateBadge.textContent = 'Edit';
    cancelEditBtn.classList.remove('d-none');
    document.getElementById('admin-save-product-btn').textContent = 'Update Product';
  }

  function buildProductPayload() {
    const detailsList = detailsInput.value.split('\n').map(item => item.trim()).filter(Boolean);
    const colorList = colorsInput.value.split(',').map(item => item.trim()).filter(Boolean);
    const sizeList = sizesInput.value.split(',').map(item => item.trim()).filter(Boolean);

    const payload = {
      name: nameInput.value.trim(),
      sku: skuInput.value.trim(),
      price: parseFloat(priceInput.value) || 0,
      category: categoryInput.value.trim(),
      material: materialInput.value.trim(),
      description: descriptionInput.value.trim(),
      details: detailsList,
      colorOptions: colorList,
      sizes: sizeList,
      primaryImage: primaryUrlInput.value.trim() || '',
      secondaryImage: secondaryUrlInput.value.trim() || '',
      trending: trendingCheckbox.checked
    };

    if (payload.primaryImage === '') {
      payload.primaryImage = 'assets/images/abaya_beige.png';
    }

    return payload;
  }

  function initializeImageReader(fileInput, urlInput) {
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        urlInput.value = loadEvent.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function handleProductEdit(productId) {
    if (typeof getProductById !== 'function') return;
    const product = getProductById(productId);
    if (!product) return;
    setFormForEdit(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleProductDelete(productId) {
    if (!confirm('Delete this product from the catalog? This action cannot be undone in browser storage.')) return;
    if (typeof deleteProduct !== 'function') return;
    deleteProduct(productId);
    window.dispatchEvent(new CustomEvent('nihaya-products-updated'));
    showNotification('Product removed from catalog.', 'info');
    loadAdminState();
  }

  function handleExportCatalog() {
    if (typeof getAllProducts !== 'function') return;
    const data = JSON.stringify(getAllProducts(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nihaya-products-export.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function handleImportCatalog(file) {
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(loadEvent.target.result);
        if (!Array.isArray(parsed)) throw new Error('Invalid product catalog format.');
        if (typeof setProductCatalog !== 'function') return;
        setProductCatalog(parsed.map(item => ({
          id: item.id || generateProductId(item.name || 'product'),
          name: item.name || '',
          sku: item.sku || '',
          price: parseFloat(item.price) || 0,
          category: item.category || '',
          material: item.material || '',
          description: item.description || '',
          details: Array.isArray(item.details) ? item.details : (typeof item.details === 'string' ? item.details.split('\n').map(line => line.trim()).filter(Boolean) : []),
          primaryImage: item.primaryImage || item.primaryImage || 'assets/images/abaya_beige.png',
          secondaryImage: item.secondaryImage || item.secondaryImage || '',
          colorOptions: Array.isArray(item.colorOptions) ? item.colorOptions : (typeof item.colorOptions === 'string' ? item.colorOptions.split(',').map(i => i.trim()).filter(Boolean) : []),
          sizes: Array.isArray(item.sizes) ? item.sizes : (typeof item.sizes === 'string' ? item.sizes.split(',').map(i => i.trim()).filter(Boolean) : []),
          trending: Boolean(item.trending)
        })));
        showNotification('Product catalog imported successfully.', 'success');
        loadAdminState();
      } catch (error) {
        showNotification('Failed to import JSON file. Please use an exported catalog format.', 'error');
      }
    };
    reader.readAsText(file);
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const passcode = adminPasscode.value.trim();
      if (passcode === ADMIN_PASSPHRASE) {
        setAdminAuthenticated();
        showAdminPanel();
      } else {
        adminLoginError.classList.remove('d-none');
      }
    });
  }

  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', resetProductForm);
  }

  if (resetCatalogBtn) {
    resetCatalogBtn.addEventListener('click', () => {
      if (!confirm('Restore the original catalog data? This will overwrite current browser-stored products.')) return;
      if (typeof resetProductCatalog !== 'function') return;
      resetProductCatalog();
      showNotification('Catalog restored to original product seed data.', 'success');
      loadAdminState();
    });
  }

  if (productForm) {
    productForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const payload = buildProductPayload();
      if (!payload.name || !payload.sku) {
        showNotification('Product name and SKU are required.', 'error');
        return;
      }
      if (editingProductId && typeof updateProduct === 'function') {
        updateProduct(editingProductId, payload);
        showNotification('Product updated successfully.', 'success');
      } else if (typeof addProduct === 'function') {
        addProduct(payload);
        showNotification('Product added successfully.', 'success');
      }
      window.dispatchEvent(new CustomEvent('nihaya-products-updated'));
      loadAdminState();
    });
  }

  if (productTableBody) {
    productTableBody.addEventListener('click', (event) => {
      const editBtn = event.target.closest('.admin-edit-btn');
      if (editBtn) {
        handleProductEdit(editBtn.dataset.id);
        return;
      }
      const deleteBtn = event.target.closest('.admin-delete-btn');
      if (deleteBtn) {
        handleProductDelete(deleteBtn.dataset.id);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderProductTable(searchInput.value));
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', handleExportCatalog);
  }

  if (importBtn) {
    importBtn.addEventListener('click', () => importFileInput.click());
  }

  if (importFileInput) {
    importFileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      handleImportCatalog(file);
      importFileInput.value = '';
    });
  }

  if (primaryFileInput) {
    initializeImageReader(primaryFileInput, primaryUrlInput);
  }

  if (secondaryFileInput) {
    initializeImageReader(secondaryFileInput, secondaryUrlInput);
  }

  window.addEventListener('nihaya-products-updated', () => {
    renderSummaryCards();
    renderProductTable(searchInput ? searchInput.value : '');
  });

  if (isAdminAuthenticated()) {
    showAdminPanel();
  } else {
    showAuthForm();
  }
});

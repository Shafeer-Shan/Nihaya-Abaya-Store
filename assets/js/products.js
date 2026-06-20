const PRODUCT_STORAGE_KEY = 'nihaya_products';

const INITIAL_PRODUCTS = [
  {
    id: 'abaya-beige-linen-open',
    name: 'Luxury Beige Linen Open Abaya',
    sku: 'NH-001',
    price: 349.00,
    category: 'Linen Collection',
    material: 'Premium Organic Linen',
    description: 'A masterpiece of minimalist luxury. Crafted from premium breathable organic linen, this open-style Abaya features wide sleeves, relaxed tailoring, and a sophisticated silhouette that drapes elegantly. Ideal for layered styling in warmer climates.',
    details: [
      '100% Organic breathable linen fabric',
      'Relaxed open-front design with side slits',
      'Wide elegant kimono sleeves',
      'Includes matching chiffon shayla (scarf)',
      'Handmade in our Nihaya luxury atelier'
    ],
    primaryImage: 'assets/images/abaya_beige.png',
    secondaryImage: 'https://img1.thasho.com/product_media/portrait/2026-05-04/medium-size/a9d916de867de09cf3ef51ad670ff65a.png',
    colorOptions: ['Pearl Beige', 'Alabaster Cream'],
    sizes: ['52', '54', '56', '58'],
    rating: 4.9,
    reviews: 24,
    trending: true
  },
  {
    id: 'abaya-classic-black-nida',
    name: 'Classic Noir Nida Abaya',
    sku: 'NH-002',
    price: 299.00,
    category: 'Classic Black',
    material: 'Premium Korean Nida',
    description: 'The epitome of modest elegance. Made from the finest Korean Nida fabric, this classic closed Abaya features a subtle sheen and an incredibly soft touch. Designed with an A-line cut that moves gracefully with every step.',
    details: [
      'Original premium Korean Nida fabric',
      'Closed front with delicate snap buttons on collar',
      'Discreet side pockets for functionality',
      'Breathable, lightweight, and wrinkle-resistant',
      'Includes premium black shayla'
    ],
    primaryImage: 'https://img1.thasho.com/product_media/portrait/2026-04-04/medium-size/b704ec20488b0b9ed2231b7f19383300.png',
    secondaryImage: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=800&q=80',
    colorOptions: ['Noir Black', 'Midnight Charcoal'],
    sizes: ['52', '54', '56', '58', '60'],
    rating: 4.8,
    reviews: 42,
    trending: true
  },
  {
    id: 'abaya-emerald-velvet-trim',
    name: 'Royal Emerald Velvet Trimmed Abaya',
    sku: 'NH-003',
    price: 450.00,
    category: 'Velvet Collection',
    material: 'Premium Velvet & Georgette',
    description: 'Elevate your evening wear with this luxurious statement piece. Combining high-grade flowy georgette with deep emerald green velvet paneling along the sleeves and lapel, this Abaya exudes opulence and grandeur.',
    details: [
      'Premium heavy-weight georgette body with micro-velvet trims',
      'Exquisite deep emerald velvet detailing',
      'Structured cuffs with hidden button fastenings',
      'Sophisticated drape suitable for formal events',
      'Includes coordinating emerald bordered shayla'
    ],
    primaryImage: 'https://img1.thasho.com/product_media/portrait/2026-04-04/medium-size/b3936542f4b81a3ba715483abf534963.png',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    colorOptions: ['Royal Emerald'],
    sizes: ['54', '56', '58'],
    rating: 5.0,
    reviews: 18,
    trending: true
  },
  {
    id: 'abaya-pearl-embellished-organza',
    name: 'Celestial Pearl Organza Abaya',
    sku: 'NH-004',
    price: 389.00,
    category: 'Organza Collection',
    material: 'Premium Sheer Organza',
    description: 'A dreamy, ethereal layer. This Abaya features a semi-sheer premium organza overlay adorned with delicate, hand-stitched pearls along the shoulders and cuffs. Its structured yet fluid silhouette adds instant luxury to any inner slip.',
    details: [
      'Premium ultra-lightweight sheer organza',
      'Hand-sewn faux pearl embellishments',
      'Voluminous puff sleeves with elastic cuffs',
      'Stunning reflective sheen in daylight',
      'Best layered over a silk or satin inner dress'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    colorOptions: ['Celestial Pearl'],
    sizes: ['52', '54', '56'],
    rating: 4.7,
    reviews: 15,
    trending: false
  },
  {
    id: 'abaya-textured-crepe-wrap',
    name: 'Sand Textured Crêpe Wrap Abaya',
    sku: 'NH-005',
    price: 320.00,
    category: 'Crepe Collection',
    material: 'Textured Saudi Crêpe',
    description: 'An elegant wrap-around design offering contemporary sophistication. Crafted from medium-weight textured Saudi Crêpe in a beautiful sand-beige tone, it features a waist tie that allows you to define your shape or wear it loose as an open cardigan.',
    details: [
      'Premium textured Saudi Crêpe fabric',
      'Versatile wrap-around style with matching belt',
      'Clean, structured lapel detailing',
      'Rich earthy sand colorway',
      'Includes premium sand-toned chiffon shayla'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
    colorOptions: ['Sand Textured'],
    sizes: ['52', '54', '56', '58'],
    rating: 4.9,
    reviews: 31,
    trending: true
  },
  {
    id: 'abaya-sage-silk-satin',
    name: 'Sage Whisper Silk Satin Abaya',
    sku: 'NH-006',
    price: 420.00,
    category: 'Silk & Satin',
    material: 'Premium Mulberry Silk Satin Blend',
    description: 'Indulge in the luxury of pure liquid silk. This stunning Abaya comes in a muted sage green tone, featuring a satin finish that catches the light beautifully. Its cooling fabric makes it perfect for warm evening gatherings.',
    details: [
      'Premium mulberry silk and satin blend fabric',
      'Stunning soft sage green with liquid sheen',
      'Wide elegant bell sleeves',
      'Incredibly soft, cooling, and gentle on skin',
      'Includes sage silk-blend shayla'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    colorOptions: ['Sage Whisper'],
    sizes: ['52', '54', '56'],
    rating: 4.9,
    reviews: 12,
    trending: false
  },
  {
    id: 'abaya-embroidered-chiffon',
    name: 'Flora Gold Embroidered Chiffon Abaya',
    sku: 'NH-007',
    price: 360.00,
    category: 'Embroidered Collection',
    material: 'Double-Layered Chiffon',
    description: 'Delicate and highly detailed. This double-layered breathable black chiffon Abaya features gorgeous botanical embroidery in luxury metallic gold threads along the sleeves and back hemline. Absolute refinement in every stitch.',
    details: [
      'Breathable, premium double-layered chiffon',
      'Metallic gold botanical embroidery on cuffs and hem',
      'Flowy, semi-sheer sleeves with solid inner lining',
      'Extremely lightweight and travel-friendly',
      'Includes gold-accented black chiffon shayla'
    ],
    primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=800&q=80',
    colorOptions: ['Flora Gold'],
    sizes: ['54', '56', '58', '60'],
    rating: 4.6,
    reviews: 29,
    trending: false
  },
  {
    id: 'abaya-dualtone-modern',
    name: 'Sleek Dual-Tone Panel Abaya',
    sku: 'NH-008',
    price: 310.00,
    category: 'Modern Contemporary',
    material: 'Premium Linen-Cotton Blend',
    description: 'For the modern woman who values structure. Combining soft ecru-beige and crisp cream linen panels in an asymmetrical contemporary layout, this Abaya is a clean, structural fashion statement for both casual and professional settings.',
    details: [
      'Premium structured linen-cotton blend fabric',
      'Modern color-block panel design (Beige & Cream)',
      'Hidden slip pockets and press-stud cuffs',
      'Tailored collar for a structured neckline',
      'Includes dual-toned edge-stitched shayla'
    ],
    primaryImage: 'assets/images/abaya_beige.png',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    colorOptions: ['Beige','Cream'],
    sizes: ['52', '54', '56', '58'],
    rating: 4.8,
    reviews: 22,
    trending: true
  }
];

// Supabase Configuration
const SUPABASE_URL = 'https://peynmhxgwojtkanprrmd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBleW5taHhnd29qdGthbnBycm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDk3MDIsImV4cCI6MjA5NzUyNTcwMn0.3LBGgDl4V08PK3KmDeICsvstAJR-8i9noKb9HAW_lMU';

let supabaseClient = null;
if (typeof window !== 'undefined' && window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function loadStoredCatalog() {
  if (typeof localStorage === 'undefined') return [...INITIAL_PRODUCTS];
  const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...INITIAL_PRODUCTS];
  } catch (error) {
    console.warn('Unable to parse stored product catalog, reverting to initial data.', error);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }
}

function saveProductCatalog(products) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

let PRODUCTS = loadStoredCatalog();

// Async Background Sync with Supabase (Stale-While-Revalidate pattern)
async function syncWithSupabase() {
  if (!supabaseClient && typeof window !== 'undefined' && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  if (!supabaseClient) return;

  try {
    let { data: supabaseProducts, error } = await supabaseClient
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Seeding: if database table is empty, populate it with initial products
    if (!supabaseProducts || supabaseProducts.length === 0) {
      console.log('Supabase table is empty. Seeding default catalog...');
      const { error: seedError } = await supabaseClient
        .from('products')
        .insert(INITIAL_PRODUCTS.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku,
          price: p.price,
          category: p.category,
          material: p.material,
          description: p.description,
          details: p.details,
          primaryImage: p.primaryImage,
          secondaryImage: p.secondaryImage,
          colorOptions: p.colorOptions,
          sizes: p.sizes,
          rating: p.rating,
          reviews: p.reviews,
          trending: p.trending
        })));

      if (seedError) throw seedError;

      // Re-fetch seeded data
      const { data: reFetched, error: reFetchError } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });
      if (reFetchError) throw reFetchError;
      supabaseProducts = reFetched;
    }

    const formattedProducts = supabaseProducts.map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price: Number(p.price),
      category: p.category,
      material: p.material,
      description: p.description,
      details: Array.isArray(p.details) ? p.details : [],
      primaryImage: p.primaryImage,
      secondaryImage: p.secondaryImage || '',
      colorOptions: Array.isArray(p.colorOptions) ? p.colorOptions : [],
      sizes: Array.isArray(p.sizes) ? p.sizes : [],
      rating: Number(p.rating),
      reviews: Number(p.reviews),
      trending: Boolean(p.trending)
    }));

    // Update local cache and dispatch refresh event
    saveProductCatalog(formattedProducts);
    PRODUCTS = formattedProducts;
    window.dispatchEvent(new CustomEvent('nihaya-products-updated'));
  } catch (err) {
    console.error('Failed to sync catalog with Supabase:', err);
  }
}

function persistProductCatalog() {
  saveProductCatalog(PRODUCTS);
}

function getAllProducts() {
  return PRODUCTS;
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getTrendingProducts() {
  return PRODUCTS.filter(p => p.trending);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function getCategories() {
  const categories = new Set(PRODUCTS.map(p => p.category));
  return Array.from(categories);
}

// Ensure unique dynamic IDs
function generateProductId(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  let candidate = slug || `product-${Date.now()}`;
  let counter = 1;
  while (PRODUCTS.some(p => p.id === candidate)) {
    candidate = `${slug}-${counter++}`;
  }
  return candidate;
}

async function addProduct(product) {
  const newProduct = {
    ...product,
    id: product.id || generateProductId(product.name),
    rating: product.rating || 4.8,
    reviews: product.reviews || 0
  };

  // Optimistic UI updates
  PRODUCTS.push(newProduct);
  persistProductCatalog();
  window.dispatchEvent(new CustomEvent('nihaya-products-updated'));

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .insert([newProduct]);
      if (error) throw error;
      syncWithSupabase();
    } catch (err) {
      console.error('Supabase insert error:', err);
    }
  }
  return newProduct;
}

async function updateProduct(id, updates) {
  const index = PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return null;

  const updated = {
    ...PRODUCTS[index],
    ...updates,
    id
  };

  // Optimistic UI updates
  PRODUCTS[index] = updated;
  persistProductCatalog();
  window.dispatchEvent(new CustomEvent('nihaya-products-updated'));

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
      syncWithSupabase();
    } catch (err) {
      console.error('Supabase update error:', err);
    }
  }
  return updated;
}

async function deleteProduct(id) {
  const index = PRODUCTS.findIndex(p => p.id === id);
  if (index === -1) return false;

  // Optimistic UI updates
  PRODUCTS.splice(index, 1);
  persistProductCatalog();
  window.dispatchEvent(new CustomEvent('nihaya-products-updated'));

  if (supabaseClient) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      syncWithSupabase();
    } catch (err) {
      console.error('Supabase delete error:', err);
    }
  }
  return true;
}

async function setProductCatalog(products) {
  PRODUCTS = Array.isArray(products) ? products : [];
  persistProductCatalog();
  window.dispatchEvent(new CustomEvent('nihaya-products-updated'));

  if (supabaseClient) {
    try {
      const { error: deleteError } = await supabaseClient
        .from('products')
        .delete()
        .neq('id', 'dummy');
      if (deleteError) throw deleteError;

      if (PRODUCTS.length > 0) {
        const { error: insertError } = await supabaseClient
          .from('products')
          .insert(PRODUCTS);
        if (insertError) throw insertError;
      }
      syncWithSupabase();
    } catch (err) {
      console.error('Supabase set catalog error:', err);
    }
  }
  return PRODUCTS;
}

async function resetProductCatalog() {
  PRODUCTS = [...INITIAL_PRODUCTS];
  persistProductCatalog();
  window.dispatchEvent(new CustomEvent('nihaya-products-updated'));

  if (supabaseClient) {
    try {
      const { error: deleteError } = await supabaseClient
        .from('products')
        .delete()
        .neq('id', 'dummy');
      if (deleteError) throw deleteError;
      
      const { error: seedError } = await supabaseClient
        .from('products')
        .insert(INITIAL_PRODUCTS);
      if (seedError) throw seedError;
      
      syncWithSupabase();
    } catch (err) {
      console.error('Supabase reset catalog error:', err);
    }
  }
  return PRODUCTS;
}

// Local listeners
window.addEventListener('nihaya-products-updated', () => {
  // Let standard load handle values
});

window.addEventListener('storage', (event) => {
  if (event.key === PRODUCT_STORAGE_KEY) {
    try {
      PRODUCTS = JSON.parse(event.newValue) || PRODUCTS;
    } catch (e) {}
  }
});

// Trigger background sync on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(syncWithSupabase, 200);
  });
}

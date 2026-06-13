// Nihaya Product Catalog Data
const PRODUCTS = [
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
    secondaryImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
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
    primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
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
    primaryImage: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
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

// Helper functions for products
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

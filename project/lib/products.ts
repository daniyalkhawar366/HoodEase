import { Product } from '@/store/useStore';

export const products: Product[] = [
  {
    id: '1',
    name: 'Everyday Essential Cotton Shirt',
    price: 4250,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750228549/every_deingz.webp',
    category: 'men',
    subcategory: 'Casual Shirts',
    slug: 'everyday-essential-cotton-shirt',
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium cotton blend hoodie with modern fit and urban style.',
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
      'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg',
      'https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg',
    ]
  },
  {
    id: '2',
    name: 'Laid-Back Linen Blend',
    price: 2850,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750229397/casual2_xtf8w9.webp',
    category: 'men',
    subcategory: 'Casual Shirts',
    slug: 'laid-back-linen-blend',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sleek, soft cotton t-shirt for everyday wear.',
    images: [
      'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg',
    ]
  },
  {
    id: '3',
    name: 'Weekend Vibes Button-Down',
    price: 3950,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750229502/casual3_wvlf5c.jpg',
    category: 'men',
    subcategory: 'Casual Shirts',
    slug: 'weekend-vibes-button-down',
    colors: ['Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Modern slim fit jeans with a classic blue wash.',
    images: [
      'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
    ]
  },
  {
    id: '4',
    name: 'Classic Black Office Shirt',
    price: 3200,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750229477/dress2_edcuqc.webp',
    category: 'men',
    subcategory: 'Dress Shirts',
    slug: 'classic-black-office-shirt',
    colors: ['White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic white polo shirt in breathable cotton.',
    images: [
      'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg',
    ]
  },
  {
    id: '5',
    name: 'Slim Fit Blue Formal Shirt',
    price: 6800,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750229497/dress1_mhfso8.webp',
    category: 'men',
    subcategory: 'Dress Shirts',
    slug: 'slim-fit-blue-formal-shirt',
    colors: ['Olive', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Trendy olive bomber jacket with ribbed cuffs and hem.',
    images: [
      'https://images.pexels.com/photos/1707827/pexels-photo-1707827.jpeg',
    ]
  },
  {
    id: '6',
    name: 'Premium Dress Shirt',
    price: 5750,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750229477/dress3_d4fvio.webp',
    category: 'men',
    subcategory: 'Dress Shirts',
    slug: 'premium-dress-shirt',
    colors: ['Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Iconic blue denim jacket for a timeless look.',
    images: [
      'https://images.pexels.com/photos/532221/pexels-photo-532221.jpeg',
    ]
  },
  {
    id: '7',
    name: 'Iconic Piqué Polo',
    price: 3850,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750225433/polo_nnkdgc.webp',
    category: 'men',
    subcategory: 'Polo Shirts',
    slug: 'iconic-pique-polo',
    colors: ['Beige'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Slim-fit beige chinos for a smart-casual style.',
    images: [
      'https://images.pexels.com/photos/2983465/pexels-photo-2983465.jpeg',
    ]
  },
  {
    id: '8',
    name: 'Contrast Collar Polo',
    price: 2950,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750230316/contrast_n5y0cp.jpg',
    category: 'men',
    subcategory: 'Polo Shirts',
    slug: 'contrast-collar-polo',
    colors: ['Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft crewneck sweatshirt in a versatile grey shade.',
    images: [
      'https://images.pexels.com/photos/1707829/pexels-photo-1707829.jpeg',
    ]
  },
  {
    id: '9',
    name: 'Soft Touch Casual Polo',
    price: 7200,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750230299/casual_polo_w9zuod.webp',
    category: 'men',
    subcategory: 'Polo Shirts',
    slug: 'soft-touch-casual-polo',
    colors: ['Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Elegant navy suit blazer for formal occasions.',
    images: [
      'https://images.pexels.com/photos/532222/pexels-photo-532222.jpeg',
    ]
  },
  {
    id: '10',
    name: 'Tropical Print Short Sleeve',
    price: 4600,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750230299/topical_nhgw52.avif',
    category: 'men',
    subcategory: 'Printed Shirts',
    slug: 'tropical-print-short-sleeve',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic black leather biker jacket for a bold look.',
    images: [
      'https://images.pexels.com/photos/1707826/pexels-photo-1707826.jpeg',
    ]
  },
  {
    id: '11',
    name: 'Retro Graphic Button-Up',
    price: 3500,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750230299/graphic_mfaabl.jpg',
    category: 'men',
    subcategory: 'Printed Shirts',
    slug: 'retro-graphic-button-up',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Lightweight linen shirt perfect for summer.',
    images: [
      'https://images.pexels.com/photos/532223/pexels-photo-532223.jpeg',
    ]
  },
  {
    id: '12',
    name: 'Abstract Art All-Over Print',
    price: 3450,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750230300/abstract_art_mp2jkl.jpg',
    category: 'men',
    subcategory: 'Printed Shirts',
    slug: 'abstract-art-all-over-print',
    colors: ['Blue', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Soft blue plaid flannel shirt for a cozy, casual look.',
    images: [
      'https://images.pexels.com/photos/2983466/pexels-photo-2983466.jpeg',
    ]
  },
  {
    id: '13',
    name: 'Light Wash Western Shirt',
    price: 2750,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231162/wdenim_eu6oxz.webp',
    category: 'men',
    subcategory: 'Denim Shirts',
    slug: 'light-wash-western-shirt',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Bold graphic print on soft black cotton tee.',
    images: [
      'https://images.pexels.com/photos/892757/pexels-photo-892757.jpeg',
    ]
  },
  {
    id: '14',
    name: 'Faded Indigo Denim Shirt',
    price: 4100,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231160/faded_denim_uiyach.webp',
    category: 'men',
    subcategory: 'Denim Shirts',
    slug: 'faded-indigo-denim-shirt',
    colors: ['Charcoal'],
    sizes: ['M', 'L', 'XL'],
    description: 'Elegant wool overcoat for chilly days.',
    images: [
      'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
    ]
  },
  {
    id: '15',
    name: 'Rugged Snap Button Denim',
    price: 4350,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231159/rdenim_w3uw6b.webp',
    category: 'men',
    subcategory: 'Denim Shirts',
    slug: 'rugged-snap-button-denim',
    colors: ['Khaki'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Durable cargo pants with multiple pockets.',
    images: [
      'https://images.pexels.com/photos/2983467/pexels-photo-2983467.jpeg',
    ]
  },
  {
    id: '16',
    name: 'Airy Summer Linen Shirt',
    price: 3800,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231158/summer_linen_g3ruxh.avif',
    category: 'men',
    subcategory: 'Linen Shirts',
    slug: 'airy-summer-linen-shirt',
    colors: ['Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cozy knit in an earthy olive tone.',
    images: [
      'https://images.pexels.com/photos/1001910/pexels-photo-1001910.jpeg',
    ]
  },
  {
    id: '17',
    name: 'Relaxed Fit Linen Blend',
    price: 4100,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231159/relaxed_linen_tizp42.avif',
    category: 'men',
    subcategory: 'Linen Shirts',
    slug: 'relaxed-fit-linen-blend',
    colors: ['Denim Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Sturdy denim shirt built for work or casual wear.',
    images: [
      'https://images.pexels.com/photos/2983468/pexels-photo-2983468.jpeg',
    ]
  },
  {
    id: '18',
    name: 'Crisp White Linen Classic',
    price: 3200,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750231157/white_classic_ungvjt.webp',
    category: 'men',
    subcategory: 'Linen Shirts',
    slug: 'crisp-white-linen-classic',
    colors: ['Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Comfortable joggers perfect for athleisure looks.',
    images: [
      'https://images.pexels.com/photos/718786/pexels-photo-718786.jpeg',
    ]
  },
  {
    id: '19',
    name: 'Oversized Urban Streetwear',
    price: 2950,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232204/street_llwnsh.webp',
    category: 'men',
    subcategory: 'Oversized Shirts',
    slug: 'oversized-urban-streetwear',
    colors: ['Grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Soft sweatpants for lounging or workouts.',
    images: [
      'https://images.pexels.com/photos/1144419/pexels-photo-1144419.jpeg',
    ]
  },
  {
    id: '20',
    name: 'Drop Shoulder Relaxed Shirt',
    price: 4650,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232201/dropped_pyyg5s.jpg',
    category: 'men',
    subcategory: 'Oversized Shirts',
    slug: 'drop-shoulder-relaxed-shirt',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tailored dress pants for formal settings.',
    images: [
      'https://images.pexels.com/photos/2983469/pexels-photo-2983469.jpeg',
    ]
  },
  {
    id: '21',
    name: 'Vintage Fit Baggy Shirt',
    price: 3800,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232200/vintage_ab2hbj.jpg',
    category: 'men',
    subcategory: 'Oversized Shirts',
    slug: 'vintage-fit-baggy-shirt',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic white Oxford button-down shirt.',
    images: [
      'https://images.pexels.com/photos/2983470/pexels-photo-2983470.jpeg',
    ]
  },
  {
    id: '22',
    name: 'Buffalo Check Flannel',
    price: 3500,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232184/buffalo_akw2kl.avif',
    category: 'men',
    subcategory: 'Flannel Shirts',
    slug: 'buffalo-check-flannel',
    colors: ['Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Lightweight V-neck perfect for layering.',
    images: [
      'https://images.pexels.com/photos/2983471/pexels-photo-2983471.jpeg',
    ]
  },
  {
    id: '23',
    name: 'Soft Brushed Cotton Flannel',
    price: 6250,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232179/soft_kkfv64.jpg',
    category: 'men',
    subcategory: 'Flannel Shirts',
    slug: 'soft-brushed-cotton-flannel',
    colors: ['Sand'],
    sizes: ['8', '9', '10', '11', '12'],
    description: 'Smart suede loafers for polished looks.',
    images: [
      'https://images.pexels.com/photos/2983472/pexels-photo-2983472.jpeg',
    ]
  },
  {
    id: '24',
    name: 'Lumberjack Style Layer',
    price: 2500,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232177/lumberjack_f4mgwx.webp',
    category: 'men',
    subcategory: 'Flannel Shirts',
    slug: 'lumberjack-style-layer',
    colors: ['Black'],
    sizes: ['M', 'L', 'XL'],
    description: 'Durable canvas belt with metal buckle.',
    images: [
      'https://images.pexels.com/photos/2983473/pexels-photo-2983473.jpeg',
    ]
  },
  {
    id: '25',
    name: 'Vertical Stripe Casual Shirt',
    price: 2700,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232176/vstripe_lqa1nl.jpg',
    category: 'men',
    subcategory: 'Striped Shirts',
    slug: 'vertical-stripe-casual-shirt',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
  {
    id: '26',
    name: 'Nautical Blue Stripe Shirt',
    price: 2900,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232176/bstripe_irkzww.webp',
    category: 'men',
    subcategory: 'Striped Shirts',
    slug: 'nautical-blue-stripe-shirt',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
  {
    id: '27',
    name: 'Multi-Color Bold Stripe',
    price: 2800,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232174/multicolor_ughxaf.avif',
    category: 'men',
    subcategory: 'Striped Shirts',
    slug: 'multi-color-bold-stripe',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
  {
    id: '28',
    name: 'Essential Crew Neck Tee',
    price: 3400,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232172/tee1_wa6za6.webp',
    category: 'men',
    subcategory: 'T-Shirts',
    slug: 'essential-crew-neck-tee',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
  {
    id: '29',
    name: 'Graphic Printed Tee',
    price: 2900,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232171/graphictee_scp4bw.jpg',
    category: 'men',
    subcategory: 'T-Shirts',
    slug: 'graphic-printed-tee',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
  {
    id: '30',
    name: 'Relaxed Fit Cotton T-Shirt',
    price: 3400,
    image: 'https://res.cloudinary.com/dun1zalow/image/upload/v1750232171/relaxed_l7ug0g.jpg',
    category: 'men',
    subcategory: 'T-Shirts',
    slug: 'relaxed-fit-cotton-t-shirt',
    colors: ['Blue/White', 'Grey/Black', 'Navy/Red'],
    sizes: ['One Size'],
    description: 'Comfortable striped socks in a 3‑pack.',
    images: [
      'https://images.pexels.com/photos/2983474/pexels-photo-2983474.jpeg',
    ]
  },
];
export const getProductsByCategory = (category: 'men' | 'women' | 'kids') =>
  products.filter(product => product.category === category);

export const getProductBySlug = (slug: string) =>
  products.find(product => product.slug === slug);

export const getRelatedProducts = (currentProduct: Product, limit = 4) =>
  products
    .filter(p => p.category === currentProduct.category && p.subcategory === currentProduct.subcategory && p.id !== currentProduct.id)
    .slice(0, limit);

import { products, getRelatedProducts } from '@/lib/products';
import { productsWomen } from '@/lib/products-women';
import { productsKids } from '@/lib/products-kids';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

interface ProductPageProps {
  params: { slug: string };
}

// Helper function to get product by slug from all product arrays
const getAllProductBySlug = (slug: string) => {
  // Search in men's products
  const menProduct = products.find(product => product.slug === slug);
  if (menProduct) return menProduct;
  
  // Search in women's products
  const womenProduct = productsWomen.find(product => product.slug === slug);
  if (womenProduct) return womenProduct;
  
  // Search in kids' products
  const kidsProduct = productsKids.find(product => product.slug === slug);
  if (kidsProduct) return kidsProduct;
  
  return null;
};

// Helper function to get related products from all arrays
const getAllRelatedProducts = (currentProduct: any, limit = 4) => {
  let allProducts: any[] = [];
  
  // Add products from the same category
  if (currentProduct.category === 'men') {
    allProducts = products;
  } else if (currentProduct.category === 'women') {
    allProducts = productsWomen;
  } else if (currentProduct.category === 'kids') {
    allProducts = productsKids;
  }
  
  return allProducts
    .filter(p => p.category === currentProduct.category && p.subcategory === currentProduct.subcategory && p.id !== currentProduct.id)
    .slice(0, limit);
};

export default async function ProductPage({ params }: ProductPageProps) {
  let product = null;
  // Try to fetch from DB
  try {
    await dbConnect();
    const dbProduct = await Product.findOne({ slug: params.slug, isActive: true }).lean();
    if (dbProduct) {
      product = JSON.parse(JSON.stringify(dbProduct));
    }
  } catch (e) {
    // Ignore DB errors, fallback to static
  }
  // Fallback to static arrays if not found in DB
  if (!product) {
    product = getAllProductBySlug(params.slug);
  }
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  const relatedProducts = getAllRelatedProducts(product);
  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}

export async function generateStaticParams() {
  return [
    ...products,
    ...productsWomen,
    ...productsKids,
  ].map((product) => ({ slug: product.slug }));
}
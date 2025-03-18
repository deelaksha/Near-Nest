'use client';
import React, { useState } from 'react';
import Link from 'next/link';
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
}

const ProductHomepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Noise Cancelling Headphones",
      price: 199.99,
      rating: 4.7,
      reviewCount: 2543,
      image: "/api/placeholder/200/200",
      description: "Premium over-ear headphones with active noise cancellation"
    },
    {
      id: 2,
      name: "Ultra HD Smart TV 55-inch",
      price: 699.99,
      rating: 4.5,
      reviewCount: 1876,
      image: "/api/placeholder/200/200",
      description: "4K resolution with HDR and smart features"
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      rating: 4.8,
      reviewCount: 3251,
      image: "/api/placeholder/200/200",
      description: "Waterproof speaker with 12-hour battery life"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 249.99,
      rating: 4.4,
      reviewCount: 892,
      image: "/api/placeholder/200/200",
      description: "Adjustable height and lumbar support for comfort"
    },
    {
      id: 5,
      name: "Smart Home Security Camera",
      price: 129.99,
      rating: 4.6,
      reviewCount: 1245,
      image: "/api/placeholder/200/200",
      description: "HD video with night vision and motion detection"
    },
  
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < fullStars ? "text-yellow-400" : (i === fullStars && hasHalfStar ? "text-yellow-400" : "text-gray-400")}>
            {i < fullStars ? "★" : (i === fullStars && hasHalfStar ? "★" : "☆")}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-blue-900 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white">Near Nest</h1>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="relative">
              <input
                type="text"
                className="w-full py-2 px-4 pr-10 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-2.5 text-gray-400">
                🔍
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 ml-6">
            <Link href="#" className="text-gray-300 hover:text-white transition">Account</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Orders</Link>
            
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Categories */}
        <div className="bg-blue-800 rounded-lg p-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">All</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Electronics</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Home & Kitchen</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Books</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Fashion</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Sports</button>
            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-sm">Toys</button>
          </div>
        </div>
        
        
        
        {/* Product Grid */}
        <h2 className="text-xl font-bold mb-6">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-blue-950 rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
              <div className="h-48 bg-gray-800 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="object-cover h-full w-full" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="text-gray-400 text-sm ml-2">({product.reviewCount})</span>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No products found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-950 mt-12 py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-white">Shipping Information</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">FB</a>
                <a href="#" className="text-gray-400 hover:text-white">TW</a>
                <a href="#" className="text-gray-400 hover:text-white">IG</a>
                <a href="#" className="text-gray-400 hover:text-white">YT</a>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">Sign up for our newsletter</p>
                <div className="flex mt-2">
                  <input type="email" placeholder="Email address" className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none flex-1" />
                  <button className="bg-blue-600 hover:bg-blue-500 px-4 rounded-r-lg">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© 2025 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductHomepage;
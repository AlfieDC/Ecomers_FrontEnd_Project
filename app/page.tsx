"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import ProductGrid from "@/components/product-grid"
import ProductModal from "@/components/product-modal"
import CartPanel from "@/components/cart-panel"
import Sidebar from "@/components/sidebar"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"

const PRODUCTS = [
  {
    id: 1,
    name: "Elegant Pendant Lamp",
    category: "Lighting",
    price: 89.99,
    image: "/modern-pendant-lamp-lighting.jpg",
    description:
      "A sleek and modern pendant lamp perfect for any room. Features adjustable brightness and eco-friendly LED technology.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    category: "Decor",
    price: 45.99,
    image: "/ceramic-vase-home-decor.jpg",
    description: "Beautiful hand-crafted ceramic vases in warm earth tones. Set of 3 different sizes.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Wooden Side Table",
    category: "Furniture",
    price: 129.99,
    image: "/wooden-side-table-furniture.jpg",
    description: "Minimalist wooden side table with natural grain. Perfect for bedside or living room spaces.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Linen Throw Blanket",
    category: "Textiles",
    price: 34.99,
    image: "/linen-throw-blanket-comfortable.jpg",
    description: "Soft and breathable linen throw in neutral colors. Great for cozy evenings.",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Abstract Wall Art",
    category: "Art",
    price: 149.99,
    image: "/abstract-wall-art-painting.jpg",
    description: "Contemporary abstract artwork with vibrant colors. Canvas print ready to hang.",
    rating: 4.4,
  },
  {
    id: 6,
    name: "Indoor Plant Pot",
    category: "Plants",
    price: 24.99,
    image: "/ceramic-indoor-plant-pot.jpg",
    description: "Stylish ceramic pot with drainage holes. Perfect for your favorite houseplant.",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Desk Organizer",
    category: "Accessories",
    price: 32.99,
    image: "/wooden-desk-organizer.png",
    description: "Keep your workspace tidy with this elegant wooden desk organizer.",
    rating: 4.3,
  },
  {
    id: 8,
    name: "Scented Candle",
    category: "Accessories",
    price: 28.99,
    image: "/luxury-scented-candle.jpg",
    description: "Hand-poured soy candle with natural scents. Long-lasting fragrance.",
    rating: 4.8,
  },
]

const CATEGORIES = ["All", "Lighting", "Decor", "Furniture", "Textiles", "Art", "Plants", "Accessories"]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<(typeof PRODUCTS)[0] | null>(null)
  const [cartItems, setCartItems] = useState<Array<(typeof PRODUCTS)[0] & { quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setSelectedProduct(null)
  }

  const handleRemoveFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />

      <div className="flex flex-1">
        <Sidebar categories={CATEGORIES} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        <div className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search products..." />
            </div>

            {/* Results Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                {selectedCategory === "All" ? "All Products" : selectedCategory}
              </h2>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
              </p>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} onProductClick={setSelectedProduct} />

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Panel */}
        <CartPanel
          isOpen={showCart}
          items={cartItems}
          onRemoveItem={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
        />
      </div>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </main>
  )
}

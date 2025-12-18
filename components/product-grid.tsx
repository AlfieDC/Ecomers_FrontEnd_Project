"use client"

import { Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  category: string
  description: string
}

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export default function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onProductClick(product)}
          className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="relative h-64 w-full overflow-hidden bg-muted">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 mt-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">View</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

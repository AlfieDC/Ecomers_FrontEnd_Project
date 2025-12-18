"use client"

import { ShoppingCart } from "lucide-react"

interface HeaderProps {
  cartCount: number
  onCartClick: () => void
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>
          <h1 className="text-2xl font-bold text-foreground">Shop</h1>
        </div>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-primary" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

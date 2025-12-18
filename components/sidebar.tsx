"use client"

interface SidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function Sidebar({ categories, selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="hidden md:block w-56 bg-secondary border-r border-border p-6 h-[calc(100vh-69px)] sticky top-[69px]">
      <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>

      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  )
}

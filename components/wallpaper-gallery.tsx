"use client"

import { useState, useEffect } from "react"
import { getAllWallpapers } from "@/lib/wallpapers"
import WallpaperCard from "@/components/wallpaper-card"
import WallpaperModal from "@/components/wallpaper-modal"
import { Button } from "@/components/ui/button"
import type { Wallpaper } from "@/lib/wallpapers"

export default function WallpaperGallery() {
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null)
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    const loadWallpapers = () => {
      setWallpapers(getAllWallpapers())
    }

    loadWallpapers()

    // Listen for wallpaper updates from admin dashboard
    window.addEventListener("wallpapersUpdated", loadWallpapers)

    return () => {
      window.removeEventListener("wallpapersUpdated", loadWallpapers)
    }
  }, [])

  const categories = ["All", ...Array.from(new Set(wallpapers.map((w) => w.category)))]

  const filteredWallpapers =
    selectedCategory === "All" ? wallpapers : wallpapers.filter((w) => w.category === selectedCategory)

  const handleViewClick = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper)
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredWallpapers.map((wallpaper) => (
          <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} onViewClick={() => handleViewClick(wallpaper)} />
        ))}
      </div>

      <WallpaperModal
        wallpaper={selectedWallpaper}
        open={!!selectedWallpaper}
        onOpenChange={(open) => !open && setSelectedWallpaper(null)}
      />
    </>
  )
}

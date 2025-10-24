export interface Wallpaper {
  id: string
  title: string
  category: string
  imageUrl: string
  isExclusive: boolean
  resolution: string
  downloads: number
}

// Sample wallpaper data
export const WALLPAPERS: Wallpaper[] = [
  // Free wallpapers
  {
    id: "1",
    title: "Mountain Sunset",
    category: "Nature",
    imageUrl: "/mountain-sunset-landscape.jpg",
    isExclusive: false,
    resolution: "4K",
    downloads: 1234,
  },
  {
    id: "2",
    title: "Ocean Waves",
    category: "Nature",
    imageUrl: "/blue-ocean-waves.png",
    isExclusive: false,
    resolution: "4K",
    downloads: 987,
  },
  {
    id: "3",
    title: "City Lights",
    category: "Urban",
    imageUrl: "/city-lights-night-skyline.jpg",
    isExclusive: false,
    resolution: "4K",
    downloads: 2341,
  },
  {
    id: "9",
    title: "Sports Car",
    category: "Vehicles",
    imageUrl: "/sports-car-racing.jpg",
    isExclusive: false,
    resolution: "4K",
    downloads: 1567,
  },
  {
    id: "10",
    title: "Wildlife Lion",
    category: "Animals",
    imageUrl: "/lion-wildlife-portrait.jpg",
    isExclusive: false,
    resolution: "4K",
    downloads: 2890,
  },
  {
    id: "11",
    title: "Modern Architecture",
    category: "Architecture",
    imageUrl: "/modern-building-architecture.jpg",
    isExclusive: false,
    resolution: "4K",
    downloads: 1456,
  },
  // Exclusive wallpapers
  {
    id: "4",
    title: "Aurora Borealis",
    category: "Nature",
    imageUrl: "/aurora-borealis-northern-lights.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 5432,
  },
  {
    id: "5",
    title: "Abstract Geometry",
    category: "Abstract",
    imageUrl: "/abstract-geometric-pattern-colorful.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 3210,
  },
  {
    id: "6",
    title: "Neon Cyberpunk",
    category: "Urban",
    imageUrl: "/neon-cyberpunk-city-futuristic.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 4567,
  },
  {
    id: "7",
    title: "Space Nebula",
    category: "Space",
    imageUrl: "/space-nebula-stars-galaxy.png",
    isExclusive: true,
    resolution: "4K",
    downloads: 6789,
  },
  {
    id: "8",
    title: "Tropical Paradise",
    category: "Nature",
    imageUrl: "/tropical-beach-palm-trees.png",
    isExclusive: true,
    resolution: "4K",
    downloads: 3456,
  },
  {
    id: "12",
    title: "Supercar Collection",
    category: "Vehicles",
    imageUrl: "/luxury-supercar-collection.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 4123,
  },
  {
    id: "13",
    title: "Eagle in Flight",
    category: "Animals",
    imageUrl: "/eagle-flying-majestic.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 3789,
  },
  {
    id: "14",
    title: "Futuristic Skyscraper",
    category: "Architecture",
    imageUrl: "/futuristic-skyscraper-design.jpg",
    isExclusive: true,
    resolution: "4K",
    downloads: 2987,
  },
]

export function getAllWallpapers(): Wallpaper[] {
  // Start with static wallpapers
  const allWallpapers = [...WALLPAPERS]

  // Add custom wallpapers from localStorage (client-side only)
  if (typeof window !== "undefined") {
    const customWallpapers = localStorage.getItem("customWallpapers")
    if (customWallpapers) {
      try {
        const parsed: Wallpaper[] = JSON.parse(customWallpapers)
        allWallpapers.push(...parsed)
      } catch (error) {
        console.error("Failed to parse custom wallpapers:", error)
      }
    }
  }

  return allWallpapers
}

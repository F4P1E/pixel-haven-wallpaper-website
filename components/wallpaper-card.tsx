"use client"

import { useState } from "react"
import Image from "next/image"
import { Download, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Wallpaper } from "@/lib/wallpapers"

interface WallpaperCardProps {
  wallpaper: Wallpaper
  onViewClick: () => void
}

export default function WallpaperCard({ wallpaper, onViewClick }: WallpaperCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg bg-card border border-border/50 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={wallpaper.imageUrl || "/placeholder.svg"}
          alt={wallpaper.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Button variant="secondary" className="w-full" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View Full Size
            </Button>
          </div>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {wallpaper.resolution}
          </Badge>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{wallpaper.title}</h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{wallpaper.category}</span>
          <span className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            {wallpaper.downloads.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Wallpaper } from "@/lib/wallpapers"

interface WallpaperModalProps {
  wallpaper: Wallpaper | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WallpaperModal({ wallpaper, open, onOpenChange }: WallpaperModalProps) {
  if (!wallpaper) return null

  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    console.log("[v0] Downloading wallpaper:", wallpaper.title)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image */}
          <div className="relative aspect-video bg-muted">
            <Image
              src={wallpaper.imageUrl || "/placeholder.svg"}
              alt={wallpaper.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Info footer */}
          <div className="p-6 bg-background border-t border-border/50">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{wallpaper.title}</h2>
                  {wallpaper.isExclusive && <Badge className="bg-primary/90">Exclusive</Badge>}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{wallpaper.category}</span>
                  <span>•</span>
                  <span>{wallpaper.resolution}</span>
                  <span>•</span>
                  <span>{wallpaper.downloads.toLocaleString()} downloads</span>
                </div>
              </div>

              <Button size="lg" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

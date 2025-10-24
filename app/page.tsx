import WallpaperGallery from "@/components/wallpaper-gallery"
import Footer from "@/components/footer"
import { Sparkles, Shield, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Free Premium Wallpaper Collection
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome to Pixel Haven
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty leading-relaxed">
              Discover stunning 4K wallpapers across multiple categories. Browse and download our entire collection
              completely free.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
              <Button size="lg" asChild className="group">
                <Link href="/#gallery">
                  Explore Gallery
                  <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>500+ Wallpapers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>4K Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <span>Free Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Explore Our Collection</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Browse wallpapers across Nature, Urban, Space, Vehicles, Animals, Architecture, and more
          </p>
        </div>

        <WallpaperGallery />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

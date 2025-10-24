"use client"

import Link from "next/link"
import { Github, Twitter, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg transition-transform group-hover:scale-105">
                  <Image src="/logo.png" alt="Pixel Haven Logo" fill className="object-cover" />
                </div>
                <span className="text-xl font-bold">
                  Pixel <span className="text-primary">Haven</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your destination for premium 4K wallpapers. Discover stunning visuals for every screen.
              </p>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/#gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h3 className="font-semibold mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about new wallpapers and exclusive releases.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="Enter your email" className="bg-background" />
                <Button type="submit" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Pixel Haven. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

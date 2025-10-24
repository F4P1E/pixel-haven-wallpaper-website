"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, ImageIcon, Trash2, Lock } from "lucide-react"
import type { Wallpaper } from "@/lib/wallpapers"

export default function AdminPage() {
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")
  const [customWallpapers, setCustomWallpapers] = useState<Wallpaper[]>([])

  const [formData, setFormData] = useState({
    title: "",
    category: "Nature",
    resolution: "4K",
  })

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
    setIsCheckingAuth(false)
  }, [])

  // Load custom wallpapers
  useEffect(() => {
    if (isAuthenticated) {
      loadCustomWallpapers()
    }
  }, [isAuthenticated])

  const loadCustomWallpapers = () => {
    const stored = localStorage.getItem("customWallpapers")
    if (stored) {
      try {
        const parsed: Wallpaper[] = JSON.parse(stored)
        setCustomWallpapers(parsed)
      } catch (error) {
        console.error("Failed to load custom wallpapers:", error)
      }
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    // You can set ADMIN_PASSWORD in your environment variables
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem("adminAuthenticated", "true")
      toast({
        title: "Welcome back!",
        description: "You are now logged in to the admin dashboard.",
      })
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteWallpaper = (id: string) => {
    const updated = customWallpapers.filter((w) => w.id !== id)
    localStorage.setItem("customWallpapers", JSON.stringify(updated))
    setCustomWallpapers(updated)
    window.dispatchEvent(new Event("wallpapersUpdated"))

    toast({
      title: "Wallpaper deleted",
      description: "The wallpaper has been removed from your collection.",
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB. Please choose a smaller image.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    handleImageChange(e)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-wallpaper", {
        method: "POST",
        body: formData,
      })

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text()
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || data.error || "Upload failed")
      }

      setUploadedImageUrl(data.url)

      toast({
        title: "Image uploaded",
        description: "Your wallpaper image has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
        variant: "destructive",
      })
      setImagePreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedImageUrl) {
      toast({
        title: "No image",
        description: "Please upload an image first.",
        variant: "destructive",
      })
      return
    }

    if (!formData.title) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the wallpaper.",
        variant: "destructive",
      })
      return
    }

    const newWallpaper: Wallpaper = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      imageUrl: uploadedImageUrl,
      isExclusive: false,
      resolution: formData.resolution,
      downloads: 0,
    }

    const existingWallpapers = localStorage.getItem("customWallpapers")
    const wallpapers: Wallpaper[] = existingWallpapers ? JSON.parse(existingWallpapers) : []

    wallpapers.push(newWallpaper)
    localStorage.setItem("customWallpapers", JSON.stringify(wallpapers))

    window.dispatchEvent(new Event("wallpapersUpdated"))

    toast({
      title: "Wallpaper added",
      description: "Your wallpaper has been added successfully.",
    })

    // Reset form
    setFormData({
      title: "",
      category: "Nature",
      resolution: "4K",
    })
    setImagePreview(null)
    setUploadedImageUrl("")

    // Reload custom wallpapers
    loadCustomWallpapers()
  }

  // Show loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter your password to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                <a href="/">Back to Gallery</a>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show admin dashboard if authenticated
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your wallpaper collection</p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false)
              sessionStorage.removeItem("adminAuthenticated")
              toast({
                title: "Logged out",
                description: "You have been logged out successfully.",
              })
            }}
          >
            Logout
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Wallpaper</CardTitle>
              <CardDescription>Upload an image and fill in the details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Wallpaper Image</Label>
                  <div className="flex flex-col gap-4">
                    {imagePreview ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">No image uploaded</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        disabled={isUploading}
                        className="flex-1"
                      />
                      {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Mountain Sunset"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nature">Nature</SelectItem>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Abstract">Abstract</SelectItem>
                      <SelectItem value="Space">Space</SelectItem>
                      <SelectItem value="Vehicles">Vehicles</SelectItem>
                      <SelectItem value="Animals">Animals</SelectItem>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Resolution */}
                <div className="space-y-2">
                  <Label htmlFor="resolution">Resolution</Label>
                  <Select
                    value={formData.resolution}
                    onValueChange={(value) => setFormData({ ...formData, resolution: value })}
                  >
                    <SelectTrigger id="resolution">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4K">4K (3840x2160)</SelectItem>
                      <SelectItem value="2K">2K (2560x1440)</SelectItem>
                      <SelectItem value="Full HD">Full HD (1920x1080)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isUploading || !uploadedImageUrl}>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Wallpaper
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Manage Wallpapers */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Wallpapers</CardTitle>
              <CardDescription>
                {customWallpapers.length} custom wallpaper{customWallpapers.length !== 1 ? "s" : ""} uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customWallpapers.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No custom wallpapers yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Upload your first wallpaper to get started</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {customWallpapers.map((wallpaper) => (
                    <div
                      key={wallpaper.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={wallpaper.imageUrl || "/placeholder.svg"}
                          alt={wallpaper.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{wallpaper.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {wallpaper.category} • {wallpaper.resolution}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWallpaper(wallpaper.id)}
                        className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <a href="/">Back to Gallery</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

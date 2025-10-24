import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  console.log("[v0] Upload API called")

  try {
    const formData = await request.formData()
    console.log("[v0] FormData received")

    const file = formData.get("file") as File

    if (!file) {
      console.log("[v0] No file in formData")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("[v0] File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    })

    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    if (file.size > MAX_FILE_SIZE) {
      console.log("[v0] File too large:", file.size)
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 400 })
    }

    // Upload to Vercel Blob with a unique filename
    const timestamp = Date.now()
    const filename = `wallpapers/${timestamp}-${file.name}`

    console.log("[v0] Uploading to Blob:", filename)

    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("[v0] Upload successful:", blob.url)

    return NextResponse.json({
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

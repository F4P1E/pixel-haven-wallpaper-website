import { NextResponse } from "next/server"

export async function GET() {
  // HTML page that sets localStorage and redirects
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Success</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
          }
          .container {
            text-align: center;
            padding: 2rem;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          h1 {
            font-size: 1.5rem;
            margin: 0 0 0.5rem;
          }
          p {
            opacity: 0.9;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <h1>Payment Successful!</h1>
          <p>Unlocking your exclusive content...</p>
        </div>
        <script>
          // Set unlock flag in localStorage
          localStorage.setItem('exclusiveUnlocked', 'true');
          
          // Dispatch event to notify the app
          window.dispatchEvent(new Event('exclusiveUnlocked'));
          
          // Redirect back to homepage
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        </script>
      </body>
    </html>
  `

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  })
}

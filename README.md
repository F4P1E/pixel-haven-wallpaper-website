# Pixel Haven – Wallpaper Website

A modern, performant wallpaper website built with Next.js and TypeScript, designed to showcase and download high-quality wallpapers.

## 🧩 Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running Locally](#running-locally)
  * [Building for Production](#building-for-production)
* [Folder Structure](#folder-structure)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Support](#support)

## About

Pixel Haven is a sleek, user-friendly wallpaper website that allows users to browse and download high-resolution wallpapers. It is designed with performance and maintainability in mind, leveraging the latest web technologies to deliver a great experience both for developers and end-users.

Live demo: [https://pixelhavenwallpaperhub.vercel.app](https://pixelhavenwallpaperhub.vercel.app)

## Features

* Browse wallpapers by category, tag or search
* Download wallpapers in high resolution
* Responsive design for desktop, tablet and mobile
* Fast-loading pages thanks to Next.js optimizations
* Type-safe codebase with TypeScript
* Modular architecture for easy maintenance and extension

## Tech Stack

* **Framework**: Next.js (React-based)
* **Language**: TypeScript
* **Styling**: CSS / PostCSS
* **Bundler / Build**: Vercel / Next.js built-in
* **Project layout**: Components, Hooks, Lib directories for clean separation

## Getting Started

### Prerequisites

* Node.js (version 16 or above recommended)
* npm or [pnpm](https://pnpm.io) as your package manager

### Installation

```bash
# Clone the repo
git clone https://github.com/F4P1E/pixel-haven-wallpaper-website.git
cd pixel-haven-wallpaper-website

# Install dependencies (using pnpm)
pnpm install
````

### Running Locally

```bash
# Start the development server
pnpm dev
```

Visit `http://localhost:3000` in your browser to preview.

### Building for Production

```bash
pnpm build
pnpm start
```

This will generate an optimized production build and serve it.

## Folder Structure

Here’s a simplified view of the project layout:

```
/app           # Next.js app directory (pages/routes/components)
components/    # Reusable UI components
hooks/         # Custom React hooks
lib/           # Utility functions and services
public/        # Static assets (images, icons, etc.)
styles/        # Global and modular CSS / PostCSS configs
next.config.mjs
tsconfig.json
package.json
```

## Deployment

This project is ready to deploy on platforms like Vercel or any other Node-capable hosting provider. Simply connect your repository and configure build:

* Build command: `pnpm build`
* Output directory: `.next` (handled by Next.js)

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request describing your changes

Please ensure that your code follows the existing style conventions, and add or update tests/documentation as needed.

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## Contact

Created by [@F4P1E](https://github.com/F4P1E)
Feel free to reach out for questions, suggestions or feedback.

---

## ☕ Support

If you like this project and want to support its development, you can buy me a coffee!

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://buymeacoffee.com/dongduong8m)

---

Thank you for checking out Pixel Haven — happy coding and happy wallpaper browsing! 🖼️

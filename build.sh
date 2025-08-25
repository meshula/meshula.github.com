#!/bin/bash
set -e

echo "🏗️  Starting nickporcino.com site build..."

echo "📦 Installing dependencies..."
cd site/astro-site
npm ci

echo "📦 Building Astro site..."
npm run build

echo "📄 Copying standalone HTML files..."
cp ../index.html dist/
cp ../404.html dist/
cp -r ../../posts dist/posts
cp -r ../../meshula-net-archive dist/meshula-net-archive

echo "✅ Build complete - combined output in site/astro-site/dist/"
echo "📊 Contents:"
ls -la dist/ | head -10
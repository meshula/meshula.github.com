#!/bin/bash
set -e

echo "🏗️  Starting nickporcino.com site build..."

echo "📦 Installing dependencies..."
cd site/astro-site
npm ci

echo "📦 Building Astro site..."
npm run build

echo "📄 Copying standalone HTML files..."
# Landing page (/) is now the Astro index.astro page — no standalone index.html to copy.
cp ../404.html dist/
cp -r ../../posts dist/posts
cp -r ../../meshula-net-archive dist/meshula-net-archive

echo "📦 Building PCP Explorer..."
cd site/pcp-explorer
rm -rf node_modules
mpn cache clean --force

# Sync paper source so the deployed app always has the latest version
cp ../papers/encapsulation.md static/encapsulation.md

npm install
npm run build

echo "📄 Copying PCP Explorer output to dist/pcp-explorer/..."
cp -r build/ ../astro-site/dist/pcp-explorer

echo "✅ Build complete - combined output in site/astro-site/dist/"
echo "📊 Contents:"
ls -la ../astro-site/dist/ | head -15

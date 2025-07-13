#!/bin/bash

echo "🚀 Deploying Amyra's Astronaut Roadmap to GitHub Pages"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update: Amyra's Astronaut Roadmap - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote repository found."
    echo "Please create a GitHub repository and add it as remote:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/amyra-astronaut-roadmap.git"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Push to GitHub
echo "🌐 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Go to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch"
echo "5. Click Save"
echo ""
echo "Your site will be available at:"
echo "https://YOUR_USERNAME.github.io/amyra-astronaut-roadmap"
echo ""
echo "🌟 Share your astronaut roadmap with the world!" 
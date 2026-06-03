# Claude Model Selector 🚀

An intelligent AI model recommendation tool that analyzes your task requirements and suggests the optimal Claude model with the right settings.

## Features

✅ **Smart Model Selection** - Recommends Haiku, Sonnet, or Opus based on task complexity
✅ **Thinking Mode Optimization** - Suggests whether to enable thinking and which budget level
✅ **Live Model Updates** - Automatically fetches latest available Claude models
✅ **Fully Responsive** - Works perfectly on mobile phones and desktop browsers
✅ **Zero Cost** - Hosted for free on Vercel

## How It Works

1. Paste your task or requirement
2. Click "Analyze & Recommend"
3. Get instant model recommendations with reasoning

## Deployment (One-Click)

### Option 1: Deploy to Vercel (Recommended - Fastest)

1. **Push to GitHub** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Claude Model Selector"
git remote add origin https://github.com/YOUR_USERNAME/claude-model-selector.git
git branch -M main
git push -u origin main
```

2. **Go to** [vercel.com](https://vercel.com) and sign up (free)

3. **Click "Import Project"** and select your GitHub repository

4. **Deploy** - Vercel will automatically detect it's a Node.js app and deploy

5. **Your live URL** will be shown - something like `https://claude-model-selector-xxxxx.vercel.app`

### Option 2: Deploy to Railway

1. Push to GitHub (same steps as above)
2. Go to [railway.app](https://railway.app)
3. Sign up (free)
4. Click "New Project" → "Deploy from GitHub repo"
5. Select your repository
6. Railway auto-detects and deploys

### Option 3: Deploy to Render

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. Sign up (free)
4. Click "New" → "Web Service"
5. Connect your GitHub repo
6. Select the repository and deploy

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Visit http://localhost:3000
```

## How Model Selection Works

### Simple Tasks (< 100 chars)
- **Model**: Haiku
- **Thinking**: OFF
- **Use for**: Format conversions, simple questions, brief lists

### Medium Tasks (100-500 chars)
- **Model**: Sonnet
- **Thinking**: ON (low budget) or OFF
- **Use for**: Code generation, refactoring, content creation

### Complex Tasks (> 500 chars, analysis/debugging)
- **Model**: Opus
- **Thinking**: ON (medium budget)
- **Use for**: Architecture design, complex debugging, research, deep analysis

## Live Examples

- **"Convert JSON to CSV"** → Haiku, Thinking OFF
- **"Write a React component with API pagination"** → Sonnet, Thinking OFF
- **"Debug my auth flow and explain the security implications"** → Opus, Thinking ON (medium)

## Mobile & Responsive

- ✅ Optimized for iPhone/Android
- ✅ Touch-friendly buttons and inputs
- ✅ Auto-adapts to dark mode (system preference)
- ✅ Works offline (analysis only)

## Architecture

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks = fast)
- **Backend**: Express.js (minimal dependencies)
- **Hosting**: Vercel (serverless, auto-scaling)
- **Models Data**: Live from `/api/models` endpoint

## Updates & Maintenance

The app automatically loads the latest available Claude models from the `/api/models` endpoint. To update available models, edit the `MODELS` object in `app.js`.

## License

MIT

---

**Built with ❤️ for Claude users**

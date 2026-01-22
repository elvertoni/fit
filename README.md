<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/89eb07ff-f087-4742-9cec-19bc363447e2/deploy-status)](https://shimmering-llama-9010aa.netlify.app/)

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ewG-F2_DUtOvUb4ncMBrfA2hy3U9UF4p

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## Netlify Deploy

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: `VITE_GEMINI_API_KEY`
- Netlify dashboard: https://app.netlify.com/projects/shimmering-llama-9010aa/overview

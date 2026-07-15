# Song's Deli Lei Cha · 宋好味擂茶

A redesigned static website for **Song's Deli** (home-based Hakka Lei Cha kitchen), based on content from [leicha.co](https://leicha.co).

## Features

- Bilingual **EN / 中文** with one-click toggle (preference saved)
- WhatsApp pre-order links (products + floating button)
- Menu, ordering steps, story, delivery window, testimonials
- Mobile-first, no build step — ready for **GitHub Pages**

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a public GitHub repository (e.g. `songsdeli`).
2. Push this folder as the repo root (or put files in `/docs`).
3. **Settings → Pages → Source**: Deploy from branch `main` / root (or `/docs`).
4. Site URL will be: `https://YOUR_USERNAME.github.io/songsdeli/`
5. Optional: add a custom domain (e.g. `leicha.co`) in Pages settings + DNS.

## Contact / order number

WhatsApp: [+60 12-375 3302](https://wa.me/60123753302)

## Files

| File        | Role                          |
|-------------|-------------------------------|
| `index.html`| Page structure & content      |
| `styles.css`| Brand design system           |
| `script.js` | Language toggle & UI helpers  |

## Brand notes

Warm cream + Hakka herb green, display serif for English headlines, Noto Sans SC for Chinese. Decorative bowl illustration is pure CSS (no stock photos required).

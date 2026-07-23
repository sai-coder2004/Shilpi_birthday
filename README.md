# Happy Birthday, Shilpi 🎂

A four-chapter birthday surprise site, built with React + Vite, React
Router, Framer Motion, and canvas-confetti.

**Chapters:** Arrival (name reveal) → The Letter (open an envelope) →
The Wishes (flip six wish cards) → The Wish (blow out the candles, confetti).

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL.

## Deploy to Vercel

**Option A — no account setup needed:**
1. Go to https://vercel.com/new
2. Drag-and-drop this whole folder onto the page (or use "Upload").
3. Vercel auto-detects Vite — just click Deploy.

**Option B — via GitHub (recommended if you'll edit it further):**
1. Push this folder to a new GitHub repo.
2. In Vercel, "Add New Project" → import that repo.
3. Framework preset: Vite. Build command `npm run build`, output dir `dist`
   (Vercel fills these in automatically).
4. Deploy.

**Option C — Vercel CLI:**
```bash
npm i -g vercel
vercel
```

`vercel.json` is already included so client-side routing (the four pages)
keeps working after a refresh or a shared deep link.

## Personalizing it

- The letter: edit the PARAGRAPHS array near the top of
  src/pages/Letter.jsx — this is the one part written generically
  since I don't know your history together. Make it specific: an inside
  joke, a shared memory, how you met.
- The wishes: edit the WISHES array in src/pages/Wishes.jsx.
- The closing message: edit the text inside cake__finale in
  src/pages/Cake.jsx.
- Colors: all in src/index.css under :root — change --pink,
  --gold, --lavender etc. to retheme everything at once.
- Photos: if you want to add real photos, drop image files into
  public/ and reference them as /your-image.jpg — happy to help wire
  up a photo gallery chapter if you want one.

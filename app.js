
// Linktree-style interactions: theme toggle, contact sheet, copy number, and vCard creation.

document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme toggle (dark/light with persistence) =====
  const root = document.documentElement; // <html>
  const themeBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  updateThemeIcon();
  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
  });
  function updateThemeIcon(){
    const isLight = root.getAttribute('data-theme') === 'light';
    themeBtn.textContent = isLight ? '🌞' : '🌙';
    themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  // ===== Contact sheet (native <dialog>) =====
  const sheet = document.getElementById('contactSheet');
  const openBtn = document.getElementById('contactBtn');
  openBtn?.addEventListener('click', () => sheet.showModal());

  // Close on Esc or clicking backdrop is handled natively by <dialog> in most browsers

  // ===== Copy phone number to clipboard =====
  const phone = '+1-840-210-8142'; // <- your phone number (format for humans)
  const copyBtn = document.getElementById('copyBtn');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(phone);
      copyBtn.textContent = '✅ Copied!';
      setTimeout(() => (copyBtn.textContent = '📋 Copy phone number'), 1400);
    } catch (e) {
      alert('Copy failed. Long‑press or right‑click to copy the number.');
    }
  });

  // ===== Build a vCard on the fly (no server/files needed) =====
  // This creates a data: URL and injects it into the download link.
  const vcardLink = document.getElementById('vcardLink');
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Chaudhery;Imran;;;',
    'FN:Imran Chaudhery',
    'TITLE:Student',
    'ORG:UCR',
    'TEL;TYPE=CELL:+1-840-210-8142',
    'URL:https://youtube.com/@notaImran',
    'URL:https://instagram.com/imranc68',
    'END:VCARD' 
  ].join('');
  const dataUrl = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
  vcardLink?.setAttribute('href', dataUrl);

  // ===== Footer year =====
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});


//## How to use
//1) Put these three files into `Desktop/ImranWeb/` (replace any older versions).
//2) Open `index.html` in your browser.
//3) Update the profile links:
  // - YouTube: `https://youtube.com/@notaImran`
   //- Instagram: `https://instagram.com/imranc68`
   //- GitHub: replace `https://github.com/` with your profile URL.
   //- LinkedIn: replace `https://linkedin.com/in/` with your profile URL.
//4) (Optional) Replace the avatar `src` with your own image.
//5) If you ever change your phone, update it in two places in `app.js`:
  // - `const phone = '...'` (copy feature)
   //- the vCard `TEL;TYPE=CELL:...`

//### Notes
//- **Button vs. Link:** External sites use `<a>` with `target="_blank"`. The contact button is a `<button>` that opens a `<dialog>` (sheet).
//- **Accessibility:** Buttons/links have `aria-label`s; theme toggle is keyboard‑focusable with visible focus ring.
//- **Mobile:** Everything is single‑column and thumb‑friendly; dialog behaves like a sheet.

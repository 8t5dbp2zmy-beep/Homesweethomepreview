# Home Sweet Home 3.1.7 — Live NLT Preview

## Two updates are required
1. In your existing Cloudflare Worker `home-sweet-home-bible`, select **Edit code**, replace the current code with the contents of `cloudflare-worker.js`, and **Deploy**. Do not edit or expose your `API_BIBLE_KEY` secret. Visit your public `.workers.dev` URL and check that it returns `status: connected` with a daily verse.
2. Back up your Home Sweet Home data, then upload the *website files* from this folder to your **preview** GitHub Pages repository. Do **not** upload `cloudflare-worker.js` to GitHub Pages; it is server-side code for Cloudflare.

The dashboard fetches a single daily verse from your Worker, renders the verse as plain text, and displays the copyright statement. No key is embedded in the website. It needs internet access.

### Known limitations
- This 365-reference list is Psalms chapters 1–73, verses 1–5 (not yet a curated topical list). It is unchanged from 3.1.6 to avoid destabilizing the current app.
- The same verse remains all day based on America/Chicago dates.
- Worker URL is public and permits requests from any origin; although it only exposes one daily verse, consider rate limiting/Access if necessary.
- API.Bible license and caching/display conditions should be reviewed for your account.
- Existing imported NLT text is retained as a fallback, but live verse text is not persisted offline.
- If GitHub Pages serves stale code, verify the visible version says 3.1.7.

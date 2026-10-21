# Screenshot tools (headless Edge, no extra installs)

The in-app browser pane is often too small to review layouts, so visual checks
use a headless Edge driven over the DevTools protocol. Use these scripts
instead of re-inventing them each session.

## 1. Start headless Edge (once per session, background)

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --remote-debugging-port=9333 --user-data-dir="C:\\Users\\ay817\\AppData\\Local\\Temp\\nirman-edge" about:blank
```

Check it is up: `curl -s http://127.0.0.1:9333/json/version`

## 2. Screenshot sections by element id

```bash
node tools/shots/shotsec.mjs <width> <outDir> <id>[:<scrollOffsetPx>[:<viewportHeight>]] ...
# example: hero + services at desktop, then phone
node tools/shots/shotsec.mjs 1440 C:/tmp/shots top:0:900 services:0:900
node tools/shots/shotsec.mjs 390  C:/tmp/shots top:0:844
```

Files are written as `<id>-<offset>-<width>.png`. Write them to the
session scratchpad, never into the repo.

## 3. Evaluate JS in the page at a given width

```bash
echo 'JSON.stringify({w: innerWidth, h: document.body.scrollHeight})' > q.js
node tools/shots/eval.mjs q.js 1440
```

## Tips that save tokens

- Shrink before reading: `python -c "from PIL import Image; Image.open('a.png').resize((960,540)).save('a.png')"`.
- Combine several shots into one image with PIL before reading it.
- Photos load lazily: if a screen looks grey, capture again; the second pass is cached.
- The dev overlay ("N Issues" badge) often shows stale errors from old hot reloads; trust `npx tsc --noEmit` and `npm run build`.

## 4. Stop Edge when done

```powershell
Get-CimInstance Win32_Process -Filter "Name='msedge.exe'" | Where-Object { $_.CommandLine -match 'nirman-edge' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
```

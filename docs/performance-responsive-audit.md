# Performance and responsive inventory audit — 2026-09-08

Base: `145dbf3052cd72f889bd37e313566100eecf33ba` on main.

## Findings and changes

The existing Vite/React/TypeScript app and Wouter routes are retained. `pages/Pilot3D.tsx` owns the carousel, `InventoryObject3D.tsx` owns each Canvas, and `StudentModel.tsx` clones/normalizes GLTF scenes. Previously all three slots mounted complete models immediately; a timer also prefetched the next model 2.5 seconds after navigation, even if the active model was still loading. The two neighbor Canvases kept rendering even when the central object was paused.

The mobile breakpoint was <=720px, with a separate <=420px / <=740px short-screen override. Mobile central width was 100%, neighbors were 108px wide and positioned at -14px. Pixel inherited these generic rules and a scene height driven by viewport height. This squeezed/overlaid neighbors instead of reserving three columns.

Changes:

- Render compact WebP previews immediately, split the 3D renderer into a deferred import, and isolate model failures so navigation and content survive a failed WebGL/model load.
- Mobile neighbors use static, recognizable previews derived from existing project reference images, visually checked in all four states. Only the center creates a Canvas. The GLBs themselves are unchanged.
- Preserve desktop/tablet neighbor 3D: active model first; after it is ready, a 2.5s grace period starts; next model warms up, next neighbor mounts, then previous neighbor mounts after next is ready. No blanket preload of all four models.
- `saveData`, `2g`, and `slow-2g` prevent automatic model loading and prefetch. An explicit Activate 3D control remains available. Warmup rechecks connectivity and visibility, and is canceled on navigation/unmount.
- Pause stops all mounted turntables; hidden tabs and reduced-motion users use demand rendering. Cloned materials are disposed without disposing the GLTF cache's shared geometry/textures.
- Keep the studio HDR and font faces local, removing critical third-party fetches. The HDR is the same file as Drei's existing studio preset. Latin and Latin Extended font subsets retain Spanish accents and the existing typography.
- Exclude the Manus development runtime from production HTML. Split internal routes, and request analytics only if both configuration variables are set.
- Add a real robots.txt (the current server returns HTML at this URL) and Apache cache headers, with immutable caching restricted to fingerprinted JS/CSS.
- Expose the actual h1 to assistive technology. Preserve course content, routes, description text, footer composition and central model detail.

## Breakpoints

| Condition | Purpose |
| --- | --- |
| <=720px width | 62% center column; 18% per neighbor; remaining space creates gaps. Camera fits the actual canvas aspect ratio. |
| 390–430px width and >=800px height | Tall phones including Pixel 8: 60% center, capped 370px scene; avoids growth driven solely by phone height. |
| <=960px width and <=540px height | Compact landscape: one Canvas, 200px scene inside a minimum 430px stage; vertical scrolling preserves controls. |
| 721–1024px, other heights | Existing tablet dimensions and header/footer preserved. |
| >=1025px | Existing desktop center geometry preserved. Only headings for tall states 03/04 move to 2rem to separate the subtitle from the model. |

## Verification

Production build and TypeScript pass. Six Vitest cases cover constrained connections, full 2.5s delay, absent Network Information API, cancellation, connection changes, and background tabs. `git diff --check` passes. No production GLB changes.

Chrome desktop browser viewport emulation was used, not physical devices or Safari. Device sizing was verified inside a same-origin iframe to avoid the browser's zoom affecting viewport overrides. Pixel's rendered height was 914px versus the requested 915px (rounding in this environment).

| Profile | CSS viewport observed | States checked | Result |
| --- | --- | --- | --- |
| iPhone 15 equivalent | 390 × 844 | 01–04 | No horizontal overflow; separate side/center columns; title and controls outside central canvas; footer and War Mode visible. |
| Pixel 8 equivalent | 412 × 914 | 01–04 | Same checks pass; one Canvas. All four states visually inspected. |
| Galaxy S24 equivalent | 360 × 780 | 01–04 | Same checks pass; one Canvas. |
| iPad Air equivalent | 820 × 1180 | 01–04 | No horizontal overflow; existing composition preserved; War Mode/footer visible. |
| MacBook 14 equivalent | 1512 × 982 | 01–04 | No horizontal overflow; existing model sizing preserved; tall headings separated. |
| Desktop HD | 1440 × 900 | 01–04 | No horizontal overflow; three Canvases appear sequentially after warmup; approved hierarchy retained. |
| Phone landscape | 844 × 390 | 01–04 | No horizontal overflow; separate columns; title and controls outside the canvas; natural vertical scroll. |

Desktop/tablet Canvases include empty space: their DOM boxes can overlap heading/control/neighbor boxes in the original layout. Those box intersections are not interpreted as geometry collisions; visual checks complement the mobile geometric assertions.

The /courses filter Automotor produced two courses; the Car Detailing detail page opened. /free-resources, /start-smart, /ninja-mode, and /cursos-courses loaded successfully. A local simulated saveData connection produced zero Canvases until Activate 3D was clicked, then one. A simulated HTTP 503 model failure retained the main landmark, heading, controls and central preview instead of the global error screen.

A desktop resource timeline showed the active model requested first (~0.80s), the next model at ~3.79s, and the previous later (~17.73s in the test session). These are ordering observations on a local machine, not public loading-time benchmarks. Rotating through all four states eventually fetches all four as expected.

## Measured build output

| Asset | Base build | Updated build |
| --- | ---: | ---: |
| HTML | 369.08 KB | ~2.0 KB |
| Entry JavaScript | 1,393.36 KB | ~301.5 KB |
| Deferred 3D renderer | Included in entry | ~1,022.6 KB |
| Stylesheet | 157.24 KB | ~159 KB |

The smaller entry is not a claim that total JavaScript disappears: 3D still downloads when enabled. All four WebP posters together are ~134 KB. The heavy 10–17 MB GLB files remain intact, so full 3D is still a significant transfer on slow devices. Desktop eventually retains three full models to preserve its visual behavior.

No new PageSpeed score is claimed. The attached reports (26 mobile / 31 desktop) include an error screen; they are not directly comparable to these local checks. A fresh public PageSpeed run after deployment, real-device GPU/memory testing, Safari/iOS checks, and verification of Hostinger's effective cache headers remain necessary. Production build retains the existing warning for an unresolved paper texture used by the legacy page, plus the expected large deferred 3D chunk warning.

Install reproducibly with the declared pnpm 10.33.0 and `pnpm install --frozen-lockfile`. The pre-existing package-lock.json is stale and npm ci fails; dependencies and lockfiles were not changed in this optimization.

Revert the optimization commit to restore the previous implementation. No deployment or merge into main is performed as part of this review change.

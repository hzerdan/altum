# Altum

Sitio web de Altum, empresa de aberturas de aluminio y vidrio de alta gama en
San Miguel de Tucumán. Es un sitio estático (HTML/CSS/JS, sin build ni
framework) que se publica solo en Vercel al hacer push a `origin/main`
(repo: github.com/hzerdan/altum).

## Personas

- **Hugo** — trabaja el código con Claude, maneja el repo de GitHub y la
  cuenta de Vercel (hosting/dominio).
- **Bruno** — dueño del negocio Altum. No es técnico. Maneja la cuenta de
  Google que verificó Search Console y va a manejar el Perfil de Negocio de
  Google (Google Maps). Las tareas que requieren esa cuenta se le piden a él.
- El pie de página acredita a "Sebastián Patricio Medina Naessens" como
  desarrollador original — no hay info de si sigue participando activamente.

## Archivos

- **`index.html`** — página única (secciones con anclas `#inicio`,
  `#institucional`, `#galeria`, `#productos`, `#contacto`), es la que
  hay que editar para cambios de contenido/SEO. La sección `#productos`
  (antes "Publicaciones") es el catálogo de 12 tarjetas con foto
  `img/project-N.jpg`; en pantallas táctiles el texto de cada tarjeta se
  ve siempre, en escritorio aparece al pasar el mouse.
- **`css/styles.css`**, **`js/script.js`** — estilos y lógica principal
  (menú, formulario, sliders, tema claro/oscuro).
- **`js/hero3d.js`** — fondo 3D del hero con Three.js.
- **`img/`** — imágenes estáticas del sitio (logos, fondos, fotos de
  "Productos"). `project-3.jpg` tiene las caras de dos niños difuminadas a
  propósito; si se vuelve a reemplazar esa foto, mantener el difuminado.
- **`galeria/`** — fotos de obra (`obra-N.jpg`, 19 fotos) + `photos.json`,
  una lista de objetos `{file, title, description}`: cada foto lleva su
  propio título (obra - ubicación) y descripción técnica, que son los
  textos que ve el usuario en el slider "Galería de Trabajos". Ese slider hace
  `fetch()` de `photos.json`, por lo que **no funciona abriendo el HTML
  directo con `file://`** (bloqueo de CORS del navegador) — hace falta
  server local, ver más abajo.
- **`sitemap.xml`**, **`robots.txt`** — SEO técnico, ver estado más abajo.
- **`googled5a1a0d7c11d239e.html`** — archivo de verificación de Google
  Search Console (propiedad manejada por la cuenta de Google de Bruno).

## Dominio y hosting

- Dominio oficial: **`https://www.altumaberturas.com.ar`** (con `www`).
- En Vercel, `altumaberturas.com.ar` (sin `www`) está configurado como
  "Redirect to Another Domain" → 308 hacia la versión con `www`, que es la
  que está conectada al ambiente de Production. Cualquier URL absoluta que
  se agregue al sitio (canonical, og:url, JSON-LD, sitemap) debe usar la
  versión con `www` para ser consistente.
- Push a `main` dispara el deploy automático en Vercel.

## Estado del SEO (al 2026-09-07)

Hecho:
- Title/meta description/OG tags con la keyword "Tucumán".
- Datos estructurados JSON-LD (`HomeAndConstructionBusiness`) en `index.html`
  con nombre, teléfono, mail, dirección y redes — **sin inventar reseñas ni
  ratings**, eso se agrega solo cuando haya datos reales.
- `sitemap.xml` / `robots.txt` presentes y consistentes en `www`.
- Texto del hero reforzado con la keyword sin tocar el eslogan de marca.

Pendiente (le corresponde a Bruno, ver mensaje de WhatsApp ya enviado):
- Confirmar sitemap enviado y pedir indexación manual en Search Console.
- Crear/completar el Perfil de Negocio de Google (Maps) y juntar reseñas.

Al momento de la última revisión, el sitio **no aparecía indexado** en
Google (`site:altumaberturas.com.ar` sin resultados) — es esperable en un
dominio nuevo, pero conviene volver a chequear en próximas sesiones en vez
de asumir que ya se resolvió solo.

## Preview local

`.claude/launch.json` ya define un servidor estático (`python -m http.server
8420`, nombre `altum-static`). Usar `preview_start` con
`{"name": "altum-static"}` — necesario para que cargue bien la galería (ver
arriba, tema `fetch()`/`file://`).

## Convenciones al trabajar en este proyecto

(Las reglas generales de confirmación antes de pushear/descargar están en el
CLAUDE.md global del usuario — acá solo lo específico de este repo.)

- Antes de dar un cambio por terminado, previsualizarlo en el Browser pane.
- No fabricar datos técnicos (indexación, rankings, métricas) sin
  verificarlos de verdad — este proyecto ya tuvo un caso de eso.

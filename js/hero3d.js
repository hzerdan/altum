/* ============================================================
   Altum -- Hero 3D Background (Three.js)
   Escena ambiental: siluetas wireframe de aberturas flotando
   sobre el fondo, con selector de color para previsualizar
   distintos acabados de aluminio.
   ============================================================ */

import * as THREE              from 'https://esm.sh/three';
import { FontLoader }          from 'https://esm.sh/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry }        from 'https://esm.sh/three/examples/jsm/geometries/TextGeometry.js';

const canvas    = document.querySelector('canvas.hero-webgl');
const hero      = document.querySelector('.hero');
const heroMedia = document.querySelector('.hero__media');

if (!canvas || !hero || !heroMedia) {
  console.warn('[hero3d] no se encontro .hero / .hero__media / canvas.hero-webgl');
} else {

  /* ---------- Overlay con selector de color ---------- */
  const overlay = document.createElement('div');
  overlay.className = 'hero3d-overlay';
  overlay.innerHTML =
    '<div class="hero3d-overlay__box">' +
      '<div class="hero3d-color-selector" style="display: flex; align-items: center; justify-content: center; gap: 8px; pointer-events: auto;">' +
        '<span style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin-right: 4px;">Color de Aberturas:</span>' +
        '<button class="color-swatch active" data-color="#4D76CD" style="width: 18px; height: 18px; border-radius: 50%; background: #4D76CD; border: 2px solid #fff; cursor: pointer; padding: 0; outline: none; transition: transform 0.2s;" title="Azul" onmouseover="this.style.transform=\'scale(1.25)\'" onmouseout="this.style.transform=\'scale(1)\'"></button>' +
        '<button class="color-swatch" data-color="#FFFFFF" style="width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; padding: 0; outline: none; transition: transform 0.2s;" title="Blanco" onmouseover="this.style.transform=\'scale(1.25)\'" onmouseout="this.style.transform=\'scale(1)\'"></button>' +
        '<button class="color-swatch" data-color="#111111" style="width: 18px; height: 18px; border-radius: 50%; background: #111111; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; padding: 0; outline: none; transition: transform 0.2s;" title="Negro" onmouseover="this.style.transform=\'scale(1.25)\'" onmouseout="this.style.transform=\'scale(1)\'"></button>' +
        '<button class="color-swatch" data-color="#8E9AA6" style="width: 18px; height: 18px; border-radius: 50%; background: #8E9AA6; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; padding: 0; outline: none; transition: transform 0.2s;" title="Gris Anodizado" onmouseover="this.style.transform=\'scale(1.25)\'" onmouseout="this.style.transform=\'scale(1)\'"></button>' +
        '<button class="color-swatch" data-color="#8B5A2B" style="width: 18px; height: 18px; border-radius: 50%; background: #8B5A2B; border: 2px solid rgba(255,255,255,0.2); cursor: pointer; padding: 0; outline: none; transition: transform 0.2s;" title="Símil Madera" onmouseover="this.style.transform=\'scale(1.25)\'" onmouseout="this.style.transform=\'scale(1)\'"></button>' +
      '</div>' +
    '</div>';
  heroMedia.appendChild(overlay);

  /* ---------- Tamaño ---------- */
  const getSize = () => ({ width: hero.clientWidth, height: hero.clientHeight });
  let sizes = getSize();

  /* ---------- Escena ---------- */
  const scene = new THREE.Scene();
  // No establecer scene.background para permitir transparencia en el canvas
  scene.fog = new THREE.Fog(0x0a0e1a, 15, 55);

  /* ---------- Material compartido (Wireframe color celeste de alta gama) ---------- */
  // transparent + opacity: deja ver mejor la foto de fondo a traves de las lineas
  const wireMat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x4D76CD, transparent: true, opacity: 0.55 }); // Matching --color-primary-light

  /* ---------- Constructor de Modelos de Aberturas 3D ---------- */
  const createOpening = (typeIndex, material) => {
    const group = new THREE.Group();

    if (typeIndex === 0) {
      // 1. Ventana Corrediza (Sliding Window)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.1), material);
      const sashL = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.3, 0.04), material);
      sashL.position.set(-0.48, 0, -0.02);
      const sashR = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.3, 0.04), material);
      sashR.position.set(0.48, 0, 0.02);
      group.add(frame, sashL, sashR);

    } else if (typeIndex === 1) {
      // 2. Puerta de Abrir / Entrada (Door)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.1), material);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.1, 0.04), material);
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), material);
      handle.position.set(0.45, 0, 0.04);
      group.add(frame, panel, handle);

    } else if (typeIndex === 2) {
      // 3. Ventana de Abrir (Swing Window - Abierta a 45 grados)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.1), material);
      const sashGroup = new THREE.Group();
      sashGroup.position.set(-0.55, 0, 0); // Pívot a la izquierda
      const sash = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.3, 0.04), material);
      sash.position.set(0.55, 0, 0);
      sashGroup.add(sash);
      sashGroup.rotation.y = Math.PI / 4; // Abierta 45 grados
      group.add(frame, sashGroup);

    } else {
      // 4. Ventana Desplazable / Proyectante (Awning Window - Abierta abajo 30 grados)
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.1), material);
      const sashGroup = new THREE.Group();
      sashGroup.position.set(0, 0.45, 0); // Pívot arriba
      const sash = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.04), material);
      sash.position.set(0, -0.45, 0);
      sashGroup.add(sash);
      sashGroup.rotation.x = -Math.PI / 6; // Empujada 30 grados
      group.add(frame, sashGroup);
    }

    return group;
  };

  /* ---------- Instanciación de aberturas wireframe ---------- */
  const figures = [];
  const COUNT  = 65; // Cantidad óptima para densidad y rendimiento
  const SPREAD = 45;
  for (let i = 0; i < COUNT; i++) {
    const typeIndex = Math.floor(Math.random() * 4);
    const openingGroup = createOpening(typeIndex, wireMat);

    openingGroup.position.set(
      (Math.random() - 0.5) * SPREAD,
      (Math.random() - 0.5) * SPREAD,
      (Math.random() - 0.5) * SPREAD
    );
    openingGroup.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    const s = Math.random() * 0.7 + 0.3;
    openingGroup.scale.set(s, s, s);

    scene.add(openingGroup);
    figures.push(openingGroup);
  }

  /* ---------- Texto 3D wireframe "ALTUM" ---------- */
  const fontLoader = new FontLoader();
  fontLoader.load(
    'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
    (font) => {
      const textGeo = new TextGeometry('ALTUM', {
        font,
        size:          2.2,
        depth:         0.4,
        curveSegments: 4,     // menos curva = menos vertices
        bevelEnabled:  false  // sin bevel = sin geometria extra
      });
      textGeo.computeBoundingBox();
      const cx = (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) / 2;
      const cy = (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y) / 2;
      textGeo.translate(-cx, -cy, 0);

      const textMesh = new THREE.Mesh(textGeo, wireMat);
      textMesh.position.set(0, 3.2, 0); // Posicionarlo en el tercio superior de la pantalla
      scene.add(textMesh);
    }
  );

  /* ---------- Cámara (fija, sin navegación) ---------- */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.set(0, 0, 11);
  camera.rotation.order = 'XYZ';
  camera.rotation.set(0, 0, 0);
  scene.add(camera);

  /* ---------- Renderer optimizado con transparencia (alpha: true) ---------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setClearColor(0x0a0e1a, 0); // alpha 0 = totalmente transparente
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(1);

  /* ---------- Selector de color de aberturas ---------- */
  setTimeout(() => {
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        swatches.forEach(s => {
          s.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          s.classList.remove('active');
        });

        swatch.style.borderColor = '#fff';
        swatch.classList.add('active');

        const hexColor = swatch.getAttribute('data-color');
        wireMat.color.setStyle(hexColor);
      });
    });
  }, 100);

  /* ---------- Resize ---------- */
  window.addEventListener('resize', () => {
    sizes = getSize();
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  /* ---------- Loop (rotación ambiental de las figuras, cámara fija) ---------- */
  const clock = new THREE.Clock();
  const tick = () => {
    const elapsed = clock.getElapsedTime();

    figures.forEach((fig, i) => {
      fig.rotation.y += 0.004;
      fig.rotation.x += 0.002;
      fig.position.y += Math.sin(elapsed + i * 0.2) * 0.003;
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

}

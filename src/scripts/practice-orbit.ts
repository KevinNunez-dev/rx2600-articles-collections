import * as THREE from 'three';

const canvas = document.querySelector<HTMLCanvasElement>('[data-practice-orbit]');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (canvas && !motion.matches) {
  let renderer: THREE.WebGLRenderer | undefined;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.warn('The decorative RX2600 animation could not start; the static artwork remains available.', error);
  }

  if (renderer) {
    const activeRenderer = renderer;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 8;
    const group = new THREE.Group();
    scene.add(group);
    const rings = [
      { radius: 2.4, tilt: [1.15, 0.2, 0.1], opacity: 0.5 },
      { radius: 2.05, tilt: [0.45, 1.1, 0.2], opacity: 0.3 },
      { radius: 1.75, tilt: [1.3, -0.5, 0.5], opacity: 0.2 },
    ];
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    for (const ring of rings) {
      const points = Array.from({ length: 129 }, (_, index) => {
        const angle = (index / 128) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * ring.radius, Math.sin(angle) * ring.radius, 0);
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x37d4e4, transparent: true, opacity: ring.opacity });
      geometries.push(geometry);
      materials.push(material);
      const line = new THREE.Line(geometry, material);
      line.rotation.set(ring.tilt[0], ring.tilt[1], ring.tilt[2]);
      group.add(line);
    }

    let frame = 0;
    let visible = false;
    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      activeRenderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const draw = (time: number) => {
      group.rotation.y = time * 0.00012;
      group.rotation.z = time * 0.00006;
      activeRenderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(canvas);
    observer.observe(canvas);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      activeRenderer.dispose();
    }, { once: true });
    resize();
  }
}

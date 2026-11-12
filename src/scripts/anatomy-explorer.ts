import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.querySelector<HTMLCanvasElement>('[data-anatomy-canvas]');
const status = document.querySelector<HTMLElement>('[data-anatomy-status]');
const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-anatomy-view]')];

if (canvas && status) {
  const viewCanvas = canvas;
  const statusText = status;
  let renderer: THREE.WebGLRenderer | undefined;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: viewCanvas, antialias: true, alpha: true });
  } catch (error) {
    console.error('Unable to start the anatomy viewer:', error);
    statusText.textContent = 'The 3D viewer could not start on this device. You can download the model using the link below.';
  }

  if (renderer) {
    const activeRenderer = renderer;
    activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    activeRenderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 1000);
    const controls = new OrbitControls(camera, viewCanvas);
    controls.enableDamping = false;
    controls.enablePan = false;
    controls.listenToKeyEvents(viewCanvas);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x52636c, 2.3));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(3, 5, 6);
    scene.add(light);

    const render = () => activeRenderer.render(scene, camera);
    controls.addEventListener('change', render);
    const resize = () => {
      const { clientWidth, clientHeight } = viewCanvas;
      if (!clientWidth || !clientHeight) return;
      activeRenderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      render();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(viewCanvas);
    resize();

    const prefixes: Record<string, string[]> = {
      all: ['Psoas_major', 'Iliacus_muscle', 'Piriformis_muscle', 'Gluteus_medius_muscle', 'Quadratus_lumborum_muscle'],
      bones: [],
      'hip-flexors': ['Psoas_major', 'Iliacus_muscle'],
      gluteals: ['Piriformis_muscle', 'Gluteus_medius_muscle'],
      'lower-back': ['Quadratus_lumborum_muscle'],
    };
    let model: THREE.Object3D | undefined;

    new GLTFLoader().load('/therapy/media/anatomy/lumbar-pelvis.glb', (gltf) => {
      model = gltf.scene;
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const original = Array.isArray(object.material) ? object.material : [object.material];
        original.forEach((material) => material.dispose());
        const name = object.name;
        const color = name.startsWith('Psoas') || name.startsWith('Iliacus') ? 0xd78070
          : name.startsWith('Piriformis') || name.startsWith('Gluteus') ? 0x62b9b1
          : name.startsWith('Quadratus') ? 0xb797c9
          : 0xe9e3d3;
        object.material = new THREE.MeshStandardMaterial({ color, roughness: 0.8, side: THREE.DoubleSide });
      });
      scene.add(model);
      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const extent = Math.max(size.x, size.y, size.z);
      if (!Number.isFinite(extent) || extent <= 0) {
        console.error('The anatomy model has invalid bounds.');
        statusText.textContent = 'The anatomy model could not be displayed. You can download it using the link below.';
        return;
      }
      controls.target.copy(center);
      const framing = Math.max(size.y, size.x / camera.aspect, size.z);
      camera.position.copy(center).add(new THREE.Vector3(0, extent * 0.1, framing * 1.9));
      camera.near = extent / 100;
      camera.far = extent * 20;
      controls.minDistance = extent * 0.7;
      controls.maxDistance = extent * 5;
      camera.updateProjectionMatrix();
      controls.update();
      buttons.forEach((button) => { button.disabled = false; });
      statusText.textContent = '';
      render();
    }, undefined, (error) => {
      console.error('Unable to load the anatomy model:', error);
      statusText.textContent = 'The anatomy model could not be loaded. You can download it using the link below.';
    });

    for (const button of buttons) {
      button.addEventListener('click', () => {
        const view = button.dataset.anatomyView;
        if (!model || !view || !(view in prefixes)) return;
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const isBone = object.name.startsWith('Vertebra_') || object.name.startsWith('Sacrum') || object.name.startsWith('Hip_bone');
          object.visible = isBone || prefixes[view].some((prefix) => object.name.startsWith(prefix));
        });
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        statusText.textContent = `${button.textContent?.trim()} view selected.`;
        render();
      });
    }

    window.addEventListener('pagehide', () => {
      resizeObserver.disconnect();
      controls.dispose();
      model?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      activeRenderer.dispose();
    }, { once: true });
  }
}

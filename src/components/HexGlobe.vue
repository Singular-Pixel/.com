<template>
	<canvas id="globeCanvas" ref="canvas" class="fillParent"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import core from '@/core/index';

let props = defineProps({
	debug: {
		type: Object,
		required: false,
		default: null
	}
});

let canvas = ref(null);
let parent = null;

let rendering = ref(false);

let abortController = new AbortController();

let canvasWidth = 1920;
let canvasHeight = 1080;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;

let startPos = {
	x: -1,
	y: 2,
	z: 0
};
let startLookAt = {
	x: 0,
	y: 1.3,
	z: 0
};

let globeObj = null;
let idle = false;

onMounted(() => {
	nextTick(Init);
});
onBeforeUnmount(() => {
	rendering.value = false;
	abortController.abort();
});

function Init() {
	parent = canvas.value.parentNode;

	CanvasResized();
	window.addEventListener('resize', core.Debounce(() => {
		CanvasResized();
	}, 200), { signal: abortController.signal });

	SetupScene();
	SetupLights();
	SetupObjects();

	StartRendering();
}

function CanvasResized() {
	canvasWidth = parent.offsetWidth;
	canvasHeight = parent.offsetHeight;

	if (camera && renderer) {
		camera.aspect = (canvasWidth / canvasHeight);
		camera.updateProjectionMatrix();

		renderer.setSize(canvasWidth, canvasHeight, false);
	}
}

function SetupScene() {
	renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
		canvas: canvas.value
	});
	renderer.setSize(canvasWidth, canvasHeight, false);
	renderer.setPixelRatio(1);
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.NoToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(20, (canvasWidth / canvasHeight), 0.1, 100);
	camera.position.set(startPos.x, startPos.y, startPos.z);
	camera.lookAt(startLookAt.x, startLookAt.y, startLookAt.z);
	scene.add(camera);

	if (props.debug?.controls) {
		controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(startLookAt.x, startLookAt.y, startLookAt.z);
		controls.update();
		controls.addEventListener('end', () => {
			console.log(camera.position);
			console.log(controls.target);
		});
	}
	if (props.debug?.axis) {
		let axesHelper = new THREE.AxesHelper(100);
		scene.add(axesHelper);
	}
}
function SetupLights() {
	let blue = new THREE.DirectionalLight("#2E5F9C", 5);
	blue.castShadow = true;
	blue.position.set(-100, 80, 0);
	blue.target.position.set(0, 0, 0);
	scene.add(blue);
}
function SetupObjects() {
	let loader = new GLTFLoader();
	let url = "models/hexsphere.gltf";
	loader.load(url, (gltf) => {
		globeObj = gltf.scene;
		scene.add(globeObj);

		if (!rendering.value) {
			StartRendering();
		}
	});
}

function RenderFrame() {
	if (camera && renderer && rendering.value) {
		if (props.debug && controls) {
			controls.update();
		}

		if (globeObj && idle) {
			globeObj.rotation.z -= 0.0002;
		}

		renderer.render(scene, camera);
	}

	if (rendering.value) {
		requestAnimationFrame(RenderFrame);
	}
}
function StartRendering() {
	if (!globeObj) {
		return;
	}
	rendering.value = true;

	AnimateIn();

	requestAnimationFrame(RenderFrame);
}

function AnimateIn() {
	gsap.fromTo(globeObj.position, {
		x: -1,
		y: -1
	}, {
		x: 0,
		y: 0,
		duration: 2,
		ease: 'power2.out',
		onComplete: () => {
			idle = true;
		}
	});
	gsap.fromTo(globeObj.rotation, {
		z: 0
	}, {
		z: -0.4,
		duration: 2,
		ease: 'none',
		onComplete: () => {
			idle = true;
		}
	});
}
</script>

<style lang="scss">

</style>

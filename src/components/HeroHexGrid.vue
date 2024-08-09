<template>
	<canvas ref="canvas" class="fillParent"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import core from '@/core/index';

let props = defineProps({
	show: {
		type: Boolean,
		required: true,
		default: false
	},
	debug: {
		type: Object,
		required: false,
		default: null
	}
});

let canvas = ref(null);
let parent = null;

let rendering = ref(false);

let canvasWidth = 1920;
let canvasHeight = 1080;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;

let startPos = {
	x: -4.32,
	y: 4.16,
	z: 2.48
};
let startLookAt = {
	x: -1.06,
	y: 0.3,
	z: 0.62
};

let objGroup = null;

watch(
	() => props.show,
	(show) => {
		SetVisibility(show);
	}
);

onMounted(() => {
	nextTick(Init);
});

function Init() {
	parent = canvas.value.parentNode;

	Resized();
	window.addEventListener('resize', core.Debounce(() => {
		Resized();
	}, 200));

	SetupScene();
	SetupLights();
	SetupObjects();
	StartRendering();

	SetVisibility(props.show);
}

function Resized() {
	canvasWidth = parent.offsetWidth;
	canvasHeight = parent.offsetHeight;

	if (camera && renderer) {
		camera.aspect = (canvasWidth / canvasHeight);
		camera.updateProjectionMatrix();

		renderer.setSize(canvasWidth, canvasHeight, false);
	}
}

function SetVisibility(show) {
	if (show) {
		gsap.set(canvas.value, {
			opacity: 0,
			overwrite: 'auto'
		});
		gsap.to(canvas.value, {
			opacity: 1,
			duration: 0.5,
			overwrite: 'auto',
			ease: 'none'
		});
		rendering.value = true;
	} else {
		gsap.to(canvas.value, {
			opacity: 0,
			duration: 0.5,
			overwrite: 'auto',
			ease: 'none',
			onComplete: () => {
				rendering.value = false;
			}
		});
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

	camera = new THREE.PerspectiveCamera(55, (canvasWidth / canvasHeight), 0.1, 100);
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
		let axesHelper = new THREE.AxesHelper(5);
		scene.add(axesHelper);
	}
}
function SetupLights() {
	if (props.debug?.lights) {
		let ambient = new THREE.AmbientLight("rgba(255, 255, 255, 1)", 10);
		scene.add(ambient);
	}

	let blue = new THREE.PointLight(0x2E5F9C, 50000);
	blue.castShadow = true;
	blue.position.set(0, -15, 0);
	scene.add(blue);

	if (props.debug?.lights) {
		let blueHelper = new THREE.PointLightHelper(blue);
		scene.add(blueHelper);
	}
}
function SetupObjects() {
	let offset = 0.9;
	let halfOffset = (offset / 2);
	let angularOffset = (offset * 0.866);

	objGroup = new THREE.Group();
	scene.add(objGroup);
	
	HexAt(0, 0);
	for (let ring = 1; ring < 17; ring++) {
		//UpLeft
		HexAt((halfOffset * ring), -(angularOffset * ring));

		//UpRight
		HexAt((offset * ring), 0);

		//Right
		HexAt((halfOffset * ring), (angularOffset * ring));

		//DownRight
		HexAt(-(halfOffset * ring), (angularOffset * ring));

		//DownLeft
		HexAt(-(offset * ring), 0);

		//Left
		HexAt(-(halfOffset * ring), -(angularOffset * ring));

		//Fill between primary directions
		let fillCount = (ring - 1);
		for (let fill = 1; fill <= fillCount; fill++) {
			//Start at ring UpLeft, add towards UpRight
			HexAt((halfOffset * ring) + (halfOffset * fill), -(angularOffset * ring) + (angularOffset * fill));

			//Start at ring UpRight, add towards Right
			HexAt((offset * ring) + -(halfOffset * fill), (angularOffset * fill));

			//Start at ring Right, add towards DownRight
			HexAt((halfOffset * ring) + -(offset * fill), (angularOffset * ring));

			//Start at ring DownRight, add towards DownLeft
			HexAt(-(halfOffset * ring) + -(halfOffset * fill), (angularOffset * ring) + -(angularOffset * fill));

			//Start at ring DownLeft, add towards Left
			HexAt(-(offset * ring) + (halfOffset * fill), -(angularOffset * fill));

			//Start at ring Left, add towards UpLeft
			HexAt(-(halfOffset * ring) + (offset * fill), -(angularOffset * ring));
		}
	}
}
function StartRendering() {
	const RenderFrame = () => {
		if (camera && renderer && rendering.value) {

			if (props.debug && controls) {
				controls.update();
			}
			renderer.render(scene, camera);
		}
		requestAnimationFrame(RenderFrame);
	};
	requestAnimationFrame(RenderFrame);
}

function HexAt(x, z) {
	let obj = new THREE.Mesh(
		new THREE.CylinderGeometry(0.5, 0.5, 0.05, 6),
		new THREE.MeshStandardMaterial({
			color: "rgba(45, 45, 45, 1)"
		})
	);
	obj.castShadow = true;
	obj.receiveShadow = true;
	obj.position.set(x, 0, z);
	scene.add(obj);
	objGroup.add(obj);
}
</script>

<style lang="scss">

</style>

<template>
	<canvas ref="canvas" class="fillParent"></canvas>

	<QImg id="heroLogo" class="canHide" src="@/assets/images/Logo-Vert-OnDark.svg" fit="contain" position="center center" no-spinner />

	<div id="btnExplore" class="q-pa-xl flexCenter vert canHide" @click="Explore">
		<QIcon v-if="$q.platform.is.mobile" name="mdi-gesture-tap" size="64px" />
		<QIcon v-if="$q.platform.is.desktop" name="mdi-cursor-default-click" size="64px" />
		<span class="text-subheading">explore</span>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
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
	x: -2.59,
	y: 3.55,
	z: 1.49
};
let startLookAt = {
	x: -0.3,
	y: 1.16,
	z: 0.17
};

let objGroup = null;

let centerHex = null;
let hexRings = [];

let animatingOut = false;

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
	scene.background = new THREE.Color("#262626");
	scene.fog = new THREE.Fog("#262626", 2, 15);

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
		let ambient = new THREE.AmbientLight("rgba(255, 255, 255, 1)", 1);
		scene.add(ambient);
	}

	RectAreaLightUniformsLib.init();

	let blue = new THREE.RectAreaLight("#2E5F9C", 100, 40, 40);
	blue.position.set(0, -.15, 0);
	blue.rotation.x = THREE.MathUtils.degToRad(90);
	scene.add(blue);
	let blue2 = new THREE.RectAreaLight("#2E5F9C", 100, 40, 40);
	blue2.position.set(0, -.15, 0);
	blue2.rotation.x = THREE.MathUtils.degToRad(-90);
	scene.add(blue2);

	let white = new THREE.PointLight("#F5F5F5", 50);
	white.castShadow = true;
	white.position.set(0, 3, 0);
	scene.add(white);

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

	centerHex = HexAt(0, 0);

	for (let ring = 1; ring < 17; ring++) {
		let hex = null;
		hexRings.push([]);

		//UpLeft
		hex = HexAt((halfOffset * ring), -(angularOffset * ring));
		hexRings[ring-1].push(hex);

		//UpRight
		hex = HexAt((offset * ring), 0);
		hexRings[ring-1].push(hex);

		//Right
		hex = HexAt((halfOffset * ring), (angularOffset * ring));
		hexRings[ring-1].push(hex);

		//DownRight
		hex = HexAt(-(halfOffset * ring), (angularOffset * ring));
		hexRings[ring-1].push(hex);

		//DownLeft
		hex = HexAt(-(offset * ring), 0);
		hexRings[ring-1].push(hex);

		//Left
		hex = HexAt(-(halfOffset * ring), -(angularOffset * ring));
		hexRings[ring-1].push(hex);

		//Fill between primary directions
		let fillCount = (ring - 1);
		for (let fill = 1; fill <= fillCount; fill++) {
			//Start at ring UpLeft, add towards UpRight
			hex = HexAt((halfOffset * ring) + (halfOffset * fill), -(angularOffset * ring) + (angularOffset * fill));
			hexRings[ring-1].push(hex);

			//Start at ring UpRight, add towards Right
			hex = HexAt((offset * ring) + -(halfOffset * fill), (angularOffset * fill));
			hexRings[ring-1].push(hex);

			//Start at ring Right, add towards DownRight
			hex = HexAt((halfOffset * ring) + -(offset * fill), (angularOffset * ring));
			hexRings[ring-1].push(hex);

			//Start at ring DownRight, add towards DownLeft
			hex = HexAt(-(halfOffset * ring) + -(halfOffset * fill), (angularOffset * ring) + -(angularOffset * fill));
			hexRings[ring-1].push(hex);

			//Start at ring DownLeft, add towards Left
			hex = HexAt(-(offset * ring) + (halfOffset * fill), -(angularOffset * fill));
			hexRings[ring-1].push(hex);

			//Start at ring Left, add towards UpLeft
			hex = HexAt(-(halfOffset * ring) + (offset * fill), -(angularOffset * ring));
			hexRings[ring-1].push(hex);
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
			color: "#262626",
			opacity: 1,
			transparent: true
		})
	);
	obj.castShadow = true;
	obj.receiveShadow = true;
	obj.position.set(x, 0, z);
	scene.add(obj);
	objGroup.add(obj);

	return obj;
}

function Explore() {
	let piDiv180 = (3.14159 / 180);

	if (animatingOut) return;
	animatingOut = true;

	document.getElementById('heroLogo').classList.add('hide');
	document.getElementById('btnExplore').classList.add('hide');

	let offset = 0;

	gsap.timeline({
		defaults: {
			ease: 'power2.inOut'
		}
	})
	.to(centerHex.position, {
		y: 1.5,
		duration: 0.25
	})
	.to(centerHex.rotation, {
		y: (270 * piDiv180),
		duration: 0.5
	})
	.to(centerHex.rotation, {
		y: (180 * piDiv180),
		duration: 0.5
	})
	.to(centerHex.rotation, {
		y: (360 * piDiv180),
		duration: 0.5
	})
	.to(centerHex.position, {
		y: -.2,
		duration: 0.25
	})
	.to(centerHex.position, {
		y: 0,
		duration: 0.15
	})
	.to(centerHex.material, {
		opacity: 0,
		duration: 0.15
	});

	offset = 1.9;
	hexRings.forEach((ring) => {
		ring.forEach((hex) => {
			gsap.to(hex.position, {
				y: -.2,
				ease: 'power2.inOut',
				duration: 0.25,
				delay: offset
			});
			gsap.to(hex.position, {
				y: 0,
				ease: 'power2.inOut',
				duration: 0.15,
				delay: (offset + 0.25)
			});
			gsap.to(hex.material, {
				opacity: 0,
				ease: 'none',
				duration: 0.15,
				delay: (offset + 0.4)
			});
		});

		offset += 0.05;
	});
}
</script>

<style lang="scss" scoped>
	#heroLogo {
		position: absolute;
		top: 2vh;
		left: 50%;
		width: 640px;
		max-width: 80vw;
		max-height: 30vh;

		transform: translateX(-50%);
	}

	#btnExplore {
		position: absolute;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -48px);
	}
</style>

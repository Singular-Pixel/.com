<template>
	<canvas id="servicesCanvas" ref="canvas" class="fillParent"></canvas>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import core from '@/core/index';

const hexSideLength = 60;
const hexAngle = 0.5235987755; // 30 degrees in radians
const hexHeight = Math.sin(hexAngle) * hexSideLength;
const hexRadius = Math.cos(hexAngle) * hexSideLength;
const hexRectHeight = hexSideLength + 2 * hexHeight;
const hexRectWidth = 2 * hexRadius;

let canvas = ref(null);
let ctx = null;

let canvasWidth = 1920;
let canvasHeight = 1080;

onMounted(() => {
	nextTick(Init);
});

function Init() {
	parent = canvas.value.parentNode;

	ctx = canvas.value.getContext('2d');

	CanvasResized();
	window.addEventListener('resize', core.Debounce(() => {
		CanvasResized();
		Draw();
	}, 200));

	Draw();
}

function CanvasResized() {
	canvasWidth = parent.offsetWidth;
	canvasHeight = parent.offsetHeight;

	canvas.value.width = canvasWidth;
	canvas.value.height = canvasHeight;
}

function Draw() {
	ctx.fillStyle = '#262626';
	ctx.strokeStyle = '#2E5F9C';
	ctx.lineWidth = 2;

	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	let row = 0;
	let centerX = 0;
	let centerY = 0;

	while (centerY < (canvasHeight + hexRectHeight)) {
		while (centerX < (canvasWidth + hexRectWidth)) {
			DrawHex(centerX, centerY);
			centerX += hexRectWidth + 2;
		}
		row++;
		centerX = ((row % 2) ? -(hexRectWidth / 2) : 0);
		centerY += hexRectHeight - hexHeight + 2;
	}
}
function DrawHex(centerX, centerY) {
	let x = centerX - hexRadius;
	let y = centerY - hexRadius;

	ctx.beginPath();
	ctx.moveTo(x + hexRadius, y);
	ctx.lineTo(x + hexRectWidth, y + hexHeight);
	ctx.lineTo(x + hexRectWidth, y + hexHeight + hexSideLength);
	ctx.lineTo(x + hexRadius, y + hexRectHeight);
	ctx.lineTo(x, y + hexHeight + hexSideLength);
	ctx.lineTo(x, y + hexHeight);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
</script>

<style lang="scss" scoped>
#servicesCanvas {
	opacity: 0.1;
}
</style>

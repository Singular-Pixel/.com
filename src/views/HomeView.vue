<template>
	<QPage data-view="Home" class="colorScrollbars">
		<!--
		<div id="centerY"></div>
		<div id="centerX"></div>
		-->

		<div id="bgGradient" class="fillParent canHide" :class="{ 'hide' : showHexLanding }"></div>

		<HeroHexGrid v-if="showHexLanding" @heroFinished="StartContent" />

		<HexGlobe v-if="!showHexLanding" />
		
		<div id="toolbarContainer" class="row justify-center" :class="{ 'show': !showHexLanding }">
			<div class="gt-sm col-auto"></div>
			<div class="col-xs-12 col-md-8 flexCenter">
				<QToolbar id="toolbarContent" class="q-py-md">
					<div class="toolbarLeft">
						<QImg src="@/assets/images/Logo-Horiz-OnDark.svg" height="60px" fit="contain" position="left center" no-spinner />
					</div>
					<div class="toolbarCenter">
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Services" />
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Platform" />
					</div>
					<div class="toolbarRight">
						<QBtn class="q-px-xl titleFont" size="18px" color="secondary" label="Get&nbsp;Started" />
					</div>
				</QToolbar>
			</div>
			<div class="gt-sm col-auto"></div>
		</div>

		<div v-if="!showHexLanding && showContent" id="heroContent" class="scroll">
			<div class="q-px-lg q-pb-lg row justify-center full-height">
				<div class="gt-sm col-auto"></div>
				<div class="col-xs-12 col-md-8 flexCenter vert">
					<h1 class="q-mt-xl text-hero text-center observe observerFadeInUp">Crafting custom web solutions<br/>for your business</h1>
					<div class="q-mt-xl row justify-center">
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl">
							<div class="hexContainer flexCenter vert observe observerFadeInUp" data-observeDelay="2200ms">
								<div class="hex flexCenter">
									<QImg src="@/assets/images/HeroFeature-Web.webp" height="240px" fit="cover" position="center center" no-spinner />
									<div class="hexBorder"></div>
								</div>
								<h2 class="text-herosubheading text-center">Websites &amp; Storefronts</h2>
							</div>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl">
							<div class="hexContainer flexCenter vert observe observerFadeInUp" data-observeDelay="2000ms">
								<div class="hex flexCenter">
									<QImg src="@/assets/images/HeroFeature-Kiosk.webp" height="240px" fit="cover" position="center center" no-spinner />
									<div class="hexBorder"></div>
								</div>
								<h2 class="text-herosubheading text-center">Kiosks &amp; Signage</h2>
							</div>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl">
							<div class="hexContainer flexCenter vert observe observerFadeInUp" data-observeDelay="2200ms">
								<div class="hex flexCenter">
									<QImg src="@/assets/images/HeroFeature-Experience.webp" height="240px" fit="cover" position="center center" no-spinner />
									<div class="hexBorder"></div>
								</div>
								<h2 class="text-herosubheading text-center">Interactive Experiences</h2>
							</div>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
			<div class="q-px-lg row justify-center">
				<div class="gt-sm col-auto"></div>
				<div class="col-xs-12 col-md-8 flexCenter vert">
					
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
		</div>
	</QPage>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

import HeroHexGrid from '@/components/HeroHexGrid.vue';
import HexGlobe from '@/components/HexGlobe.vue';

let debug = {
	controls: false,
	axis: false,
	lights: false
};

let showHexLanding = ref(true);
let showContent = ref(false);

let observer = null;

onMounted(() => {
	nextTick(Init);
});

function Init() {
	observer = new IntersectionObserver((entries, obs) => {
		entries.map((ele) => {
			if (ele.isIntersecting) {
				obs.unobserve(ele.target);

				ele.target.classList.add('show');
			}
		})
	}, {
		root: null,
		rootMargin: '0px',
		threshold: 0.25
	});
}

function StartContent() {
	showHexLanding.value = false;
	showContent.value = true;

	nextTick(() => {
		document.querySelectorAll('.observe').forEach(ele => {
			let delay = ele.getAttribute('data-observeDelay');
			if (delay) {
				ele.style.transitionDelay = delay;
			}
			observer.observe(ele);
		});
	});
}
</script>

<style lang="scss">
@use '@/core/globals' as *;

#View[data-view="Home"] {

	overflow: hidden;

	#centerY,
	#centerX {
		position: fixed;

		background: $red;

		z-index: 1000;
	}
	#centerY {
		top: 0;
		left: calc(50% - 1px);
		width: 2px;
		height: 100%;
	}
	#centerX {
		top: calc(50% - 1px);
		left: 0;
		width: 100%;
		height: 2px;
	}

	#bgGradient {
		position: fixed;
		opacity: 0.5;
		background-image: linear-gradient(to bottom, #252525, #31313f, #393f5c, #394e7b, #2e5f9c);
	}

	#toolbarContainer {
		position: fixed;
		opacity: 0;
		top: -95px;
		left: 0;
		width: 100%;

		background: $black;
		box-shadow: rgba($white, 0.14) 0px 10px 20px, rgba($white, 0.18) 0px 6px 6px;

		z-index: 1000;

		transition: top 0.5s ease-in,
					opacity 0.5s ease-in;

		&.show {
			opacity: 1;
			top: 0;
		}
	}
	#toolbarContent {
		.toolbarLeft {
			display: flex;
			justify-content: flex-start;
			width: 100%;
		}
		.toolbarCenter {
			display: flex;
			justify-content: center;
			width: 100%;
		}
		.toolbarRight {
			display: flex;
			justify-content: flex-end;
			width: 100%;
		}
	}

	#heroContent {
		position: relative;
		margin-top: 95px;
		height: calc(100% - 95px - 14px);

		background-color: rgba($black, 0.01);
		overflow-x: hidden;

		z-index: 100;
	}

	.hexContainer {
		width: 216.5px;

		.hex {
			position: relative;
			height: 250px;
			aspect-ratio: cos(30deg);
			clip-path: polygon(-50% 50%,50% 100%,150% 50%,50% 0);

			cursor: pointer;

			background: $sp-blue;

			.q-img {
				position: absolute;
				opacity: 0.5;

				transition: opacity 0.25s ease-in-out;
			}
			.hexBorder {
				position: absolute;
				--b: 10px;
				height: 250px;
				aspect-ratio: cos(30deg);
				clip-path: 
					polygon(50% 0,-50% 50%,50% 100%,150% 50%,50% 0,
					50% var(--b),
					calc(100% - var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
					calc(100% - var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
					50% calc(100% - var(--b)),
					calc(var(--b)*sin(60deg)) calc(75% - var(--b)*cos(60deg)),
					calc(var(--b)*sin(60deg)) calc(25% + var(--b)*cos(60deg)),
					50% var(--b));
				background: $sp-blue;
			}

			&:active,
			&:hover {
				.q-img {
					opacity: 1;
				}
			}
		}
	}
}
</style>

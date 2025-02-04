<template>
	<QPage data-view="Home" class="colorScrollbars">
		<!--
		<div id="centerY"></div>
		<div id="centerX"></div>
		-->

		<div id="bgGradient" class="fillParent canHide" :class="{ 'hide': showHero }"></div>

		<HeroHexGrid v-if="showHero" @heroFinished="StartContent" />

		<HexGlobe v-if="!showHero" />
		
		<div id="toolbarContainer" class="row justify-center" :class="{ 'show': !showHero }">
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

		<div v-if="!showHero" id="heroContent" class="scroll">
			<div class="q-px-lg q-pb-lg row justify-center full-height">
				<div class="gt-sm col-auto"></div>
				<div class="col-xs-12 col-md-8 flexCenter vert">
					<FadeInContainer :delay="2000">
						<h1 class="q-mt-xl animatesToVisible text-hero text-center">Crafting custom solutions<br/>for your business</h1>
					</FadeInContainer>
					<div class="q-mt-xl row justify-center">
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl">
							<FadeInContainer :delay="2500">
								<div class="hexContainer flexCenter vert">
									<div class="hex flexCenter">
										<QImg src="@/assets/images/HeroFeature-Web.webp" height="240px" fit="cover" position="center center" no-spinner />
										<div class="hexBorder"></div>
									</div>
									<h2 class="text-herosubheading text-center">Websites &amp; Storefronts</h2>
								</div>
							</FadeInContainer>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl">
							<FadeInContainer :delay="2250">
								<div class="hexContainer flexCenter vert">
									<div class="hex flexCenter">
										<QImg src="@/assets/images/HeroFeature-Kiosk.webp" height="240px" fit="cover" position="center center" no-spinner />
										<div class="hexBorder"></div>
									</div>
									<h2 class="text-herosubheading text-center">Kiosks &amp; Signage</h2>
								</div>
							</FadeInContainer>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl">
							<FadeInContainer :delay="2500">
								<div class="hexContainer flexCenter vert">
									<div class="hex flexCenter">
										<QImg src="@/assets/images/HeroFeature-Experience.webp" height="240px" fit="cover" position="center center" no-spinner />
										<div class="hexBorder"></div>
									</div>
									<h2 class="text-herosubheading text-center">Interactive Experiences</h2>
								</div>
							</FadeInContainer>
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
import FadeInContainer from '@/components/FadeInContainer.vue';

let debug = {
	controls: false,
	axis: false,
	lights: false
};

let showHero = ref(true);

onMounted(() => {
	nextTick(Init);
});

function Init() {
	
}

function StartContent() {
	showHero.value = false;

	
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

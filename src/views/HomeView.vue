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
			<div class="gt-md col-auto"></div>
			<div class="col-xs-12 col-lg-8 flexCenter">
				<QToolbar id="toolbarContent" class="q-py-md">
					<div class="toolbarLeft">
						<QImg src="@/assets/images/Logo-Horiz-OnDark.svg" height="60px" fit="contain" position="left center" no-spinner />
					</div>
					<div v-if="$q.screen.gt.sm" class="toolbarCenter">
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Services" />
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Platform" />
					</div>
					<div class="toolbarRight">
						<QBtn class="q-px-xl titleFont" size="18px" color="secondary" :label="'Get' + (($q.screen.gt.sm) ? '&nbsp;': ' ') + 'Started'" />
					</div>
				</QToolbar>
			</div>
			<div class="gt-md col-auto"></div>
		</div>

		<div v-if="!showHexLanding && showContent" id="contentContainer" class="scroll">
			<div id="heroContent" class="q-px-lg q-pb-lg row justify-center full-height">
				<div class="gt-md col-auto"></div>
				<div class="col-xs-12 col-lg-8 flexCenter vert">
					<h1 class="q-mt-xl q-px-md text-hero text-center">
						<span class="observe observerFadeInUp" data-observeDelay="500ms">Crafting custom web solutions</span>
						<br>
						<span class="observe observerFadeInUp" data-observeDelay="1000ms">for your 
							<div class='rotatingTextWrapper'>
								<div class='rotatingText'>
									business<br/>
									storefront<br/>
									experience<br/>
									exhibit<br/>
									festival<br/>
									trade show<br/>
									concert<br/>
									business</div>
							</div>
						</span>
					</h1>
					<div class="q-mt-xl row justify-center">
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl hexCol">
							<div class="hexContainer flexCenter vert observe observerFadeInUp" data-observeDelay="2200ms">
								<div class="hex flexCenter">
									<QImg src="@/assets/images/HeroFeature-Web.webp" height="240px" fit="cover" position="center center" no-spinner />
									<div class="hexBorder"></div>
								</div>
								<h2 class="text-herosubheading text-center">Websites &amp; Storefronts</h2>
							</div>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl hexCol">
							<div class="hexContainer flexCenter vert observe observerFadeInUp" data-observeDelay="2000ms">
								<div class="hex flexCenter">
									<QImg src="@/assets/images/HeroFeature-Kiosk.webp" height="240px" fit="cover" position="center center" no-spinner />
									<div class="hexBorder"></div>
								</div>
								<h2 class="text-herosubheading text-center">Kiosks &amp; Signage</h2>
							</div>
						</div>
						<div class="col-auto q-pa-xl q-mx-xl q-mt-xxl hexCol">
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
				<div class="gt-md col-auto"></div>
			</div>
			<div id="servicesContent" class="q-px-lg q-py-xl row justify-center">
				<ServicesHexGrid />
				<div class="gt-sm col-auto"></div>
				<div class="q-py-xl col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-mt-xl row">
						<div class="col-xs-12">
							<h1 class="q-px-md text-heading text-uppercase text-center">
								<span class="observe observerFadeInUp" data-observeDelay="300ms">Our Services</span>
							</h1>
						</div>
					</div>
					<div class="q-mt-md row justify-center">
						<div class="col-xs-12 col-sm-8">
							<p class="q-px-md text-body text-center">
								<span class="observe observerFadeInUp" data-observeDelay="500ms">From first sketch to lasting impact, we turn bold ideas into digital experiences that grow with you.</span>
							</p>
						</div>
					</div>
					<div class="q-my-xl cardsContainer row justify-center">
						<div class="col q-mx-lg cardCol observe observerFadeInUp" data-observeDelay="300ms">
							<div class="q-pa-lg cardContent planning">
								<h1 class="text-heading text-uppercase">Concept,<br/>Planning,<br/>Strategy</h1>
							</div>
						</div>
						<div class="col q-mx-lg cardCol observe observerFadeInUp" data-observeDelay="600ms">
							<div class="q-pa-lg cardContent development">
								<h1 class="text-heading text-uppercase">Wireframing,<br/>Development,<br/>Hosting</h1>
							</div>
						</div>
						<div class="col q-mx-lg cardCol observe observerFadeInUp" data-observeDelay="900ms">
							<div class="q-pa-lg cardContent support">
								<h1 class="text-heading text-uppercase">Installation,<br/>Support,<br/>Analytics</h1>
							</div>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
			<div id="platformContent" class="q-px-lg q-py-xl row justify-center">
				<div class="gt-sm col-auto"></div>
				<div class="q-py-xl col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-mt-xl row">
						<div class="col-xs-12">
							<h1 class="q-px-md text-heading text-uppercase text-center">
								<span class="observe observerFadeInUp" data-observeDelay="300ms">Our Platform</span>
							</h1>
						</div>
					</div>
					<div class="q-mt-md row justify-center">
						<div class="col-xs-12 col-sm-8">
							<p class="q-px-md text-body text-center">
								<span class="observe observerFadeInUp" data-observeDelay="500ms">Transforming content management into measurable impact with real-time analytics and actionable insights.</span>
							</p>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
		</div>
	</QPage>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useQuasar } from 'quasar';

import HeroHexGrid from '@/components/HeroHexGrid.vue';
import HexGlobe from '@/components/HexGlobe.vue';
import ServicesHexGrid from '@/components/ServicesHexGrid.vue';

const $q = useQuasar();

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

		let cardContainer = document.querySelector('#servicesContent');
		let cards = document.querySelectorAll('.cardCol');

		cardContainer.addEventListener('mousemove', (evt) => {
			cards.forEach((card) => {
				let rect = card.getBoundingClientRect();
				let x = evt.clientX - rect.left;
				let y = evt.clientY - rect.top;

				card.style.setProperty('--xPos', `${x}px`);
				card.style.setProperty('--yPos', `${y}px`);
			});
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
		box-shadow: rgba($white, 0.04) 0px 10px 20px, rgba($white, 0.08) 0px 6px 6px;

		z-index: 1000;

		transition: top 0.5s ease-in,
					opacity 0.5s ease-in;

		&.show {
			opacity: 1;
			top: 0;
		}
	}
	#toolbarContent {
		gap: 10px;

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

			.q-btn {
				margin-right: 16px;
			}

			body.screen--xs &,
			body.screen--sm & {
				width: 33%;

				.q-btn {
					padding-left: 12px;
					padding-right: 12px;

					line-height: 1.2;
				}
			}

			body.screen--md & {
				.q-btn {
					padding-left: 24px;
					padding-right: 24px;
				}
			}
		}
	}

	#contentContainer {
		position: relative;
		margin-top: 95px;
		height: calc(100% - 95px - 14px);

		background-color: rgba($black, 0.01);
		overflow-x: hidden;

		z-index: 100;
	}

	.text-hero {
		body.screen--xs &,
		body.screen--sm & {
			margin-top: 0px;
		}
	}

	.rotatingTextWrapper {
		display: inline-block;
		position: relative;
		top: 10px;
		left: 0;
		height: 1em;

		text-align: left;
		
		overflow: hidden;
		width: max-content;
	}
	.rotatingText {
		display: inline-block;
		position: relative;
		top: 0;
		left: 0;

		color: $sp-brightblue;
		line-height: 1em;

		animation: rotateText 20s;
		animation-delay: 1s;
		animation-iteration-count: infinite;
		animation-timing-function: cubic-bezier(0.65, 0.05, 0.36, 1);
	}

	.hexCol {
		body.screen--xs &,
		body.screen--sm & {
			margin-left: 0px;
			margin-right: 0px;
			padding: 0px;
		}
		body.screen--md &,
		body.screen--lg &{
			margin-left: 8px;
			margin-right: 8px;
			padding: 16px;
		}
	}

	.hexContainer {
		position: relative;
		width: 216.5px;
		
		cursor: pointer;

		.hex {
			position: relative;
			height: 250px;
			aspect-ratio: cos(30deg);
			clip-path: polygon(-50% 50%,50% 100%,150% 50%,50% 0);

			background: $sp-blue;

			transition: transform 0.1s cubic-bezier(0.19, 1, 0.22, 1);

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
				background-color: $sp-blue;

				transition: transform 0.1s ease-in-out,
							background-color 0.1s linear;
			}
		}

		.text-herosubheading {
			position: absolute;

			z-index: 100;

			transition: all 0.1s ease-in-out;
		}

		&:active,
		&:hover {
			.hex {
				transform: scale(1.3);

				.q-img {
					opacity: 1;
				}
				.hexBorder {
					background-color: $sp-brightblue;
					transform: scale(.9);
				}
			}
			.text-herosubheading {
				transform: translateY(320%);
			}
		}

		body.screen--xs &,
		body.screen--sm & {
			width: 108px;

			.hex {
				height: 125px;

				.q-img {
					height: 120px;
				}
				.hexBorder {
					height: 125px;
				}
			}
		}

		body.screen--md &,
		body.screen--lg & {
			width: 162px;

			.hex {
				height: 187.5px;

				.q-img {
					height: 180px;
				}
				.hexBorder {
					height: 187.5px;
				}
			}
		}
	}

	#servicesContent {
		position: relative;

		background-color: $black;

		&:hover {
			.cardCol {
				background: radial-gradient(100rem circle at var(--xPos) var(--yPos), rgba($sp-brightblue, 0.5), transparent 15%);
			}
		}

		.cardsContainer {
			width: 100%;

			z-index: 1;
		}
		.cardCol {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			height: 200px;

			border-radius: 16px;

			background: radial-gradient(150rem circle at 0 0, rgba($sp-brightblue, 0), transparent 0%);

			.cardContent {
				position: relative;
				width: calc(100% - 4px);
				height: calc(100% - 4px);

				background: $black;
				border: 1px solid rgba($sp-blue, 0.5);
				border-radius: inherit;

				.text-heading {
					position: relative;
					font-size: 1.5rem;
					line-height: 1.4em;
				}

				&:before {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0.25;

					content: '';

					filter: blur(2px);

					background-position: center center;
					background-repeat: no-repeat;
					background-size: cover;

					border-radius: inherit;
				}

				&.planning:before {
					background-image: url(@/assets/images/Services-Planning.webp);
				}
				&.development:before {
					background-image: url(@/assets/images/Services-Development.webp);
				}
				&.support:before {
					background-image: url(@/assets/images/Services-Support.webp);
				}
			}
		}
	}
}

@keyframes rotateText {
	0% {
		top: 0%;
	}
	13%{
		top: -100%;
	}
	25% {
		top: -200%;
	}
	38% {
		top: -300%;
	}
	50% {
		top: -400%;
	}
	63% {
		top: -500%;
	}
	75% {
		top: -600%;
	}
	86% {
		top: -700%;
	}
	99.99999% {
		top: -700%;
	}
	100% {
		top: 0%;
	}
}
</style>

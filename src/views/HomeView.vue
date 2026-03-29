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
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Services" @click="ScrollToServices" />
						<QBtn class="q-px-lg titleFont" size="18px" flat label="Platform" @click="ScrollToPlatform" />
					</div>
					<div class="toolbarRight">
						<QBtn class="q-px-xl titleFont" size="18px" color="secondary" :label="'Get' + (($q.screen.gt.sm) ? '&nbsp;': ' ') + 'Started'" @click="ScrollToContact" />
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
			<div id="servicesContent" class="q-px-lg q-py-xl q-mb-xl row justify-center">
				<FlatHexGrid />
				<div class="gt-sm col-auto"></div>
				<div class="q-py-xl col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-mt-lg row full-width justify-center">
						<div class="col-xs-12">
							<h1 class="q-px-md text-heading text-uppercase text-center observe observerFadeInUp" data-observeDelay="300ms">
								<span>Our Services</span>
							</h1>
						</div>
					</div>
					<div class="q-mt-md row full-width justify-center">
						<div class="col-xs-12 col-sm-8 col-lg-6">
							<p class="q-px-md text-body text-center observe observerFadeInUp" data-observeDelay="500ms">
								<span>From first sketch to lasting impact, we turn bold ideas into digital experiences that grow with you.</span>
							</p>
						</div>
					</div>
					<div class="q-my-xl cardsContainer row justify-center">
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="300ms">
							<div class="q-pa-lg cardContent planning">
								<h1 class="text-heading text-uppercase">Concept,<br/>Planning,<br/>Strategy</h1>
							</div>
						</div>
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="600ms">
							<div class="q-pa-lg cardContent development">
								<h1 class="text-heading text-uppercase">Wireframing,<br/>Development,<br/>Hosting</h1>
							</div>
						</div>
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="900ms">
							<div class="q-pa-lg cardContent support">
								<h1 class="text-heading text-uppercase">Installation,<br/>Support,<br/>Analytics</h1>
							</div>
						</div>
					</div>
					<div class="q-mt-lg row full-width justify-center">
						<div class="col-xs-12 col-sm-8 col-lg-6">
							<p class="q-px-md q-mb-md text-body text-center observe observerFadeInUp" data-observeDelay="500ms">
								<span>Organizations where our work can be seen include:</span>
							</p>
						</div>
						<div id="logoScroller" class="col-xs-12">
							<div id="logoScrollerContent" class="observe observerFadeInUp" data-observeDelay="500ms">
								<div id="logoScrollerItems">
									<img class="logoItem" src="@/assets/logos/343.png" alt="343 Industries Logo" />
									<img class="logoItem" src="@/assets/logos/Argosy.svg" alt="Argosy Cruises Logo" />
									<img class="logoItem" src="@/assets/logos/Funko.svg" alt="Funko Logo" />
									<img class="logoItem" src="@/assets/logos/Genie.svg" alt="Genie Logo" />
									<img class="logoItem" src="@/assets/logos/Kenworth.svg" alt="Kenworth Logo" />
									<img class="logoItem" src="@/assets/logos/Leatherback.png" alt="Leatherback Printing Logo" />
									<img class="logoItem" src="@/assets/logos/Mastercard.svg" alt="Mastercard Logo" />
									<img class="logoItem" src="@/assets/logos/Microsoft.svg" alt="Microsoft Logo" />
									<img class="logoItem" src="@/assets/logos/PACCAR.svg" alt="PACCAR Logo" />
									<img class="logoItem" src="@/assets/logos/STCU.svg" alt="STCU Logo" />
									<img class="logoItem" src="@/assets/logos/XGS.png" alt="Xbox Game Studios Logo" />
									<img class="logoItem" src="@/assets/logos/343.png" alt="343 Industries Logo" />
									<img class="logoItem" src="@/assets/logos/Argosy.svg" alt="Argosy Cruises Logo" />
									<img class="logoItem" src="@/assets/logos/Funko.svg" alt="Funko Logo" />
									<img class="logoItem" src="@/assets/logos/Genie.svg" alt="Genie Logo" />
									<img class="logoItem" src="@/assets/logos/Kenworth.svg" alt="Kenworth Logo" />
									<img class="logoItem" src="@/assets/logos/Leatherback.png" alt="Leatherback Printing Logo" />
									<img class="logoItem" src="@/assets/logos/Mastercard.svg" alt="Mastercard Logo" />
									<img class="logoItem" src="@/assets/logos/Microsoft.svg" alt="Microsoft Logo" />
									<img class="logoItem" src="@/assets/logos/PACCAR.svg" alt="PACCAR Logo" />
									<img class="logoItem" src="@/assets/logos/STCU.svg" alt="STCU Logo" />
									<img class="logoItem" src="@/assets/logos/XGS.png" alt="Xbox Game Studios Logo" />
									<img class="logoItem" src="@/assets/logos/343.png" alt="343 Industries Logo" />
									<img class="logoItem" src="@/assets/logos/Argosy.svg" alt="Argosy Cruises Logo" />
									<img class="logoItem" src="@/assets/logos/Funko.svg" alt="Funko Logo" />
									<img class="logoItem" src="@/assets/logos/Genie.svg" alt="Genie Logo" />
									<img class="logoItem" src="@/assets/logos/Kenworth.svg" alt="Kenworth Logo" />
									<img class="logoItem" src="@/assets/logos/Leatherback.png" alt="Leatherback Printing Logo" />
									<img class="logoItem" src="@/assets/logos/Mastercard.svg" alt="Mastercard Logo" />
									<img class="logoItem" src="@/assets/logos/Microsoft.svg" alt="Microsoft Logo" />
									<img class="logoItem" src="@/assets/logos/PACCAR.svg" alt="PACCAR Logo" />
									<img class="logoItem" src="@/assets/logos/STCU.svg" alt="STCU Logo" />
									<img class="logoItem" src="@/assets/logos/XGS.png" alt="Xbox Game Studios Logo" />
									<img class="logoItem" src="@/assets/logos/343.png" alt="343 Industries Logo" />
									<img class="logoItem" src="@/assets/logos/Argosy.svg" alt="Argosy Cruises Logo" />
									<img class="logoItem" src="@/assets/logos/Funko.svg" alt="Funko Logo" />
									<img class="logoItem" src="@/assets/logos/Genie.svg" alt="Genie Logo" />
									<img class="logoItem" src="@/assets/logos/Kenworth.svg" alt="Kenworth Logo" />
									<img class="logoItem" src="@/assets/logos/Leatherback.png" alt="Leatherback Printing Logo" />
									<img class="logoItem" src="@/assets/logos/Mastercard.svg" alt="Mastercard Logo" />
									<img class="logoItem" src="@/assets/logos/Microsoft.svg" alt="Microsoft Logo" />
									<img class="logoItem" src="@/assets/logos/PACCAR.svg" alt="PACCAR Logo" />
									<img class="logoItem" src="@/assets/logos/STCU.svg" alt="STCU Logo" />
									<img class="logoItem" src="@/assets/logos/XGS.png" alt="Xbox Game Studios Logo" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
			<div id="platformContent" class="q-px-lg q-py-xl q-mb-xl row justify-center">
				<div class="gt-sm col-auto"></div>
				<div class="q-py-xl col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-mt-lg row">
						<div class="col-xs-12">
							<h1 class="q-px-md q-mb-lg text-heading text-uppercase text-center observe observerFadeInUp" data-observeDelay="300ms">
								<span>Our Platform<span class="text-caption comingSoon">(coming soon)</span></span>
							</h1>
						</div>
					</div>
					<div class="q-mt-md row justify-center">
						<div class="col-xs-12 col-sm-8">
							<p class="q-px-md text-body text-center observe observerFadeInUp" data-observeDelay="500ms">
								<span>Transforming content management into measurable impact with real&#8209;time analytics and actionable insights.</span>
							</p>
						</div>
					</div>
					<div class="q-my-xl cardsContainer row justify-center">
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="300ms">
							<div class="q-pa-lg cardContent hosting">
								<h1 class="text-heading text-uppercase">Custom Domains,<br/>Hosting,<br/>Security</h1>
							</div>
						</div>
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="600ms">
							<div class="q-pa-lg cardContent content">
								<h1 class="text-heading text-uppercase">Drag & Drop Content and Asset Management,<br/>Generative AI Tools</h1>
							</div>
						</div>
						<div class="col-xs-12 col-lg-4 cardCol observe observerFadeInUp" data-observeDelay="900ms">
							<div class="q-pa-lg cardContent analytics">
								<h1 class="text-heading text-uppercase">Analytics,<br/>User Tracking,<br/>Insights</h1>
							</div>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
			<div id="contactContent" class="q-px-lg q-py-xl row justify-center">
				<FlatHexGrid />
				<div class="gt-sm col-auto"></div>
				<div class="q-py-xl col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-mt-lg row">
						<div class="col-xs-12">
							<h1 class="q-px-md text-heading text-uppercase text-center observe observerFadeInUp" data-observeDelay="300ms">
								<span>Get Started</span>
							</h1>
						</div>
					</div>
					<div class="q-mt-md row justify-center">
						<div class="gt-xs col-auto"></div>
						<div class="col-xs-12 col-sm-8 flexCenter vert">
							<p class="q-px-md q-pb-md text-body text-center observe observerFadeInUp" data-observeDelay="500ms">
								<span>
									Ready to elevate your digital presence?
									<br/><br/>
									Contact us today to discuss your project and discover how we can help bring your vision to life.
									<br/><br/>
									Use the form below, or just contact us directly at: <a class="text-link" href="mailto:contact@singular-pixel.com" target="_blank">contact@singular-pixel.com</a>.
								</span>
							</p>
							<QForm id="contactForm" class="q-pa-md full-width observe observerFadeInUp" data-observeDelay="500ms" @submit.prevent="SubmitContactForm">
								<QInput v-model="contactName" dark class="q-mb-md" filled label-slot clearable clear-icon="mdi-close" :rules="contactNameRules">
									<template v-slot:label>
										<span>Name <span class="text-negative">*</span></span>
									</template>
								</QInput>
								<QInput v-model="contactCompany" dark class="q-mb-md" filled label="Company" clearable clear-icon="mdi-close" bottom-slots>
									<template v-slot:error>
										<span><!--Empty error slot so this input has the same padding as the rest--></span>
									</template>
								</QInput>
								<QInput v-model="contactEmail" dark class="q-mb-md" filled label-slot type="email" clearable clear-icon="mdi-close" :rules="contactEmailRules">
									<template v-slot:label>
										<span>Email <span class="text-negative">*</span></span>
									</template>
								</QInput>

								<p class="q-mt-sm text-body">What can we help you with?</p>
								<QSelect
									v-model="contactProjectType"
									:options="[
										'Standard Website',
										'Storefront or Sinage',
										'Interactive Kiosk',
										'Custom Web Application',
										'Digital Experience for Event or Exhibit',
										'Other'
									]"
									label-slot
									class="q-mb-md"
									dark
									filled
									clearable
									clear-icon="mdi-close"
									:rules="contactProjectTypeRules">
									<template v-slot:label>
										<span>Project Type <span class="text-negative">*</span></span>
									</template>
								</QSelect>
								<QInput v-model="contactDetails" dark class="q-mb-md" filled label="Any extra details and/or comments you'd like us to have?" type="textarea" clearable clear-icon="mdi-close" />
								<div class="q-mt-md row justify-center">
									<QBtn class="q-px-xl" color="secondary" label="Submit" type="submit" />
								</div>
							</QForm>
						</div>
						<div class="gt-xs col-auto"></div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
			<div id="footerContent" class="q-px-lg q-py-xl row justify-center">
				<div class="gt-sm col-auto"></div>
				<div class="col-xs-12 col-lg-8 flexCenter vert">
					<div class="q-py-lg row full-width">
						<div class="col-xs-12 col-sm-8 flexCenter vert">
							<QImg src="@/assets/images/Logo-HorizTag-OnDark.svg" height="120px" fit="contain" position="left center" no-spinner />
						</div>
						<div class="col-xs-12 col-sm-4">
							<h2 class="q-mb-md text-subheading text-uppercase">Stay Connected</h2>
							<p class="text-caption">Subscribe to our newsletter for the latest updates, insights, and offerings. We promise to never spam you.</p>
							<QForm id="subscribeForm" @submit.prevent="SubmitSubscribeForm">
								<div class="row items-center">
									<div class="col">
										<QInput v-model="subscribeEmail" dark class="q-mt-md" dense filled square label-slot type="email" clearable clear-icon="mdi-close" :rules="subscribeEmailRules">
											<template v-slot:label>
												<span>Email <span class="text-negative">*</span></span>
											</template>
										</QInput>
									</div>
									<div class="col-auto q-pl-sm q-pb-sm">
										<QBtn class="q-px-lg" color="secondary" label="Subscribe" type="submit" />
									</div>
								</div>
							</QForm>
						</div>
					</div>
				</div>
				<div class="gt-sm col-auto"></div>
			</div>
		</div>
	</QPage>
</template>

<script setup>
import { ref, onMounted, nextTick, inject } from 'vue';
import { useQuasar } from 'quasar';

import HeroHexGrid from '@/components/HeroHexGrid.vue';
import HexGlobe from '@/components/HexGlobe.vue';
import FlatHexGrid from '@/components/FlatHexGrid.vue';

const $q = useQuasar();
const $core = inject('$core');

const contactName = ref(null);
const contactCompany = ref(null);
const contactEmail = ref(null);
const contactProjectType = ref(null);
const contactDetails = ref(null);

const contactNameRules = [
	val => (val && val.length > 0) || "Your name is required!"
];
const contactEmailRules = [
	val => (val && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) || "A valid email is required!"
];
const contactProjectTypeRules = [
	val => (val && val.length > 0) || "Please select a project type!"
];

const subscribeEmail = ref(null);

const subscribeEmailRules = [
	val => (val && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) || "A valid email is required!"
];

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

		let serviceCardContainer = document.querySelector('#servicesContent');
		let serviceCards = document.querySelectorAll('.cardCol');

		serviceCardContainer.addEventListener('mousemove', (evt) => {
			serviceCards.forEach((card) => {
				let rect = card.getBoundingClientRect();
				let x = evt.clientX - rect.left;
				let y = evt.clientY - rect.top;

				card.style.setProperty('--xPos', `${x}px`);
				card.style.setProperty('--yPos', `${y}px`);
			});
		});

		let platformCardContainer = document.querySelector('#platformContent');
		let platformCards = document.querySelectorAll('.cardCol');

		platformCardContainer.addEventListener('mousemove', (evt) => {
			platformCards.forEach((card) => {
				let rect = card.getBoundingClientRect();
				let x = evt.clientX - rect.left;
				let y = evt.clientY - rect.top;

				card.style.setProperty('--xPos', `${x}px`);
				card.style.setProperty('--yPos', `${y}px`);
			});
		});
	});
}

async function SubmitContactForm() {
	const web3formsEndpoint = 'https://api.web3forms.com/submit';
	const web3formsAccessKey = 'fa84ec84-9414-40aa-8105-39b9ef9da81d';

	var name = contactName.value + ((contactCompany.value) ? ` (${contactCompany.value})` : '');
	var email = contactEmail.value;
	var message = contactProjectType.value + '\n\n' + contactDetails.value;

	var result = await $core.FetchPostJson(web3formsEndpoint, {
		access_key: web3formsAccessKey,
		name: name,
		email: email,
		message: message
	});
	if (result.success && result.success == true) {
		$q.notify({
			color: 'primary',
			textColor: 'dark',
			icon: 'mdi-check-circle',
			message: 'Thanks for reaching out! We will get back to you as soon as we can.'
		});
	} else {
		$q.notify({
			color: 'negative',
			textColor: 'dark',
			icon: 'mdi-exclamation-thick',
			message: 'Something went wrong while submitting the form. Please try again later, or email us directly at contact@singular-pixel.com'
		});
	}
}

async function SubmitSubscribeForm() {
	const web3formsEndpoint = 'https://api.web3forms.com/submit';
	const web3formsAccessKey = 'fa84ec84-9414-40aa-8105-39b9ef9da81d';

	var email = subscribeEmail.value;

	var result = await $core.FetchPostJson(web3formsEndpoint, {
		access_key: web3formsAccessKey,
		name: '',
		email: email,
		message: "Please subscribe me to the Singular Pixel newsletter."
	});
	if (result.success && result.success == true) {
		$q.notify({
			color: 'primary',
			textColor: 'dark',
			icon: 'mdi-check-circle',
			message: 'Thanks for subscribing to our newsletter! We\'ll be in touch with updates, insights, and offerings soon.'
		});
	} else {
		$q.notify({
			color: 'negative',
			textColor: 'dark',
			icon: 'mdi-exclamation-thick',
			message: 'Something went wrong while submitting the form. Please try again later, or email us directly at contact@singular-pixel.com'
		});
	}
}

function ScrollToServices() {
	let servicesSection = document.querySelector('#servicesContent');
	if (servicesSection) {
		servicesSection.scrollIntoView({ behavior: 'smooth' });
	}
}

function ScrollToPlatform() {
	let platformSection = document.querySelector('#platformContent');
	if (platformSection) {
		platformSection.scrollIntoView({ behavior: 'smooth' });
	}
}

function ScrollToContact() {
	let contactSection = document.querySelector('#contactContent');
	if (contactSection) {
		contactSection.scrollIntoView({ behavior: 'smooth' });
	}
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

		text-align: center;
		
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
	}
	#platformContent {
		position: relative;

		&:hover {
			.cardCol {
				background: radial-gradient(100rem circle at var(--xPos) var(--yPos), rgba($sp-brightblue, 0.5), transparent 15%);
			}
		}

		.text-heading {
			display: inline-block;
			position: relative;

			.comingSoon {
				display: block;
				position: absolute;
				left: 50%;

				transform: translateX(-50%);
			}
		}
	}
	#contactContent {
		position: relative;

		background-color: $black;

		h1 {
			display: inline-block;
			width: 100%;

			transform: translateX(-3px); //Font has slight left spacing, line it back up
		}
	}
	#contactForm {
		background-color: rgba($black, 0.9);

		border: 1px solid rgba($sp-blue, 0.5);
		border-radius: 8px;

		textarea {
			resize: none;
		}
	}

	#footerContent {
		position: relative;

		background: linear-gradient(to bottom, #2E5F9C, #394E7B, #393F5C, #31313F, #252525);
		border-top: 2px solid $sp-blue;
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
			&.hosting:before {
				background-image: url(@/assets/images/Platform-Hosting.webp);
			}
			&.content:before {
				background-image: url(@/assets/images/Platform-Content.webp);
			}
			&.analytics:before {
				background-image: url(@/assets/images/Platform-Analytics.webp);
			}
		}
	}

	#logoScrollerContent {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100px;
	}
	#logoScrollerItems {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 500vw;

		will-change: transform;
		animation: scrollLogos 120s linear 0s normal infinite;

		.logoItem {
			margin: 0 10px;
			max-width: 150px;
			max-height: 80px;
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
@keyframes scrollLogos {
	100% {
		transform: translateX(calc(500vw * -0.5));
	}
}
</style>

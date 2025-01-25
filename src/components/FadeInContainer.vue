<template>
	<div ref="el" class="fadeInContainer" :class="{ 'show' : shown }">
		<slot></slot>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const el = ref(null);
let shown = ref(false);

let observer = null;

let props = defineProps({
	delay: {
		type: Number,
		required: false,
		default: 0
	}
});

onMounted(() => {
	nextTick(Init);
});

function Init() {
	observer = new IntersectionObserver((entries, obs) => {
		if (entries[0].isIntersecting) {
			obs.unobserve(entries[0].target);

			if (props.delay > 0) {
				setTimeout(() => {
					shown.value = true;
				}, props.delay);
			} else {
				shown.value = true;
			}
		}
	}, {
		root: null,
		rootMargin: '0px',
		threshold: 0.25
	});
	observer.observe(el.value);
}
</script>

<style lang="scss">
.fadeInContainer {
	opacity: 0;
	transform: translateY(40px);

	transition: opacity 0.75s ease-in,
				transform 0.75s ease-in;

	&.show {
		opacity: 1;
		transform: translateY(0px);
	}
}
</style>

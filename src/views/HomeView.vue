<template>
	<QPage data-view="Home" class="colorScrollbars">
		<!--
		<div id="centerY"></div>
		<div id="centerX"></div>
		-->

		<HeroHexGrid :show="true" :debug="debug" />
		
		<div class="q-pa-lg row justify-center">
			<div class="gt-sm col-auto"></div>
			<div class="col-xs-12 col-md-8 flexCenter vert">
				
			</div>
			<div class="gt-sm col-auto"></div>
		</div>
	</QPage>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';

import HeroHexGrid from '@/components/HeroHexGrid.vue';

let debug = {
	controls: false,
	axis: false,
	lights: false
};

onMounted(() => {
	nextTick(Init);
});

function Init() {
	
}
</script>

<style lang="scss">
@import '@/core/globals';

#View[data-view="Home"] {

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
}
</style>

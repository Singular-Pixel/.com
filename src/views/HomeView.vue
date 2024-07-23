<template>
	<QPage data-view="Home" class="colorScrollbars">
		<div class="q-pa-xl row justify-center">
			<div class="gt-sm col-auto"></div>
			<div class="col-xs-12 col-md-8 flexCenter vert">
				<QImg id="logo" class="q-mt-xl" src="@/assets/images/Logo-Vert-OnDark.svg" no-spinner />
			</div>
			<div class="gt-sm col-auto"></div>
		</div>
		<div class="q-pa-xl row justify-center">
			<div class="gt-sm col-auto"></div>
			<div class="col-xs-12 col-md-8">
				<h1 class="q-my-xl text-h3 titleFont text-center">coming soon</h1>
			</div>
			<div class="gt-sm col-auto"></div>
		</div>
	</QPage>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';

onMounted(() => {
	nextTick(Init);
});

function Init() {
	
}
</script>

<style lang="scss">
@import '@/core/globals';

#View[data-view="Home"] {

	#logo {
		max-width: 640px;
	}
}
</style>

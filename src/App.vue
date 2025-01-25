<template>
	<QLayout view="hHh lpR fFf">
		<QPageContainer>
			<RouterView id="View" />
		</QPageContainer>
		<QFooter id="Footer" class="bg-dark shadow-up-10">
			<div class="text-caption text-center">© {{year}} Singular Pixel LLC. All Rights Reserved.</div>
		</QFooter>
	</QLayout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

let year = ref(new Date().getFullYear());

onMounted(() => {
	nextTick(Init);
});

function Init() {
	console.log(`App init: ${import.meta.env.VITE_BUILD_TARGET}:${import.meta.env.VITE_BUILD_VERSION}:${import.meta.env.MODE}`);
}
</script>

<style lang="scss">
@use '@quasar/extras/mdi-v7/mdi-v7.css';
@use 'quasar/src/css/index.sass';

@use '@/core/globals' as *;
@use '@/core/core';
</style>

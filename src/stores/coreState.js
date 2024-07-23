import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCoreState = defineStore('coreState', () => {
	let curSection = ref("landing");

	return { curSection };
});

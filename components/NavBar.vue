<template>
  <nav class="sticky top-0 z-40">
    <NavbarPhoneNav :links="paths" v-if="mobileView" />
    <NavbarDesktopNav :links="paths" v-else />
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNavbarStore } from "~/stores/stores.js";

const { paths } = storeToRefs(useNavbarStore());

const width = ref(0);

onMounted(() => {
  resize();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});

const mobileView = computed(() => width.value <= 768);

function resize() {
  width.value = window.innerWidth;
}


</script>
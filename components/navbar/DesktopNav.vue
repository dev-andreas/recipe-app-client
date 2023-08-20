<template>
  <div class="bg-backg-200 flex justify-between items-center shadow-sm p-3">
    <div class="flex">
      <NuxtLink to="/" class="transition-all duration-300">
        <img src="../../assets/images/leaf.svg" alt="logo" class="h-8 drop-shadow-flat-sm" />
      </NuxtLink>
      <ul class="flex items-center">
        <li v-for="(link, index) in props.links" :key="index" class="mx-2">
          <a v-if="link.jump" :href="link.route"
            class="tracking-wider p-2 font-bold hover:text-primary-500 transition ease-out duration-200">
            {{ link.name }}
          </a>
          <NuxtLink v-else-if="!link.subdirs" :to="link.route"
            class="tracking-wider p-2 font-bold hover:text-primary-500 transition ease-out duration-200">
            {{ link.name }}
          </NuxtLink>
          <NavbarDesktopLadder v-else :link="link" />
        </li>
      </ul>
    </div>
    <div class="flex gap-3">
      <NuxtLink to="/login" class="btn btn-primary">Login</NuxtLink>
      <NuxtLink to="/register" class="btn btn-primary">Register</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNavbarStore } from "~/stores/stores.js";

const { showIcon } = storeToRefs(useNavbarStore());

const props = defineProps({
  links: Array,
});
</script>

<style></style>

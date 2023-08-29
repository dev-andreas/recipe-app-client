<template>
  <div>
    <div class="flex justify-between bg-backg-200 items-center shadow-sm transition-all duration-200 ease-out">
      <NuxtLink to="/" class="py-3 px-3 transition-all duration-300" @click="open = false">
        <img src="../../assets/images/leaf.svg" alt="recipe app logo" class="h-8 drop-shadow-flat-sm" />
      </NuxtLink>
      <div class="flex items-center justify-center">

        <!-- Burger -->
        <div class="flex flex-col items-end justify-center mr-5" @click="toggle">
          <div class="w-7 h-1 my-0.5 transition ease-out duration-300 transform bg-font-dark"
            :class="[open ? '-rotate-45 translate-y-2' : 'rotate-0']"></div>
          <div class="w-5 h-1 my-0.5 transition ease-out duration-300 bg-font-dark"
            :class="[open ? 'opacity-0' : 'opacity-100']"></div>
          <div class="w-6 h-1 my-0.5 transition ease-out duration-500 transform bg-font-dark"
            :class="[open ? 'rotate-45 -translate-y-2 w-7' : 'rotate-0 w-5']"></div>
        </div>

      </div>
    </div>
    <Transition name="slide-bottom" mode="">
      <div v-if="open" class="h-0">
        <div class="flex flex-col items-center bg-backg-200 shadow-sm pb-5 border-b border-backg-400">
          <div class="w-72">
            <ul class="flex flex-col gap-5 mb-5">
              <!-- Links -->
              <li v-for="(link, index) in props.links" :key="index">
                <a v-if="link.jump" :href="link.route">
                  <p class="p-2 bgg rounded-sm border font-bold border-font-dark text-center">{{ link.name }}</p>
                </a>
                <NuxtLink v-else-if="!link.subdirs" :to="link.route">
                  <p class="btn btn-secondary text-center"
                    @click="open = false">
                    {{ link.name }}
                  </p>
                </NuxtLink>
                <NavbarPhoneLadder v-else :link="link" :index="index" @jumped="open = false" />
              </li>
            </ul>
            <div class="flex items-center gap-5">
              <NuxtLink to="/login" class="btn btn-primary text-center" @click="open = false">Sign in</NuxtLink>
              <NuxtLink to="/register" class="btn btn-primary text-center" @click="open = false">Sign up</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNavbarStore } from "~/stores/stores.js";

const { showIcon } = storeToRefs(useNavbarStore());

const props = defineProps({
  links: Array
});

const open = ref(false);

function toggle() {
  open.value = !open.value;
}
</script>

<style></style>

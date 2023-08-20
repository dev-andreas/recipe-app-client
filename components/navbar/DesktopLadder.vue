<template>
  <div @mouseenter="open = true" @mouseleave="open = false">
    <p
      class="
        tracking-wider
        p-2
        rounded-md
        hover:bg-gray-200
        transition
        ease-out
        duration-500
        cursor-pointer
      "
    >
      {{ link.name }}
      <ChevronDownSvg class="w-4 h-4 fill-font-dark inline" />
    </p>
    <Transition name="slide-top" mode="">
      <ul
        v-if="open"
        class="
          p-5
          border-2 border-gray-300
          rounded-md
          shadow-md
          bg-backg-light
          absolute
          transform
        "
      >
        <li v-for="link in link.subdirs">
          <NuxtLink v-if="!link.external" :to="link.route" class="tracking-wider text-sm">
            <div
              class="
                p-2
                rounded-md
                hover:bg-gray-200
                transition
                ease-in
                duration-100
              "
              @click="open = false"
            >
              <span v-if="link.jump" class="text-gray-300"># </span
              >{{ link.name }}
            </div>
          </NuxtLink>
          <a v-else :href="link.route" target="_blank" rel="noopener noreferrer">
            <div
              class="
                p-2
                rounded-md
                hover:bg-gray-200
                transition
                ease-in
                duration-100
                flex
                items-center
              "
              @click="open = false"
            >
              <ExternalLinkSvg
                class="stroke-gray-600 w-4 mr-2"
              />
              {{ link.name }}
            </div>
          </a>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
import ChevronDownSvg from "../svgpaths/ChevronDownSvg.vue";
import ExternalLinkSvg from "../svgpaths/ExternalLinkSvg.vue";
export default {
  components: {
    ChevronDownSvg,
    ExternalLinkSvg,
  },
  props: {
    link: Object,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style>
</style>
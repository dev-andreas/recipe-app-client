<template>
  <div class="w-64">
    <p
      @click="toggle"
      class="
        tracking-wider
        rounded-md
        p-2
        bg-gray-200
        transition
        ease-out
        duration-500
        flex
        justify-between
        items-center
        cursor-pointer
      "
    >
      {{ link.name }}
      <ChevronDownSvg
        class="
          w-4
          h-4
          fill-font-dark
          inline
          transform
          transition
          ease-out
          duration-200
        "
        :class="[open ? 'rotate-180' : 'rotate-0']"
      />
    </p>
    <Transition name="slide-top" mode="">
      <ul
        v-if="open"
        class="
          p-4
          w-64
          border-2 border-gray-300
          rounded-md
          shadow-md
          bg-backg-light
          absolute
          z-50
        "
      >
        <li v-for="link in link.subdirs">
          <a
            v-if="link.jump"
            :href="link.route"
            class="tracking-wider p-2 border-b border-transparent hover:border-font-dark transition ease-out duration-500">
            {{ link.name }}
          </a>
          <NuxtLink
            v-else-if="!link.external"
            :to="link.route"
            class="tracking-wider text-sm"
          >
            <div
              class="
                p-2
                rounded-md
                hover:bg-gray-200
                transition
                ease-in
                duration-100
              "
              @click="$emit('jumped')"
            >
              {{ link.name }}
            </div></NuxtLink
          >
          <a
            v-else
            :href="link.route"
            target="_blank"
            rel="noopener noreferrer"
          >
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
              <ExternalLinkSvg class="stroke-gray-600 w-4 mr-2" />
              <span v-if="link.jump" class="text-gray-300"># </span
              >{{ link.name }}
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
    index: Number,
  },
  emits: ["jumped"],
  methods: {
    toggle() {
      if (this.open) {
        this.$store.commit("setCurrentLink", -1);
        return;
      }
      this.$store.commit("setCurrentLink", this.index);
    },
  },
  computed: {
    open() {
      return this.$store.getters["getCurrentLink"] === this.index;
    },
  },
};
</script>

<style>
</style>
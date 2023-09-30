<template>
  <nav class="sticky top-0 z-40">
    <NavbarPhoneNav :links="paths" v-if="mobileView" />
    <NavbarDesktopNav :links="paths" v-else />
  </nav>
</template>

<script setup>
import { useNavbarStore } from "~/stores/navbar.js"
import { useAuthStore } from "~/stores/auth.js"

const navbarStore = useNavbarStore()
const authStore = useAuthStore()

const paths = computed(() => authStore.loggedIn ? navbarStore.pathsAuth : navbarStore.pathsGuest)

const width = ref(0);

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

const mobileView = computed(() => width.value <= 768)

function resize() {
  width.value = window.innerWidth
}


</script>
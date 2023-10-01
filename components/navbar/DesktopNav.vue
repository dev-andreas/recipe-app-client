<template>
    <div class="bg-backg-200 flex justify-between items-center shadow-sm p-3">
        <div class="flex">
            <NuxtLink to="/" class="flex items-center gap-4 transition-all duration-300">
                <img src="~/assets/images/leaf.svg" alt="logo" class="h-8 drop-shadow-flat-sm" />
                <p v-if="!authStore.loggedIn" class="font-medium text-xl">Recipes</p>
            </NuxtLink>
            <ul class="flex items-center gap-3 ml-6">
                <li v-for="(link, index) in props.links" :key="index">
                    <a v-if="link.jump" :href="link.route"
                        class="tracking-wider font-medium hover:text-primary-500 transition ease-out duration-200">
                        {{ link.name }}
                    </a>
                    <NuxtLink v-else-if="!link.subdirs" :to="link.route"
                        class="tracking-wider font-medium hover:text-primary-500 transition ease-out duration-200">
                        {{ link.name }}
                    </NuxtLink>
                    <NavbarDesktopLadder v-else :link="link" />
                </li>
            </ul>
        </div>
        <div v-if="!authStore.loggedIn" class="flex gap-3">
            <NuxtLink to="/login" class="btn btn-primary">Sign in</NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary">Sign up</NuxtLink>
        </div>
        <div v-else class="flex gap-3">
            <p class="self-center">{{ authStore.firstName }} {{ lastNameAbbrev }}</p>
            <button class="btn btn-primary" @click="logout()">Log out</button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js"

const authStore = useAuthStore()

const lastNameAbbrev = computed(() => authStore.lastName.substring(0, 1) + ".")

const props = defineProps({
    links: Array,
})

function logout() {
    authStore.logout()
}
</script>

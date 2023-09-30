<template>
    <div>
        <div class="flex justify-between bg-backg-200 items-center shadow-sm transition-all duration-200 ease-out p-3">
            <NuxtLink to="/" class="flex items-center gap-4 transition-all duration-300" @click="open = false">
                <img src="../../assets/images/leaf.svg" alt="recipe app logo" class="h-8 drop-shadow-flat-sm" />
                <p v-if="!authStore.loggedIn" class="font-medium text-xl">Recipes</p>
            </NuxtLink>
            <div class="flex items-center justify-center">

                <!-- Burger -->
                <div class="flex flex-col items-end justify-center" @click="toggle">
                    <div class="w-7 h-1 my-0.5 transition ease-out duration-300 transform bg-font-dark rounded-full"
                        :class="[open ? '-rotate-45 translate-y-2' : 'rotate-0']"></div>
                    <div class="w-5 h-1 my-0.5 transition ease-out duration-300 bg-font-dark rounded-full"
                        :class="[open ? 'opacity-0' : 'opacity-100']"></div>
                    <div class="w-6 h-1 my-0.5 transition ease-out duration-500 transform bg-font-dark rounded-full"
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
                                    <p class="p-2 bgg rounded-sm border font-medium border-font-dark text-center">{{
                                        link.name }}</p>
                                </a>
                                <NuxtLink v-else-if="!link.subdirs" :to="link.route">
                                    <p class="btn btn-secondary text-center font-medium" @click="open = false">
                                        {{ link.name }}
                                    </p>
                                </NuxtLink>
                                <NavbarPhoneLadder v-else :link="link" :index="index" @jumped="open = false" />
                            </li>
                        </ul>
                        <div v-if="!authStore.loggedIn" class="flex gap-3">
                            <NuxtLink to="/login" class="btn btn-primary">Sign in</NuxtLink>
                            <NuxtLink to="/register" class="btn btn-primary">Sign up</NuxtLink>
                        </div>
                        <div v-else class="flex gap-3">
                            <button class="btn btn-primary" @click="logout()">Log out</button>
                            <p class="self-center">{{ authStore.firstName }} {{ lastNameAbbrev }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js"

const authStore = useAuthStore()

const lastNameAbbrev = computed(() => authStore.lastName.substring(0, 1) + ".")

const props = defineProps({
    links: Array
})

const open = ref(false)

function toggle() {
    open.value = !open.value
}

function logout() {
    authStore.logout()
}
</script>

<style></style>

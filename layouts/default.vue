<template>
    <div class="flex flex-col min-h-screen justify-between">
        <NavBar />
        <slot></slot>
        <span></span>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth.js"

onBeforeMount(() => {
    const authStore = useAuthStore()
    authStore.accessToken = localStorage.getItem("accessToken")
    authStore.refreshToken = localStorage.getItem("refreshToken")
    authStore.firstName = localStorage.getItem("firstName")
    authStore.lastName = localStorage.getItem("lastName")
    authStore.email = localStorage.getItem("email")
})

</script>
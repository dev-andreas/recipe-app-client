<template>
    <div class="flex flex-col items-center gap-10">
        <h1 class="text-5xl font-bold">Welcome! 🎉</h1>
        <NuxtLink to="/login" class="btn btn-primary">Sign in</NuxtLink>
    </div>
</template>

<script setup>
useAuthGuest()
</script>
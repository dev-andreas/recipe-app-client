<template>
    <div class="flex flex-col items-center justify-between">
        <img src="../assets/images/leaf.svg" alt="Recipe App logo" class="drop-shadow-flat">
        <h1 class="text-3xl font-bold mt-5">Good {{ daytime }}!</h1>
        <div class="flex gap-5 mt-5">
            <NuxtLink to="/random" class="btn btn-primary text-lg">Get Random Recipe</NuxtLink>
            <NuxtLink to="/recipe/edit/new" class="btn btn-secondary text-lg">Create</NuxtLink>
        </div>
    </div>
</template>

<script setup>
useAuthRecipeUser()

const date = ref(new Date())
const daytime = computed(() => {
    const hour = date.value.getHours()
    if (hour >= 4 && hour < 13) {
        return "morning"
    } else if (hour >= 13 && hour < 18) {
        return "afternoon"
    } else {
        return "evening"
    }
})
</script>
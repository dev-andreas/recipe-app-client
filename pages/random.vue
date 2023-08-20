<template>
    <div v-if="type == ''" class="flex flex-col items-center gap-5">
        <h1 class="text-3xl font-bold">Select type:</h1>
        <div class="flex gap-2">
            <button class="btn btn-secondary p-2" @click="setType('Breakfast')">Breakfast</button>
            <button class="btn btn-secondary p-2" @click="setType('Dinner')">Dinner</button>
            <button class="btn btn-secondary p-2" @click="setType('Lunch')">Lunch</button>
        </div>
    </div>
    <div v-else class="flex flex-col items-center gap-5">
        <div v-if="recipe != null" class="flex flex-col items-center gap-5">
            <h1 class="text-3xl font-bold">This is your recipe:</h1>
            <div class="flex gap-2">
                <p class="text-xl">{{ recipe.name }}</p>
                <NuxtLink :to="'/recipe/' + recipe.id" class="btn btn-primary p-2">
                    <SvgpathsMagnifyingGlassSvg class="w-4 h-4 stroke-zinc-900" />
                </NuxtLink>
            </div>
            <button class="btn btn-secondary p-2" @click="setType(type)">Get other recipe</button>
        </div>
        <h1 class="text-3xl font-bold" v-else>No recipe found</h1>
    </div>
</template>

<script setup>
const type = ref("");

const recipe = ref(null)

function setType(val) {
    type.value = val

    let recipes = JSON.parse(localStorage.getItem("recipes"))
    if (recipes == null) {
        recipes = []
    }
    recipes = recipes.filter((recipe) => recipe.type == type.value)
    if (recipes.length > 0) {
        const index = Math.floor(Math.random()*recipes.length)
        recipe.value = recipes[index]
    }
}
</script>
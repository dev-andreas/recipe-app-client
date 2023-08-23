<template>
    <div v-if="type == ''" class="flex flex-col items-center gap-5">
        <h1 class="text-3xl font-bold">Select type:</h1>
        <div class="flex gap-2">
            <button class="btn btn-secondary p-2" @click="setRandomRecipe('Breakfast')">Breakfast</button>
            <button class="btn btn-secondary p-2" @click="setRandomRecipe('Dinner')">Dinner</button>
            <button class="btn btn-secondary p-2" @click="setRandomRecipe('Lunch')">Lunch</button>
        </div>
    </div>
    <div v-else class="flex flex-col items-center gap-5">
        <div v-if="recipe != null" class="flex flex-col items-center gap-5">
            <h1 class="text-3xl font-bold">Your {{ type.toLocaleLowerCase() }} for today:</h1>
            <p class="text-2xl">{{ recipe.name }}</p>
            <div class="flex gap-2 items-center">
                <NuxtLink :to="'/recipe/' + recipe.id" class="flex items-center gap-2 btn btn-primary p-2">
                    <span class="text-2xl">😋</span> View recipe
                </NuxtLink>
                <button class="flex items-center gap-2 btn btn-secondary p-2" @click="setRandomRecipe(type)">
                    <span class="text-2xl">🤮</span> Other recipe
                </button>
            </div>
        </div>
        <div v-else class="flex flex-col items-center gap-2">
            <h1 class="text-3xl font-bold">No recipe found</h1>
            <NuxtLink class="btn btn-secondary p-2" to="/recipe/edit/new">
                <SvgpathsPlusSvg class="w-4 h-4 stroke-black" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useRecipeStore } from "~/stores/stores.js"
const recipeStore = useRecipeStore()

onMounted(async () => {
    if (recipeStore.recipes.length == 0) {
        await recipeStore.loadRecipes()
    }
})

const type = ref("")
const recipe = ref(null)

function setRandomRecipe(val) {
    type.value = val
    const previous = localStorage.getItem("previous" + type.value)

    let recipes = recipeStore.recipes
    if (recipes == null) {
        recipes = []
    }
    recipes = recipes.filter((recipe) => recipe.type == type.value && recipe.name != previous)
    if (recipes.length > 0) {
        const index = Math.floor(Math.random() * recipes.length)
        recipe.value = recipes[index]
        localStorage.setItem("previous" + type.value, recipe.value.name)
    }
}
</script>
<template>
    <h1 v-if="recipe == null" class="font-bold text-3xl text-center">
        Recipe not found!
    </h1>
    <div v-else class="flex flex-col items-center">
        <div class="w-80 flex flex-col items-start gap-5">
            <h1 class="font-bold text-3xl">{{ recipe.name }}</h1>
            <p class="btn font-bold px-3 py-1 rounded-xl bg-stone-300">Type: {{ type }}</p>
            <div>
                <p class="font-bold">Ingredients:</p>
                <p v-for="ingredient in recipe.ingredients">
                    {{ ingredient.name }}, {{ ingredient.amount }}{{ ingredient.unit }}
                </p>
            </div>
            <div>
                <p class="font-bold">Instructions:</p>
                <p v-for="instruction in instructions">{{ instruction }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRecipeStore } from "~/stores/recipe.js"

useAuthRecipeUser()

const recipeStore = useRecipeStore()
const route = useRoute()
const recipe = ref(null)

const instructions = computed(() => {
    return recipe.value.instructions.split("\n")
})

const type = computed(() => {
    return recipe.value.type.charAt(0).toUpperCase() + recipe.value.type.slice(1).toLowerCase()
})

onMounted(async () => {
    if (recipeStore.recipes.length == 0) {
        await recipeStore.loadRecipes()
    }

    const lastIndex = route.params.id.lastIndexOf("-")
    const id = route.params.id.substring(lastIndex + 1)

    const filteredRecipes = recipeStore.recipes.filter((recipe) => recipe.id == id)
    if (filteredRecipes.length != 0) {
        recipe.value = filteredRecipes[0]
    }
})
</script>
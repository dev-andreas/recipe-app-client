import { defineStore } from "pinia"
import { useRuntimeConfig } from "nuxt/app"
import { useAuthStore } from "~/stores/auth.js"

export const useRecipeStore = defineStore("recipe", () => {
    const authStore = useAuthStore()
    const recipes = ref([])
    const lastResponse = ref(null)

    async function loadRecipes() {
        if (await authStore.send("recipe", "GET")) {
            lastResponse.value = authStore.lastResponse
            recipes.value = lastResponse.value
            return true
        }
        lastResponse.value = authStore.lastResponse
        return false
    }

    async function createRecipe(recipe) {
        if (await authStore.send("recipe", "POST", recipe)) {
            lastResponse.value = authStore.lastResponse
            recipes.value.push(lastResponse.value)
            return true
        }
        lastResponse.value = authStore.lastResponse
        return false
    }

    async function updateRecipe(recipe) {
        if (await authStore.send("recipe", "PUT", recipe)) {
            lastResponse.value = authStore.lastResponse
            recipes.value = recipes.value.filter((r) => r.id != recipe.id)
            recipes.value.push(lastResponse.value)
            return true
        }
        lastResponse.value = authStore.lastResponse
        return false
    }

    async function deleteRecipe(id) {
        if (await authStore.send(`recipe/${id}`, "DELETE")) {
            lastResponse.value = authStore.lastResponse
            recipes.value = recipes.value.filter((recipe) => recipe.id != id)
            return true
        }
        lastResponse.value = authStore.lastResponse
    }

    return { recipes, lastResponse, loadRecipes, createRecipe, updateRecipe, deleteRecipe }
})
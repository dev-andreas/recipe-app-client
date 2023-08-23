import { defineStore } from "pinia"
import { useRuntimeConfig } from "nuxt/app"

export const useNavbarStore = defineStore("navbar", {
    state: () => {
        return {
            showIcon: false,
            paths: [
                {
                    name: "Home",
                    route: "/",
                    jump: false,
                },
                {
                    name: "My Recipes",
                    route: "/my-recipes",
                    jump: false,
                }
            ]
        };
    }
})

export const useRecipeStore = defineStore("recipe", () => {
    const runtimeConfig = useRuntimeConfig()
    const recipes = ref([])
    const lastResponse = null

    async function loadRecipes() {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}recipe`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.lastResponse = await rawResponse.json()
            if (rawResponse.ok) {
                this.recipes = this.lastResponse
                return true
            }
        } catch (e) {
            console.log(e)
            this.lastResponse = null
        }
        return false
    }
    async function createRecipe(recipe) {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}recipe`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            });
            this.lastResponse = await rawResponse.json()
            if (rawResponse.ok) {
                this.recipes.push(this.lastResponse)
                return true
            }
        } catch (e) {
            console.log(e)
            this.lastResponse = null
        }
        return false
    }
    async function updateRecipe(recipe) {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}recipe`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(recipe)
            });
            this.lastResponse = await rawResponse.json()
            if (rawResponse.ok) {
                this.recipes = this.recipes.filter((r) => r.id != recipe.id)
                this.recipes.push(this.lastResponse)
                return true
            }
        } catch (e) {
            console.log(e)
            this.lastResponse = null
        }
        return false
    }
    async function deleteRecipe(id) {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}recipe/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.lastResponse = await rawResponse.json()
            if (rawResponse.ok) {
                this.recipes = this.recipes.filter((recipe) => recipe.id != id)
                return true
            }
        } catch (e) {
            console.log(e)
            this.lastResponse = null
        }
        return false
    }

    return { recipes, lastResponse, loadRecipes, createRecipe, updateRecipe, deleteRecipe }
})
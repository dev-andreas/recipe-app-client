<template>
    <div class="flex flex-col items-center">
        <ModalPage title="New ingredient" v-model="showNewIngredientModal">
            <div class="flex flex-col gap-2 mt-5">
                <div class="flex flex-col gap-1">
                    <label for="ingredientName">Name:</label>
                    <input type="text" id="ingredientName" class="inpt" v-model="ingredientName">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ingredientAmount">Amount:</label>
                    <input type="number" class="inpt" id="ingredientAmount" v-model="ingredientAmount">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="ingredientUnit">Unit:</label>
                    <input type="text" class="inpt" id="ingredientUnit" v-model="ingredientUnit">
                </div>
            </div>
            <div class="flex gap-2 mt-5">
                <button class="btn btn-primary self-start"
                    @click="addIngredient(); showNewIngredientModal = false;">Add</button>
                <button class="btn btn-secondary self-start" @click="showNewIngredientModal = false">Cancel</button>
            </div>
        </ModalPage>
        <ModalPage title="Error" v-model="showErrorModal">
            <p>{{ errorMsg }}</p>
        </ModalPage>
        <h1 v-if="id == 'new'" class="text-3xl font-bold">New Recipe</h1>
        <h1 v-else class="text-3xl font-bold">{{ name }}</h1>
        <form class="flex flex-col gap-5 mt-10 w-80" @submit.prevent="save()">
            <div class="flex flex-col gap-1">
                <label for="name" class="font-bold">Name:</label>
                <input type="text" id="name" class="inpt" v-model="name">
            </div>
            <div class="flex flex-col gap-1">
                <label for="type" class="font-bold">Type:</label>
                <RadioSelect :items="['BREAKFAST', 'DINNER', 'LUNCH']" v-model="type"></RadioSelect>
            </div>
            <div class="flex flex-col gap-1">
                <label for="ingredients" class="font-bold">Ingredients:</label>
                <TransitionGroup class="grid gap-2" name="list" tag="div" @before-leave="beforeLeave">
                    <div v-for="ingredient, index in ingredients" :key="ingredient"
                        class="flex items-center justify-between bg-backg-300 p-1 rounded-xl w-80">
                        <p class="ml-2">{{ ingredient.name }}, {{ ingredient.amount }} {{ ingredient.unit }}</p>
                        <button type="button" class="btn btn-primary p-2" @click="ingredients.splice(index, 1)">
                            <SvgpathsTrashSvg class="w-4 h-4 stroke-backg-900" />
                        </button>
                    </div>
                    <div class="flex items-center justify-between gap-1 bg-backg-300 p-1 rounded-xl" key="addingredient">
                        <p class="ml-2 font-bold">Add ingredient</p>
                        <button type="button" class="btn btn-primary p-2" @click="showNewIngredientModal = true">
                            <SvgpathsPlusSvg class="w-4 h-4 stroke-backg-900" />
                        </button>
                    </div>
                </TransitionGroup>
            </div>
            <div class="flex flex-col gap-1">
                <label for="instructions" class="font-bold">Instructions:</label>
                <textarea id="instuctions" class="inpt resize-none" cols="30" rows="10" v-model="instructions"></textarea>
            </div>
            <div class="flex gap-2">
                <input type="submit" class="btn btn-primary" value="Save">
                <NuxtLink to="/" class="btn btn-secondary">Cancel</NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRecipeStore } from "~/stores/recipe.js"

useAuthRecipeUser()

const recipeStore = useRecipeStore()
const route = useRoute()

const id = ref(route.params.id)
const name = ref("")
const type = ref("")
const instructions = ref("")
const ingredients = ref([])
const showNewIngredientModal = ref(false)
const showErrorModal = ref(false)
const errorMsg = ref("")

const ingredientName = ref("")
const ingredientAmount = ref("")
const ingredientUnit = ref("")

onMounted(async () => {
    if (recipeStore.recipes.length == 0) {
        await recipeStore.loadRecipes()
    }
    const recipes = recipeStore.recipes

    if (id.value != "new" && typeof recipes == "object") {
        const filteredRecipes = recipes.filter((recipe) => recipe.id == id.value)
        if (filteredRecipes.length != 0) {
            const recipe = filteredRecipes[0]
            id.value = recipe.id
            name.value = recipe.name
            type.value = recipe.type
            instructions.value = recipe.instructions
            ingredients.value = recipe.ingredients
        } else {
            id.value = "new"
        }
    } else {
        id.value = "new"
    }
})

async function save() {
    if (name.value == "") return
    if (type.value == "") return
    if (instructions.value == "") return

    let success = false

    if (id.value == "new") {
        success = await recipeStore.createRecipe({
            "id": 0,
            "name": name.value,
            "type": type.value.toUpperCase(),
            "instructions": instructions.value,
            "ingredients": ingredients.value
        })
    } else {
        success = await recipeStore.updateRecipe({
            "id": id.value,
            "name": name.value,
            "type": type.value,
            "instructions": instructions.value,
            "ingredients": ingredients.value
        })
    }

    if (!success) {
        if (recipeStore.lastResponse != null) {
            errorMsg.value = "Couldn't save recipe. Code: " + recipeStore.lastResponse.status
            showErrorModal.value = true
        } else {
            errorMsg.value = "Couldn't save recipe. No connection established to the server."
            showErrorModal.value = true
        }
    }

    navigateTo("/my-recipes")
}

function addIngredient() {
    ingredients.value.push({ name: ingredientName.value, amount: ingredientAmount.value, unit: ingredientUnit.value })
}

// render functions
function beforeLeave(el) {
    const { marginLeft, marginTop, width, height } = window.getComputedStyle(el)

    el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
    el.style.width = width
    el.style.height = height
}
</script>
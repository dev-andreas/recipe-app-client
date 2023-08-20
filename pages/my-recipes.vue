<template>
    <div class="flex flex-col items-center gap-2">
        <ModalPage title="Delete recipe?" v-model="showDeleteModal">
            <p class="mt-3">Are you sure you want to delete this recipe?</p>
            <div class="flex gap-2 mt-5">
                <button class="btn btn-primary self-start" @click="deleteRecipe(); showDeleteModal = false">Yes</button>
                <button class="btn btn-secondary self-start" @click="showDeleteModal = false">Cancel</button>
            </div>
        </ModalPage>
        <div v-if="recipes == null || recipes.length == 0" class="flex flex-col items-center gap-5">
            <p class="font-bold text-3xl text-center">No recipes exist.</p>
        </div>
        <div v-else class="flex flex-col items-center">
            <div class="flex flex-col w-80 gap-5">
                <h1 class="font-bold text-3xl text-center">My Recipes</h1>
                <TransitionGroup class="grid gap-2" name="list" tag="div" @before-leave="beforeLeave">
                    <div v-for="(recipe, index) in recipes" :key="recipe.id"
                        class="flex justify-between items-center bg-backg-300 p-1 rounded-xl">
                        <p class="ml-2">{{ recipe.name }}</p>
                        <div class="flex gap-2">
                            <NuxtLink :to="'/recipe/' + kebabCase(recipe.name) + '-' + recipe.id"
                                class="btn btn-primary p-2">
                                <SvgpathsMagnifyingGlassSvg class="w-4 h-4 stroke-zinc-900" />
                            </NuxtLink>
                            <NuxtLink :to="'/recipe/edit/' + recipe.id" class="btn btn-primary p-2">
                                <SvgpathsPencilSvg class="w-4 h-4 stroke-zinc-900" />
                            </NuxtLink>
                            <button @click="recipeToDelete = index; showDeleteModal = true;"
                                class="btn btn-danger rounded-xl p-2">
                                <SvgpathsTrashSvg class="w-4 h-4 stroke-zinc-900" />
                            </button>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
        <NuxtLink class="btn btn-secondary p-2" to="/recipe/edit/new"><SvgpathsPlusSvg class="w-4 h-4 stroke-black"/></NuxtLink>
    </div>
</template>

<script setup>

const recipes = ref(null)
const recipeToDelete = ref(null)

const showDeleteModal = ref(false)

function deleteRecipe() {
    recipes.value.splice(recipeToDelete.value, 1)
    localStorage.setItem("recipes", JSON.stringify(recipes.value))
}

onMounted(() => {
    const tempRecipes = JSON.parse(localStorage.getItem("recipes"))
    if (tempRecipes != null) {
        recipes.value = tempRecipes
    }
})

function kebabCase(text) {
    return text.toLowerCase().replace(/\s/g, "-")
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
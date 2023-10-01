<template>
    <div class="flex flex-col items-center justify-center gap-2">
        <img src="~/assets/images/leaf.svg" class="h-20 drop-shadow-flat-sm" alt="Recipes Logo">
        <h1 class="text-5xl font-medium">Recipes</h1>
        <h2 class="text-lg">Get new recipes suggested every day.</h2>
        <div class="flex gap-3 mt-1">
            <NuxtLink to="/login" class="btn btn-primary">Sign in</NuxtLink>
            <NuxtLink to="/register" class="btn btn-primary">Sign up</NuxtLink>
        </div>
    </div>
</template>

<script setup>
useAuthGuest()

onMounted(() => {
    recipeIndex.value = Math.floor(Math.random() * 5);
})

const type = ref("breakfast")

const recipeIndex = ref(0)

const currentRecipe = computed(() => {
    if (type.value == "breakfast") return breakfasts[recipeIndex.value]
    else if (type.value == "dinner") return dinners[recipeIndex.value]
    else if (type.value == "lunch") return lunchs[recipeIndex.value]
})

const breakfasts = reactive([
    "Shakshuka",
    "Fried potatoes",
    "Porridge with blueberries",
    "Scrambled eggs with potatoes",
    "Skyr bowl"
])

const dinners = reactive([
    "Potato wedges with avocado dip",
    "Red borscht",
    "Sweet potato salad",
    "Red lentil dal",
    "Chickpea wraps"
])

const lunchs = reactive([
    "Avocado sandwich",
    "Cheese sandwich",
    "Radicchio salad",
    "Bulgur & quinoa bowl",
    "Chia porridge"
])

function nextRecipe() {
    recipeIndex.value = recipeIndex.value + 1
    recipeIndex.value = recipeIndex.value % 5
}

function setType(newType) {
    if (newType == type.value) return
    nextRecipe()
    type.value = newType
}

const ingredients = ref([])
const type2 = ref("BREAKFAST")
const recipeName = ref("Shakshuka")
const ingredientName = ref("")
const ingredientAmount = ref("")
const ingredientUnit = ref("")

const showNewIngredientModal = ref(false)

function addIngredient() {
    ingredients.value.push({ name: ingredientName.value, amount: ingredientAmount.value, unit: ingredientUnit.value })
}

</script>
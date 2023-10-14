<template>
    <div class="flex flex-col items-center">
        <div class="flex flex-col w-80 gap-5">
            <h1 class="text-center text-3xl font-bold">Personal Information</h1>
            <form class="flex flex-col gap-5" @submit.prevent="submit()">
                <div class="flex flex-col gap-1">
                    <label for="first-name" class="font-bold">First Name:</label>
                    <input v-model="firstName" type="text" name="first-name" id="first-name" class="inpt">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="last-name" class="font-bold">Last Name:</label>
                    <input v-model="lastName" type="text" name="last-name" id="last-name" class="inpt">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="email" class="font-bold">E-Mail:</label>
                    <input v-model="email" type="text" name="email" id="email" class="inpt">
                </div>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-2">
                        <input type="submit" value="Save" class="self-start btn btn-primary">
                        <NuxtLink to="/profile" class="self-start btn btn-secondary">Cancel</NuxtLink>
                    </div>
                    <p v-if="response != ''" class="text-rose-600">{{ response }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
const { authStore } = useAuthRecipeUser()
const { changeProfile } = useProfile(authStore)

const firstName = ref(authStore.firstName)
const lastName = ref(authStore.lastName)
const oldEmail = ref(authStore.email)
const email = ref(authStore.email)
const response = ref("")

async function submit() {
    if (await changeProfile(firstName.value, lastName.value, email.value)) {
        if (email.value != oldEmail.value) {
            authStore.logout(false)
        } else {
            navigateTo("/profile")
        }
    } else {
        response.value = authStore.lastResponse.error
    }
}
</script>
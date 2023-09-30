<template>
    <div class="flex flex-col items-center">
        <h1 class="font-bold text-3xl text-center">Sign in</h1>
        <form method="POST" @submit.prevent="login" class="mt-10 flex flex-col gap-5 w-80">
            <div class="flex flex-col gap-1">
                <label for="email" class="font-bold">Email:</label>
                <input type="email" name="email" id="email" class="inpt" v-model="email">
            </div>
            <div class="flex flex-col gap-1">
                <label for="password" class="font-bold">Password:</label>
                <input type="password" name="password" id="password" class="inpt" v-model="password">
            </div>
            <input type="submit" value="Sign in" class="btn btn-primary self-start">
            <p v-if="errorMessage != null" class="text-rose-600">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
const { authStore } = useAuthGuest()

const email = ref("")
const password = ref("")
const errorMessage = ref("")

async function login() {
    if (email.value == "") {
        errorMessage.value = "Email must not be empty."
        return
    }

    if (password.value == "") {
        errorMessage.value = "Password must not be empty."
        return
    }

    if (await authStore.login(email.value, password.value)) {
        navigateTo("/home")
    } else {
        errorMessage.value = authStore.lastResponse.error
    }
}
</script>
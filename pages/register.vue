<template>
    <div class="flex flex-col items-center">
        <h1 class="font-bold text-3xl text-center">Sign up</h1>
        <form method="POST" @submit.prevent="register" class="mt-10 flex flex-col gap-5 w-80">
            <div class="flex flex-col gap-1">
                <label for="email" class="font-bold">Email:</label>
                <input type="email" name="email" id="email" class="inpt" v-model="email">
            </div>
            <div class="flex flex-col gap-1">
                <label for="firstName" class="font-bold">First Name:</label>
                <input type="text" name="firstName" id="firstName" class="inpt" v-model="firstName">
            </div>
            <div class="flex flex-col gap-1">
                <label for="lastName" class="font-bold">Last Name:</label>
                <input type="text" name="lastName" id="lastName" class="inpt" v-model="lastName">
            </div>
            <div class="flex flex-col gap-1">
                <label for="password" class="font-bold">Password:</label>
                <input type="password" name="password" id="password" class="inpt" v-model="password">
            </div>
            <div class="flex flex-col gap-1">
                <label for="repeat_password" class="font-bold">Repeat Password:</label>
                <input type="password" name="repeat_password" id="repeat_password" class="inpt" v-model="repeatPassword">
            </div>
            <input type="submit" value="Sign up" class="btn btn-primary self-start">
            <p v-if="errorMessage != null" class="text-rose-600">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script setup>
const { authStore } = useAuthGuest()

const email = ref("")
const firstName = ref("")
const lastName = ref("")
const password = ref("")
const repeatPassword = ref("")
const errorMessage = ref("")

async function register() {
    if (email.value == "") {
        errorMessage.value = "Email must not be empty."
        return
    }

    if (firstName.value == "") {
        errorMessage.value = "First name must not be empty."
        return
    }

    if (lastName.value == "") {
        errorMessage.value = "Last must not be empty."
        return
    }

    if (password.value == "") {
        errorMessage.value = "Password must not be empty."
        return
    }

    if (password.value != repeatPassword.value) {
        errorMessage.value = "Passwords do not match."
        return
    }

    if (await authStore.register(email.value, firstName.value, lastName.value, password.value)) {
        navigateTo("/register-success")
    } else {
        errorMessage.value = authStore.lastResponse.error
    }
}
</script>
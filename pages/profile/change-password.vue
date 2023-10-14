<template>
    <div class="flex flex-col items-center">
        <div class="flex flex-col w-80 gap-5">
            <h1 class="text-center text-3xl font-bold">Change Password</h1>
            <form class="flex flex-col gap-5" @submit.prevent="submit">
                <div class="flex flex-col gap-1">
                    <label for="old-passwd" class="font-bold">Current Password:</label>
                    <input v-model="oldPassword" type="password" name="old-passwd" id="old-passwd" class="inpt">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="new-passwd" class="font-bold">New Password:</label>
                    <input v-model="newPassword" type="password" name="new-passwd" id="new-passwd" class="inpt">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="new-passwd2" class="font-bold">Repeat new Password:</label>
                    <input v-model="newPassword2" type="password" name="new-passwd2" id="new-passwd2" class="inpt">
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
const { changePassword } = useProfile(authStore)

const oldPassword = ref("");
const newPassword = ref("");
const newPassword2 = ref("");
const response = ref("")

async function submit() {
    if (newPassword.value == "") {
        response.value = "Password must not be empty."
        return
    }

    if (newPassword.value != newPassword2.value) {
        response.value = "Passwords do not match."
        return
    }

    if (await changePassword(oldPassword.value, newPassword.value)) {
        navigateTo("/profile")
        console.log("ok")
    } else {
        console.log("nok")
        response.value = authStore.lastResponse.error
    }
}
</script>
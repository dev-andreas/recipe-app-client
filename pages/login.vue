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
            <div class="flex items-center gap-3">
                <input type="submit" value="Sign in" class="btn btn-primary self-start">
            </div>  
        </form>
    </div>
</template>

<script setup>
    const email = ref("")
    const password = ref("")


    async function login() {
        console.log(email.value, password.value)
    }
</script>
<template>
    <div class="flex flex-col items-center">
        <div class="flex flex-col w-80 gap-5">
            <h1 class="text-center text-3xl font-bold">Profile Settings</h1>
            <div class="flex justify-between items-center bg-backg-300 p-1 rounded-xl">
                <p class="ml-2">Personal Information</p>
                <NuxtLink to="/profile/personal-info" class="btn btn-primary p-2">
                    <SvgpathsPencilSvg class="w-4 h-4 stroke-zinc-900"></SvgpathsPencilSvg>
                </NuxtLink>
            </div>
            <div class="flex justify-between items-center bg-backg-300 p-1 rounded-xl">
                <p class="ml-2">Change Password</p>
                <NuxtLink to="/profile/change-password" class="btn btn-primary p-2">
                    <SvgpathsPencilSvg class="w-4 h-4 stroke-zinc-900"></SvgpathsPencilSvg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped></style>
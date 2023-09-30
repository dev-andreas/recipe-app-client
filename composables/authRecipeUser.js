import { useAuthStore } from "~/stores/auth.js"

export const useAuthRecipeUser = () => {
    const authStore = useAuthStore()

    onMounted(() => {
        if (!authStore.loggedIn) {
            navigateTo("/login", { replace: true })
        }
    })

    return { authStore }
}
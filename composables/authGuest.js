import { useAuthStore } from "~/stores/auth.js"

export const useAuthGuest = () => {
    const authStore = useAuthStore()

    onMounted(() => {
        if (authStore.loggedIn) {
            navigateTo("/home", { replace: true })
        }
    })

    return { authStore }
}
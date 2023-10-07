import { defineStore } from "pinia"
import { useRuntimeConfig } from "nuxt/app"
import { useRecipeStore } from "~/stores/recipe.js"

export const useAuthStore = defineStore("auth", () => {
    const runtimeConfig = useRuntimeConfig()
    const recipeStore = useRecipeStore()

    const accessTokenValue = ref("")
    const accessToken = computed({
        get: () => accessTokenValue.value,
        set: (value) => {
            accessTokenValue.value = value
            localStorage.setItem("accessToken", value)
        },
    })

    const refreshTokenValue = ref("")
    const refreshToken = computed({
        get: () => refreshTokenValue.value,
        set: (value) => {
            refreshTokenValue.value = value
            localStorage.setItem("refreshToken", value)
        },
    })

    const firstNameValue = ref("")
    const firstName = computed({
        get: () => firstNameValue.value,
        set: (value) => {
            firstNameValue.value = value
            localStorage.setItem("firstName", value)
        }
    })

    const lastNameValue = ref("")
    const lastName = computed({
        get: () => lastNameValue.value,
        set: (value) => {
            lastNameValue.value = value
            localStorage.setItem("lastName", value)
        }
    })

    const emailValue = ref("")
    const email = computed({
        get: () => emailValue.value,
        set: (value) => {
            emailValue.value = value
            localStorage.setItem("email", value)
        }
    })

    const loggedIn = computed(() => {
        return refreshToken.value != ""
    })

    const lastResponse = ref(null)

    async function login(loginEmail, loginPassword) {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}auth/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            })
            lastResponse.value = await rawResponse.json()
            if (rawResponse.ok) {
                accessToken.value = lastResponse.value.accessToken
                refreshToken.value = lastResponse.value.refreshToken
                firstName.value = lastResponse.value.firstName
                lastName.value = lastResponse.value.lastName
                email.value = lastResponse.value.email
                return true
            }
        } catch (e) {
            console.log(e)
            lastResponse.value = null
        }
        return false
    }

    async function logout() {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}auth/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken.value
                }
            })
        } catch (e) {
            console.log(e)
        }
        lastResponse.value = null
        accessToken.value = ""
        refreshToken.value = ""
        firstName.value = ""
        lastName.value = ""
        email.value = ""
        recipeStore.recipes = []
        navigateTo("/login")
    }

    async function refresh() {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}auth/refresh`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + refreshToken.value
                }
            })
            lastResponse.value = null
            if (rawResponse.ok) {
                const jsonResponse = await rawResponse.json()
                accessToken.value = jsonResponse.accessToken
                return true
            }
        } catch (e) {
            console.log(e)
            lastResponse.value = null
        }
        return false
    }

    async function send(url, method, payload, retry = true) {
        if (!loggedIn.value) {
            return false
        }

        try {
            const options = {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken.value
                }
            }
            if (payload) {
                options.body = JSON.stringify(payload)
            }
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}${url}`, options)
            lastResponse.value = await rawResponse.json()
            if (rawResponse.ok) { // response ok
                return true
            } else if (rawResponse.status == 401 && retry && await refresh() && await send(url, method, payload, false)) { // access token invalid
                console.log("refreshing token")
                return true
            } else if (rawResponse.status == 401) { // refresh did not work, logout
                console.log("refresh token expired: " + rawResponse.status)
                logout()
                return false
            } else {                                // request does not work
                console.log(lastResponse.value)
                return false
            }
        } catch (e) {
            console.log(e)
            lastResponse.value = null
        }
        return false
    }

    async function register(
        registerEmail,
        registerFirstName,
        registerLastName,
        password
    ) {
        try {
            const rawResponse = await fetch(`${runtimeConfig.public.apiUrl}auth/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: registerEmail,
                    firstName: registerFirstName,
                    lastName: registerLastName,
                    password: password
                })
            })
            if (rawResponse.ok) {
                lastResponse.value = null
                return true
            } else {
                lastResponse.value = await rawResponse.json()
            }
        } catch (e) {
            console.log(e)
            lastResponse.value = null
        }
        return false
    }

    return { accessToken, refreshToken, firstName, lastName, email, lastResponse, loggedIn, login, logout, register, send }
})
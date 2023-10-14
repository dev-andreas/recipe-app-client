export const useProfile = (authStore) => {

    async function changeProfile(firstName, lastName, email) {
        const ok = await authStore.send("profile/edit", "POST", {
            firstName: firstName,
            lastName: lastName,
            email: email
        })

        if (ok) {
            authStore.firstName = firstName
            authStore.lastName = lastName
            authStore.email = email
        }

        return ok
    }

    async function changePassword(oldPassword, newPassword) {
        return await authStore.send("profile/change-password", "POST", {
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    }

    return { changeProfile, changePassword }
}
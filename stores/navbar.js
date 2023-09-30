import { defineStore } from "pinia"

export const useNavbarStore = defineStore("navbar", {
    state: () => {
        return {
            showIcon: false,
            pathsAuth: [
                {
                    name: "Home",
                    route: "/home",
                    jump: false,
                },
                {
                    name: "My Recipes",
                    route: "/my-recipes",
                    jump: false,
                }
            ],
            pathsGuest: []
        };
    }
})

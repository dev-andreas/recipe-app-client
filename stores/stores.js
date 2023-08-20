import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", {
    state: () => {
        return {
            showIcon: false,
            paths: [
                {
                    name: "Home",
                    route: "/",
                    jump: false,
                },
                {
                    name: "My Recipes",
                    route: "/my-recipes",
                    jump: false,
                },
            ]
        };
    }
});

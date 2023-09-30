// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Recipe App',
            meta: [
                { name: 'description', content: 'Store your recipes.' }
            ],
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    routeRules: {
        '/home': { ssr: false },
        '/my-recipes': { ssr: false },
        '/random': { ssr: false }, 
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ["~/assets/css/style.css"],
    runtimeConfig: {
        public: {
            apiUrl: "http://localhost:8080/api/v1/"
        }
    }
})
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
        pageTransition: {
            name: 'slide-bottom',
            mode: 'out-in',
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    css: ["~/assets/css/style.css"],
    runtimeConfig: {
        public: {
            apiUrl: "http://localhost:8080/"
        }
    }
})
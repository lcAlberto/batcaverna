// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
      head: {
          link: [
              { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css' }
          ],
          meta: [
              { charset: 'utf-8' },
              { 'data-theme': 'light' },
          ]
      }
  },
  modules: [
      '@nuxtjs/eslint-module',
      '@nuxtjs/tailwindcss',
  ],
})

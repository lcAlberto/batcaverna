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
  runtimeConfig: {
      // apiSecret: '',
      public: {
          apiSecret: '',
          apiBase: ''
      }
    },
  modules: [
      '@nuxtjs/eslint-module',
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt'
  ],
    plugins: [
        // '~/plugins/apiClient.ts',
    ],
})

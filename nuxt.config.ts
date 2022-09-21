// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    notionApiKey: process.env.NOTION_INTEGRATIONS_API_KEY,
    notionDbId: process.env.NOTION_DB_ONE,
  },
});

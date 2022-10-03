<template>
  <div class="app">
    <div v-for="item in notionData" :key="item.id" class="card">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>{{ item.status }}</p>
      <p>{{ item.date }}</p>
      <a
        :href="`https://api.notion.com/v1/oauth/authorize?client_id=d079788a-33a0-4022-bcd1-9becf52341af&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%2Fnotion%2Fcallback&response_type=code`"
        >Add to Notion</a
      >
    </div>
    <button @click="onPostData">Send</button>
  </div>
</template>

<script setup lang="ts">
import { Client } from "@notionhq/client";
const config = useRuntimeConfig();
const notion = new Client({ auth: config.notionApiKey });

let notionData = ref([]);

onMounted(async () => {
  const res = await $fetch("/api/notion");
  notionData.value = res;
});

const onPostData = async () => {
  await $fetch("/api/notion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.notionApiKey}`,
      "Notion-Version": "2022-02-22",
    },
    body: {
      description: "Questa è una descrizione",
      id: "2322",
      Date: "2022-09-21",
      status: "online",
      name: "il nome",
    },
  });
};
</script>

<style>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  height: 100vh;
}

.card {
  padding: 8px 16px;
  width: 140px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.34);
  border-radius: 6px;
}
</style>

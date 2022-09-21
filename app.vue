<template>
  <div class="app">
    <div v-for="item in notionData" :key="item.id" class="card">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
      <p>{{ item.status }}</p>
      <p>{{ item.date }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
let notionData = ref([]);

onMounted(async () => {
  const res = await $fetch("/api/notion");
  notionData.value = res;
});
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

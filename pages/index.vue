<template>
  <div class="flex flex-row p-5">
    <div class="grid grid-cols-3 gap-4 w-full">
      <card-metrics />
      <card-metrics />
      <card-metrics />
    </div>
  </div>
</template>
<script setup lang="ts">
// definePageMeta({
//   layout: 'default'
// })
import CardMetrics from "~/components/Home/CardMetrics.vue";
</script>
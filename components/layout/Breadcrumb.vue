<template>
  <div>
    <div class="text-xs breadcrumbs">
      <ul>
        <nuxt-link
          v-for="(item, index) in pages"
          :key="index"
          class="cursor-pointer"
          :to="`/${item.original}`"
        >
          <div>
            <i :class="item.icon" />
            <span class="ml-2">{{ item.translate }}</span>
          </div>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import {translate} from "~/lang/br/Breadcrumb";
import { computed } from 'vue'

const route = useRoute()

const pages = computed(() => {
  let routeList = route.path.split('/')
  if (route.path !== '/home')
    routeList[0] = 'home'
  return routeList.map(page => translate(page))
})
</script>

<style scoped>
li {
  user-select: none;
}
</style>
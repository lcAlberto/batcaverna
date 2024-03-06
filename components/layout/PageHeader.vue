<template>
  <div class="flex justify-between">
    <div class="flex items-center gap-4">
      <nuxt-link
        :to="redirectBack"
        class="btn btn-xs btn-ghost btn-circle"
      >
        <i class="fa fa-arrow-left" />
      </nuxt-link>
      <div>
        <h2 class="card-title">{{ title }}</h2>
        <span class="text-sm m-0">{{ subtitle }}</span>
      </div>
    </div>
    <slot name="end"/>
  </div>
  <div class="divider m-0" />
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PageHeader",
  props: {
    title: { type: String, default: null },
    subtitle: { type: String, default: null },
    redirectBack: { type: String, default: '/home' }
  }
})
</script>


<style scoped>

</style>
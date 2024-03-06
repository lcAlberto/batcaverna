<template>
  <div>
    <nuxt-link
      to="back"
      class="btn btn-ghost rounded-full"
    />
    <div class="text-sm breadcrumbs">
      <ul>
        <li
          v-for="(item, index) in pages"
          :key="index"
          class="cursor-pointer"
        >
          <div>
            <i :class="item.icon" />
            <span class="ml-2">{{ item.translate }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {translate} from "~/lang/br/Breadcrumb";

export default {
  data() {
    return {
      //
    }
  },

  computed: {
    pages() {
      const route = this.$route.path.split('/')
      route[0] = 'home'
      return route.map(page => translate(page))
    }
  }
}
</script>

<style scoped>
li {
  user-select: none;
}
</style>
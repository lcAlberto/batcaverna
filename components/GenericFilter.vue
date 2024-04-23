<template >
  <div class="flex flex-row gap-4 items-center">
    <label class="input input-bordered flex items-center gap-2">
      <input v-model="search" class="grow" placeholder="Search" type="text" @input="emit('search', $event.target.value)" />
      <i class="fa fa-search" />
    </label>
  </div>
</template >

<script lang="ts" setup>
import {useRouteQuery} from "@vueuse/router";

const emit = defineEmits(['search'])
const search = useRouteQuery('search')
</script >

<style scoped>

</style >
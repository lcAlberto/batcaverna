<template >
  <div class="flex flex-row gap-4 items-center">
    <label v-if="props.availableFilters.includes('search')" class="input input-bordered flex items-center gap-2">
      <input v-model="search" class="grow" placeholder="Search" type="text" />
      <i class="fa fa-search" />
    </label>
    <main-select
      v-if="props.availableFilters.includes('gender')"
      :items="[
        { value: 'male', label: 'Masculino' },
        { value: 'female', label: 'Femnino' },
        { value: 'other', label: 'Outro (Alien)' },
      ]"
      @selected="(payload:object) => gender = payload.value"
    />
  </div>
</template >

<script lang="ts" setup>
import {useRouteQuery} from "@vueuse/router";
import MainSelect from "~/components/layout/forms/main-select.vue";

const props = defineProps({
  availableFilters: {type: Array, default: () => []}
})

const search = useRouteQuery('search')
const gender = useRouteQuery('gender')
</script >

<style scoped>

</style >
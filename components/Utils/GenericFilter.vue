<template >
  <div class="flex flex-row gap-4 items-center">
    <IconField v-if="props.availableFilters.includes('search')">
      <InputIcon class="fa fa-search" />
      <InputText v-model="search" placeholder="Search" />
    </IconField>
    <FloatLabel v-if="props.availableFilters.includes('gender')" class="w-full md:w-56">
      <Select v-model="gender" :options="[
        { code: 'male', name: 'Masculino' },
        { code: 'female', name: 'Femnino' },
        { code: 'other', name: 'Outro (Alien)' },
      ]" checkmark class="w-full" inputId="code" optionLabel="name" optionValue="code" showClear />
      <label for="dd-city">Sexo</label>
    </FloatLabel>
  </div>
</template >

<script lang="ts" setup>
import {useRouteQuery} from "@vueuse/router";

const props = defineProps({
  availableFilters: {type: Array, default: () => []}
})

const search = useRouteQuery('search')
const gender = useRouteQuery('gender')
</script >

<style scoped>

</style >
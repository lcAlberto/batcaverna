<template>
  <div class="card-body">
    <page-header
      redirect-back="/home"
      subtitle="Todos os herois"
      title="Heróis"
    >
      <template #end>
        <nuxt-link
          class="btn btn-sm btn-primary"
          to="heroes/new"
        >
          <i class="fa fa-plus" />
          Novo
        </nuxt-link>
      </template>
    </page-header>

    <div class="flex flex-col py-2">
      <div class="flex items-start gap-4 w-full">
        <generic-filter @search="(search) => params.search = search"/>
        <main-select
          :items="availableSexOptions"
          @update="(payload:object) => params.sex = payload.value"
        />
      </div>
      <div class="py-5">
        <div v-if="pending" class="w-full flex justify-center items-center">
          <div class="grid grid-cols-2 w-full gap-4">
            <div v-for="i in 6" :key="i" class="skeleton w-72 h-72"></div>
          </div>
        </div>
        <div v-else-if="heroes && heroes.length > 0">
          <div class="grid grid-cols-2 w-full gap-4">
            <CardHeroItem
              v-for="(hero, index) in heroes"
              :id="hero.id"
              :key="index"
              :hero="hero"
            />
          </div>
        </div>
        <div v-else class="flex items-center justify-center min-h-96">
          Nenhum Herói cadastrado
          <img
            alt="sdjh"
            class="w-32"
            src="@/assets/empty-state.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PageHeader from "~/components/layout/PageHeader.vue";
import CardHeroItem from "~/components/Heroes/CardHeroItem.vue";
import {useHeroStore} from '~/store/hero/heroStore';
import GenericFilter from "~/components/GenericFilter.vue";
import MainSelect from "~/components/layout/forms/main-select.vue";

const store = useHeroStore()

const heroes = store.getHeroes
const pending = store.getLoading
const availableSexOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femnino' },
  { value: 'other', label: 'Outro (Alien)' },
]
const params:Ref<RequestParams> = ref({
  search: '',
  sex: ''
})

store.fetchHeroes(params)

watch((params.value), (val) => {
  store.fetchHeroes(val)
})


interface RequestParams {
  search: null|string,
  sex: null|string
}
</script>


<style scoped>

</style>
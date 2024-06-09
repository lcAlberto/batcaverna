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
        <generic-filter
          :availableFilters="['search', 'gender']"
        />
      </div>
      <div class="py-5">
        <div v-if="pending" class="w-full flex justify-center items-center">
          <div class="grid grid-cols-2 w-full gap-4">
            <div v-for="i in 6" :key="i" class="skeleton w-100 h-72"></div>
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
import {watch} from 'vue';
import {useHeroStore} from '~/store/hero/heroStore';
import {useRoute} from 'vue-router';
import PageHeader from "~/components/layout/PageHeader.vue";
import CardHeroItem from "~/components/Heroes/CardHeroItem.vue";
import GenericFilter from "~/components/Utils/GenericFilter.vue";

const store = useHeroStore()
const heroes = ref(store.getHeroes)
const pending = ref(store.getLoading)
const route = useRoute();
const params:Ref<RequestParams> = ref({
  search: 'aaaa',
  sex: ''
})

onBeforeMount(() => {
  store.fetchHeroes(params.value)
})

watch(() => route.query, async (newQuery) => {
  await store.fetchHeroes(newQuery);
}, { deep: true })

interface RequestParams {
  search: null|string,
  sex: null|string
}
</script>


<style scoped>

</style>
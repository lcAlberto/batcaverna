<template>
  <div class="card-body">
    <div class="flex flex-col py-2">
      <div class="flex justify-between">
        <div class="flex items-start gap-4">
          <generic-filter
            :availableFilters="['search', 'gender']"
          />
        </div>
        <Button
          type="button"
          label="Novo"
          icon="fa fa-plus"
          @click="router.push('heroes/new')"
        />
      </div>
      <div class="py-5">
        <div
          v-if="pending"
          class="w-full flex justify-center items-center"
        >
          <div class="grid lg:grid-cols-3 w-full gap-4">
            <Skeleton
              v-for="i in 6"
              :key="i"
              height="25rem"
              width="25rem"
            ></Skeleton>
          </div>
        </div>
        <div v-else-if="heroes && heroes.length > 0">
          <div class="grid lg:grid-cols-3 w-full gap-4">
            <CardHeroItem
              v-for="(hero, index) in heroes"
              :id="hero.id"
              :key="index"
              :hero="hero"
            />
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center min-h-96"
        >
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
<script
    lang="ts"
    setup
>
import {ref, watch} from 'vue';
import {useHeroStore} from '~/store/hero/heroStore';
import {useRoute, useRouter} from 'vue-router';
import CardHeroItem from "~/components/Heroes/CardHeroItem.vue";
import GenericFilter from "~/components/Utils/GenericFilter.vue";

const route = useRoute();
const router = useRouter();
const store = useHeroStore()
const heroes = ref(null)
const pending = ref(store.getLoading)
const params: Ref<RequestParams> = ref({search: '', sex: ''})

onBeforeMount(() => {
  store.fetchHeroes(params.value).then(() => {
    heroes.value = store.getHeroes
  })
})

watch(() => route.query, async (newQuery) => {
  await store.fetchHeroes(newQuery);
}, {deep: true})

interface RequestParams {
  search: null | string,
  sex: null | string
}
</script>


<style scoped>

</style>
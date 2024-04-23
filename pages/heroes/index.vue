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
      <div>
        <!--        // barra de filtros-->
      </div>
      <div>
        <div v-if="pending" class="w-full flex justify-center items-center">
          <!--          <span class="loading loading-infinity loading-lg"></span>-->
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
        <div v-else>
          Nenhum Herói cadastrado
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PageHeader from "~/components/layout/PageHeader.vue";
import CardHeroItem from "~/components/Heroes/CardHeroItem.vue";
import {useHeroStore} from '~/store/hero/heroStore';

const store = useHeroStore()

store.fetchHeroes()
const heroes = store.getHeroes
const pending = store.getLoading
// const errors = store.getErrors
// const pagination = store.getPagination

</script>


<style scoped>

</style>
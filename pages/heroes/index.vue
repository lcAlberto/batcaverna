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
        <div v-if="pending">
          <p>Loading</p>
        </div>
        <div v-else>
          <div
            v-if="data.data.data"
            class="grid grid-cols-2 w-full gap-4"
          >
            <CardHeroItem
              v-for="(hero, index) in data.data.data"
              :id="hero.id"
              :key="index"
              :hero="hero"
            />
          </div>
          <div v-else>
            Nenhum Herói cadastrado
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import CardHeroItem from "~/components/Heroes/CardHeroItem.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

const config = useRuntimeConfig()

const { data, pending } = await useFetch(`${config.public.apiBase}characters`, {
  onRequest({options}) {
    options.headers = {
      Authorization: `Bearer ${config.public.apiSecret}`
    }
  },
})
</script>


<style scoped>

</style>
<template>
  <div class="card-body">
    <page-header
      title="Super Equipes"
      subtitle="Juntos somos mais fortes"
      redirect-back="/home"
    >
      <template #end>
        <nuxt-link
          to="teams/new"
          class="btn btn-sm btn-primary"
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
        <div class="">
          <div v-if="data.teams.data" class="grid grid-cols-2 w-full gap-4">
            <team-item
              v-for="(team, index) in data.teams.data"
              :key="index"
              :id="team.id"
              :team="team" />
          </div>
          <div v-else>
            Nenhum Time cadastrado
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageHeader from "~/components/layout/PageHeader.vue";
import TeamItem from "~/components/Teams/TeamItem.vue";
const config = useRuntimeConfig()

const { data } = await useFetch(`${config.public.apiBase}teams`, {
  onRequest({options}) {
    options.headers = {
      Authorization: `Bearer ${config.public.apiSecret}`
    }
  }
})
</script>


<style scoped>

</style>
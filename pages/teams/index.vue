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
          <div v-if="teams" class="grid grid-cols-2 w-full gap-4">
            <team-item
              v-for="(team, index) in teams"
              :key="index"
              :id="team.id"
              :team="team.attributes" />
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

const isLoading = ref(false);
const error = ref('');
const teams = ref([]);

onMounted(async () => {
  isLoading.value = true;
  error.value = '';
  teams.value = null;
    await useFetch(`${config.public.apiBase}teams`, {
      onRequest({ options }) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
    }).then((response) => {
      if (response.data._value)
        teams.value = response.data._value.data
      console.log(teams.value);
    }).catch((error) => console.error(error))

  isLoading.value = false;
})
</script>


<style scoped>

</style>
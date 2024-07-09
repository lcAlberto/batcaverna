<template>
  <div class="card-body">
    <div class="flex flex-col py-2">
      <div class="flex justify-end">
        <Button
          type="button"
          label="Novo"
          icon="fa fa-plus"
          @click="router.push('teams/new')"
        />
      </div>
      <div class="py-5">
        <div
          v-if="data.teams.data"
          class="grid grid-cols-2 w-full gap-4"
        >
          <team-item
            v-for="(team, index) in data.teams.data"
            :key="index"
            :id="team.id"
            :team="team"
          />
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
    setup
    lang="ts"
>
import TeamItem from "~/components/Teams/TeamItem.vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig()

const {data} = await useFetch(`${config.public.apiBase}teams`, {
  onRequest({options}) {
    options.headers = {
      Authorization: `Bearer ${config.public.apiSecret}`
    }
  }
})
</script>


<style scoped>

</style>
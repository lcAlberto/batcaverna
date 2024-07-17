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
          v-if="teams"
          class="grid grid-cols-2 w-full gap-4"
        >
          <team-item
            v-for="(team, index) in teams"
            :key="index"
            :id="team.id"
            :team="team"
          />
        </div>
        <div
          v-else
          class="flex items-center justify-center min-h-96"
        >
          Nenhuma equipe cadastrada
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
import {useRouter} from "vue-router";
import {useTeamStore} from "~/store/team/teamStore";

const router = useRouter();
const store = useTeamStore();

const teams = ref(null)

onMounted(async () => await store.fetchTeams().then(() => teams.value = store.getTeams))
</script>


<style scoped>

</style>
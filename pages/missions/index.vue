<template>
  <div class="card-body">
    <div class="flex flex-col py-2">
      <div class="flex justify-end">
        <Button
          type="button"
          label="Novo"
          icon="fa fa-plus"
          @click="router.push('missions/new')"
        />
      </div>
      <div class="py-5">
        <div
          v-if="pending"
          class="w-full flex justify-center items-center"
        >
          <div class="grid grid-cols-3 w-full gap-4">
            <Skeleton
              v-for="i in 6"
              :key="i"
              height="25rem"
              width="25rem"
            ></Skeleton>
          </div>
        </div>
        <div
          v-else-if="missions && missions.length > 0"
          class="grid lg:grid-cols-3 w-full gap-4"
        >
          {{ missions }}
          <!--          <team-item-->
          <!--            v-for="(team, index) in missions"-->
          <!--            :key="index"-->
          <!--            :id="team.id"-->
          <!--            :team="team"-->
          <!--          />-->
        </div>
        <div
          v-else
          class="flex items-center justify-center min-h-96"
        >
          Nenhuma missão cadastrada
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
// import TeamItem from "~/components/Teams/TeamItem.vue";
import {useRouter} from "vue-router";
import {useMissionStore} from "~/store/mission/missionStore";

const router = useRouter();
const store = useMissionStore();

const missions = ref(null)
const pending = ref(true)

onMounted(async () => await store.fetchMissions().then(() => {
  missions.value = store.getMissions
  pending.value = store.getLoading
}))
</script>


<style scoped>

</style>
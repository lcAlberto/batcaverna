<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="max-h-52">
      <img
        :src="`${team.image}`"
        alt="Shoes"
        class="w-full"
      />
    </figure>
    <div class="card-body items-stretch overflow-clip">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title uppercase">{{ team.name || 'sem nome' }}</h2>
          <ul class="text-wrap">
            <!--            <li>-->
            <!--              <span>MEMBROS: {{ team.age }} Anos</span>-->
            <!--            </li>-->
            <li>
              Local:
              <span class="font-bold">{{ team.location }}</span>
            </li>
          </ul>
        </div>
        <div class="">
          <nuxt-link
            :to="`teams/${id}`"
            class="btn btn-ghost"
          >
            <i class="fa fa-share" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>

import type {Team} from "~/types/Team";

defineProps<{
  team: Team
  id: number
}>()
</script>


<style scoped>

</style>
<template>
  <Card class="overflow-hidden shadow-xl">
    <template #header>
      <figure class="h-52 overflow-hidden">
        <img
          v-if="props.team?.avatar"
          :src="props.team.avatar"
          alt="tea-image"
          class="w-full h-max-52"
        />
        <img
          v-else
          alt="Shoes"
          class="w-1/2"
          src="@/assets/female_superhero.png"
        />
      </figure>
    </template>
    <template #content>
      <div class="items-stretch overflow-clip">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="card-title uppercase">{{ props.team.name || 'Equipe sem nome' }}</h2>
            <ul class="text-wrap">
              <li>
                Local:
                <span class="font-bold">{{ props.team.location || 'Localização desconhecida' }}</span>
              </li>
            </ul>
          </div>
          <div class="">
            <nuxt-link
              :to="`teams/${id}`"
              class="btn btn-ghost"
            >
              <i class="fa fa-share"/>
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
<script
    lang="ts"
    setup
>
const props = defineProps({
  team: {type: Object, default: null},
  id: {type: Number, default: null}
})
</script>


<style scoped>

</style>
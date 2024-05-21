<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="max-h-52">
      <img
        v-if="hero?.avatar"
        :src="hero.avatar"
        alt="Shoes"
        class="w-full"
      />
      <img
        v-else
        alt="Shoes"
        class="w-1/2"
        src="@/assets/female_superhero.png"
      />
    </figure>
    <div class="card-body items-stretch overflow-clip">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title uppercase">{{ prop.hero.codename }}</h2>
          <ul class="text-wrap">
            <li>
              <span class="font-bold uppercase">{{ prop.hero.name }}</span>
            </li>
            <li>
              <span>{{ prop.hero.age }} Anos</span>
            </li>
            <li>
              Planeta original:
              <span class="font-bold">{{ prop.hero.planet }}</span>
            </li>
          </ul>
        </div>
        <div class="">
          <nuxt-link
            :to="`heroes/${prop.id}`"
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

// import type {Person} from "~/types";

const prop = defineProps({
  hero: {type: Object, default: null},
  id: {type: Number, default: null},
})
</script>


<style scoped>

</style>
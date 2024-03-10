<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="max-h-52">
      <img
        :src="`${hero.avatar}`"
        alt="Shoes"
        class="w-full"
      />
    </figure>
    <div class="card-body items-stretch overflow-clip">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="card-title uppercase">{{ hero.codename }}</h2>
          <ul class="text-wrap">
            <li>
              <span class="font-bold uppercase">{{ hero.name }}</span>
            </li>
            <li>
              <span>{{ hero.age }} Anos</span>
            </li>
            <li>
              Planeta original:
              <span class="font-bold">{{ hero.planet }}</span>
            </li>
          </ul>
        </div>
        <div class="">
          <nuxt-link
            :to="`heroes/${id}`"
            class="btn btn-ghost"
          >
            <i class="fa fa-share" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Person {
  id: number,
  name: string,
  createdAt: number,
  avatar: string,
  codename: string,
  city: string,
  "main-power": string,
  age: number,
  planet: string,
  weakness: string,
  affiliate: string,
  pair: string,
  "main-color": string
}

defineProps<{
  hero:Person
  id: number
}>()
</script>


<style scoped>

</style>
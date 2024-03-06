<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="max-h-52">
      <img
        :src="hero.avatar"
        alt="Shoes"
        class="w-full"
      />
    </figure>
    <div class="card-body items-stretch overflow-clip">
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
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Acessar</button>
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
}>()
</script>


<style scoped>

</style>
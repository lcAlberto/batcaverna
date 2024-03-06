<template>
  <div class="card-body">
    <div class="flex justify-between">
      <div>
        <h2 class="card-title">Heróis</h2>
        <span class="text-sm m-0">Todos os heróis</span>
      </div>
      <nuxt-link
        to="/heroes/new"
        class="btn btn-sm btn-primary"
      >
        <i class="fa fa-plus" />
        Novo
      </nuxt-link>
    </div>
    <div class="divider m-0" />

    <div class="flex flex-col py-2">
      <div>
        <!--        // barra de filtros-->
      </div>
      <div>
        <div class="">
          <div v-if="heroes" class="grid grid-cols-3 w-full gap-4">
            <CardHeroItem
              v-for="(hero, index) in heroes"
              :key="index"
              :hero="hero"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CardHeroItem from "~/components/Home/CardHeroItem.vue";
import type {Person} from "~/types";

export default {
  components: {CardHeroItem},
  data() {
    return {
      heroes: <Person[]>([]),
      // const heroes = ref<Person[]>([]);
      // let addNewMember = ref()
      // const modal = ref<InstanceType<typeof NewHeroModal> | null>(null)
      addNewMember: false
    }
  },
  created() {
    this.fetchHeroes()
  },
  methods: {
    async fetchHeroes () {
      const baseUrl = 'https://65ad966badbd5aa31be0ff48.mockapi.io/person' // import.meta.env.VUE_APP_BASE_URL
      await useFetch(`${baseUrl}/`, {
        'Content-Type': 'Application/json',
        per_page: 15
      }).then((response) => {
        if (response.status)
          this.heroes = response.data._value
      }).catch((error) => console.log(error))
    }
  }
}
</script>


<style scoped>

</style>
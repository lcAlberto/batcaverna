<template>
  <div class="card-body">
    <page-header
      title="Heróis"
      subtitle="Todos os herois"
      redirect-back="/home"
    >
      <template #end>
        <nuxt-link
          to="heroes/new"
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
          <div v-if="heroes" class="grid grid-cols-2 w-full gap-4">
            <CardHeroItem
              v-for="(hero, index) in heroes"
              :key="index"
              :hero="hero.attributes"
              :id="hero.id"
            />
          </div>
          <div v-else>
            Nenhum Herói cadastrado
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardHeroItem from "~/components/Home/CardHeroItem.vue";
import PageHeader from "~/components/layout/PageHeader.vue";
const config = useRuntimeConfig()

const isLoading = ref(false);
const error = ref('');
const heroes = ref([]);

onMounted(async () => {
  isLoading.value = true;
  error.value = '';
  heroes.value = null;
    await useFetch(`${config.public.apiBase}heroes`, {
      onRequest({ options }) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
    }).then((response) => {
      if (response.data._value)
        heroes.value = response.data._value.data
    }).catch((error) => console.error(error))

  isLoading.value = false;
})
</script>


<style scoped>

</style>
<template>
  <div class="card-body">
    <page-header
      redirect-back="/heroes"
      subtitle="Todos os herois"
      title="Heróis"
    />
    <hero-form @update="(event) => formData = event" />
    <div class="card-actions justify-center">
      <button
        class="btn btn-primary"
        type="button"
        @click="submitHero()"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useHeroStore} from '~/store/hero/heroStore';
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

const store = useHeroStore()

const formData = ref({})

function submitHero():void {
  store.newHeroes(formData.value)
}

</script>


<style scoped>

</style>
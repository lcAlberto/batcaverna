<template>
  <div class="card-body">
    <page-header
      redirect-back="/heroes"
      subtitle="Todos os herois"
      title="Heróis"
    />
    <form enctype="multipart/form-data" @submit.prevent="submitHero">
      <hero-form :errors="errors" @update="(event) => formData = event" />
      <div class="card-actions justify-center">
        <button
          class="btn btn-primary"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import {useHeroStore} from '~/store/hero/heroStore';
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

const router = useRouter()
const store = useHeroStore()

const formData = ref({})
const errors = ref([])

async function submitHero():Promise<void> {
  await store.newHeroes(formData.value)
      .then(() => router.push('/heroes'))
      .catch((error) => errors.value = error)
}

</script>


<style scoped>

</style>
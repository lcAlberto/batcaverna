<template>
  <div class="card-body">
    <hero-form
      :errors="errors"
      @update="(event) => formData = event"
    >
      <template #submit>
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          icon="fa fa-arrow-left"
          @click="router.go(-1)"
        />
        <Button
          type="button"
          label="Salvar"
          icon="fa fa-check"
          :loading="loading"
          @click="submitHero()"
        />
      </template>
    </hero-form>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {ref} from 'vue';
import {useHeroStore} from '~/store/hero/heroStore';
import HeroForm from "~/components/Heroes/HeroForm.vue";
import {useRouter} from "vue-router";

const store = useHeroStore()
const router = useRouter()

const formData = ref({})
const loading = store.loading
const errors = ref(null)

async function submitHero(): Promise<void> {
  await store.newHero(formData.value)
  errors.value = store.getErrors
}

</script>


<style scoped>

</style>
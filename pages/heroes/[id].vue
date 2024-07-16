<template>
  <div class="py-5">
    <div class="w-full">
      <Button
        type="button"
        label="Excluir"
        severity="danger"
        icon="fa fa-trash"
        :loading="loading"
        class="ml-auto"
        @click="confirmDestroy = !confirmDestroy"
      />
    </div>
    <hero-form
      v-if="hero"
      :errors="errors"
      :old="hero"
      @update="(event) => formData = event"
    >
      <template #submit>
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          icon="fa fa-arrow-left"
          :loading="loading"
          @click="router.go(-1)"
        />
        <Button
          type="button"
          label="Salvar"
          icon="fa fa-check"
          :loading="loading"
          @click="update()"
        />
      </template>
    </hero-form>
    <confirm-modal
      v-model="confirmDestroy"
      cancel="Não"
      confirm="Sim"
      message="Quer mesmo excluir este herói? Esta ação não pode ser desfeita!"
      title="Atenção!"
      @confirm="destroy"
    />
  </div>
</template>
<script
    lang="ts"
    setup
>
import {ref} from 'vue';
import HeroForm from "~/components/Heroes/HeroForm.vue";
import {useHeroStore} from "~/store/hero/heroStore";
import ConfirmModal from "~/components/layout/ConfirmModal.vue";

const route = useRoute()
const router = useRouter()
const store = useHeroStore()

const formData = ref({})
const hero = ref(null)
const loading = ref(null)
const errors = ref({})
const confirmDestroy = ref(false)

await store.fetchHero(route.params.id).then(() => {
  hero.value = store.hero
  loading.value = store.pending
})

async function update(): Promise<void> {
  await store.editHero(formData.value, route.params.id)
}

async function destroy(): Promise<void> {
  await store.destroyHero(route.params.id)
}

</script>


<style scoped>

</style>
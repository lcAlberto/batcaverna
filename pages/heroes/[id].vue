<template>
  <div class="card-body">
    <page-header
      redirect-back="/heroes"
      subtitle="Todos os herois"
      title="Heróis"
    />
    <hero-form
      v-if="hero.value"
      :errors="errors"
      :old="hero.value"
      @update="(event) => formData = event"
    />
    <div class="card-actions justify-center">
      <button
        class="btn btn-outline btn-error"
        type="button"
        @click="confirmDestroy = !confirmDestroy"
      >
        <span>
          Excluir dos registros
        </span>
      </button>
      <button
        class="btn btn-primary"
        type="button"
        @click="update"
      >
        Salvar
      </button>
    </div>
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
<script lang="ts" setup>
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";
import {useHeroStore} from "~/store/hero/heroStore";
import ConfirmModal from "~/components/layout/ConfirmModal.vue";

const route = useRoute()
const store = useHeroStore()

const hero = store.getHero

const formData = ref({})
const errors = ref({})
const confirmDestroy = ref(false)

await store.fetchHero(route.params.id)

async function update():Promise<void> {
  await store.editHero(formData.value, route.params.id)
}

async function destroy():Promise<void> {
  await store.destroyHero(route.params.id)
}

</script>


<style scoped>

</style>
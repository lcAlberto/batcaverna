<template>
  <div class="card-body">
    <page-header
      redirect-back="/heroes"
      subtitle="Todos os herois"
      title="Heróis"
    />
    <hero-form
      v-if="hero.value"
      :old="hero.value"
      @update="(event) => formData = event"
    />
    <div class="card-actions justify-center">
      <div
        v-if="askToConfirm"
        class="form-control flex">
        <label class="label cursor-pointer gap-4">
          <span class="label-text">Não, cancelar</span>
          <input
            v-model="confirmDestroy"
            class="radio"
            name="confirm-destroy"
            type="radio"
            @click="cancelDestroy"
          />
          <span class="label-text">Sim, tenho</span>
          <input
            v-model="confirmDestroy"
            class="radio"
            name="confirm-destroy"
            type="radio"
          />
        </label>
      </div>
      <button
        class="btn btn-outline btn-error"
        type="button"
        @click="handlerDestroy"
      >
        <span v-if="confirmDestroy">
          Ok, excluir
        </span>
        <span v-else-if="askToConfirm">
          Tem certeza que quer excluir?
        </span>
        <span v-else>
          Excluir dos registros
        </span>
      </button>
      <button
        v-if="!askToConfirm && !confirmDestroy"
        class="btn btn-primary"
        type="button"
        @click="update"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";
import {useHeroStore} from "~/store/hero/heroStore";

const route = useRoute()
const router = useRouter()
const store = useHeroStore()

const hero = store.getHero

const formData = ref({})
const confirmDestroy = ref(false)
const askToConfirm = ref(false)

onMounted(async () => {
  await store.fetchHero(route.params.id)
})

async function update():Promise<void> {
  await store.editHero(formData.value, route.params.id)
      .then(() => router.push('/heroes'))
}

async function destroy():Promise<void> {
  await store.destroyHero(route.params.id)
      .then(() => router.push('/heroes'))
}

function handlerDestroy () {
  askToConfirm.value = !askToConfirm.value
  if (confirmDestroy) {
    destroy()
  }
}

function cancelDestroy () {
  confirmDestroy.value = false
  askToConfirm.value = false
}

</script>


<style scoped>

</style>
<template>
  <div class="card-body">
    <page-header
      title="Heróis"
      subtitle="Todos os herois"
      redirect-back="/heroes"
    />
    <hero-form
      v-if="heroData"
      :old="heroData"
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
            type="radio"
            name="confirm-destroy"
            class="radio"
            @click="cancelDestroy"
          />
          <span class="label-text">Sim, tenho</span>
          <input
            v-model="confirmDestroy"
            type="radio"
            name="confirm-destroy"
            class="radio"
          />
        </label>
      </div>
      <button
        type="button"
        class="btn btn-outline btn-error"
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
        type="button"
        class="btn btn-primary"
        @click="update"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import HeroForm from "~/components/Heroes/HeroForm.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const heroData = ref({})
const confirmDestroy = ref(false)
const askToConfirm = ref(false)

const heroId = route.params.id

onMounted(async () => {
  await $fetch(`${config.public.apiBase}characters/${heroId}`, {
    method: 'GET',
    'Content-Type': 'Application/json',
    onRequest({options}) {
      options.headers = {
        Authorization: `Bearer ${config.public.apiSecret}`
      }
    },
    }).then((response) => {
    heroData.value = response.data;
  })
})

function update () {
  if (formData) {
    $fetch(`${config.public.apiBase}characters/${heroId}`, {
      method: 'PUT',
      body: {data: formData.value},
      'Content-Type': 'Application/json',
      onRequest({options}) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
      }).then(() => {
      router.push('/heroes')
    })
  }
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

function destroy () {
  if (formData) {
    $fetch(`${config.public.apiBase}characters/${heroId}`, {
      method: 'DELETE',
      body: {data: formData.value},
      'Content-Type': 'Application/json',
      onRequest({options}) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
    }).then(() => {
      router.push('/heroes')
    })
  }
}

</script>


<style scoped>

</style>
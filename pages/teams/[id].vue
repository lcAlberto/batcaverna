<template>
  <div class="card-body">
    <page-header
      title="Time"
      subtitle="timeee"
      redirect-back="/teams"
    />
    <team-form
      v-if="teamData.attributes"
      :old="teamData.attributes"
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
import PageHeader from "~/components/layout/PageHeader.vue";
import TeamForm from "~/components/Teams/TeamForm.vue";

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const teamData = ref({})
const confirmDestroy = ref(false)
const askToConfirm = ref(false)

const {params} = route

console.log('params', params?.id);

onMounted(async () => {

  await $fetch(`${config.public.apiBase}teams/${params.id}`, {
    method: 'GET',
    'Content-Type': 'Application/json',
    onRequest({options}) {
      options.headers = {
        Authorization: `Bearer ${config.public.apiSecret}`
      }
    },
  }).then((response) => {
    teamData.value = response.data;
  })
})

function update () {
  if (formData) {
    $fetch(`${config.public.apiBase}teams/${params.id}`, {
      method: 'PUT',
      body: {data: formData.value},
      'Content-Type': 'Application/json',
      onRequest({options}) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
      }).then(() => {
      router.push('/teams')
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
    $fetch(`${config.public.apiBase}teams/${teamId}`, {
      method: 'DELETE',
      body: {data: formData.value},
      'Content-Type': 'Application/json',
      onRequest({options}) {
        options.headers = {
          Authorization: `Bearer ${config.public.apiSecret}`
        }
      },
    }).then(() => {
      router.push('/teams')
    })
  }
}

</script>


<style scoped>

</style>
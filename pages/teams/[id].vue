<template>
  <div class="py-5">
    <div class="w-full flex justify-end">
      <Button
        type="button"
        label="Excluir"
        severity="danger"
        icon="fa fa-trash"
        class="ml-auto"
        @click="confirmDestroy = !confirmDestroy"
      />
    </div>
    <team-form
      v-if="teamData"
      :old="teamData"
      @update="(event) => formData = event"
    />
    <div class="flex justify-end gap-4 w-full mt-5">
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
        @click="update"
      />
    </div>
  </div>
</template>
<script
    setup
    lang="ts"
>
import TeamForm from "~/components/Teams/TeamForm.vue";

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const formData = ref(null)
const teamData = ref({})
const confirmDestroy = ref(false)
const askToConfirm = ref(false)

const {params} = route

const {pending} = useFetch(`${config.public.apiBase}teams/${params.id}`, {
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

function update() {
  if (formData.value) {
    $fetch(`${config.public.apiBase}teams/${params.id}`, {
      method: 'PUT',
      body: formData.value,
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

function handlerDestroy() {
  askToConfirm.value = !askToConfirm.value
  if (confirmDestroy) {
    destroy()
  }
}

function cancelDestroy() {
  confirmDestroy.value = false
  askToConfirm.value = false
}

function destroy() {
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
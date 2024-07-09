<template>
  <div class="card-body">
    <team-form @update="(event) => formData = event"/>
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
        @click="submit"
      />
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import TeamForm from "~/components/Teams/TeamForm.vue";

const config = useRuntimeConfig()
const router = useRouter()

const formData = ref(null)

function submit() {
  if (formData) {
    $fetch(`${config.public.apiBase}teams/`, {
      method: 'POST',
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
</script>


<style scoped>

</style>
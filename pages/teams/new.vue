<template>
  <div class="card-body">
    <page-header
      redirect-back="/teams"
      subtitle="Mais uma equipe para lutar contra o mal"
      title="Super Equipes"
    />
    <team-form @update="(event) => formData = event" />
    <div class="card-actions justify-center">
      <button
        class="btn btn-primary"
        type="button"
        @click="submit"
      >
        Salvar
      </button>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import PageHeader from "~/components/layout/PageHeader.vue"
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
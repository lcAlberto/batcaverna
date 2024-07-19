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
    <confirm-modal
      v-model="confirmDestroy"
      cancel="Não"
      confirm="Sim"
      message="Quer mesmo excluir esta equipe? Esta ação não pode ser desfeita!"
      title="Atenção!"
      theme="danger"
      @confirm="destroy"
    />
  </div>
</template>
<script
    setup
    lang="ts"
>
import TeamForm from "~/components/Teams/TeamForm.vue";
import {useTeamStore} from "~/store/team/teamStore";
import ConfirmModal from "~/components/layout/ConfirmModal.vue";

const route = useRoute()
const router = useRouter()

const formData = ref(null)
const teamData = ref(null)
const confirmDestroy = ref(false)
const store = useTeamStore()

onMounted(async () => {
  await store.fetchTeam(`${route.params.id}`)
      .then(() => {
        teamData.value = store.getTeam
      })
})

function update() {
  if (formData.value) {
    store.editTeam(formData.value, `${route.params.id}`)
  }
}

function destroy() {
  if (formData) {
    store.destroyTeam(`${route.params.id}`)
  }
}

</script>


<style scoped>

</style>
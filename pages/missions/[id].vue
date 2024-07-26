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
    <missions-mission-step-form/>
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
      message="Quer mesmo excluir esta missão? Esta ação não pode ser desfeita!"
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
import ConfirmModal from "~/components/Ui/ConfirmModal.vue";
import {useMissionStore} from "~/store/mission/missionStore";

const route = useRoute()
const router = useRouter()

const confirmDestroy = ref(false)
const store = useMissionStore()


function destroy() {
  store.destroyMission(`${route.params.id}`)
}

</script>


<style scoped>

</style>
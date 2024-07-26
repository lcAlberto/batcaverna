<template>
  <DataTable
    v-model:selection="selected"
    :value="props.data"
    :meta-key-selection="false"
    data-key="name"
    selection-mode="multiple"
    table-style="max-height: 20rem"
  >
    <Column
      selectionMode="multiple"
      headerStyle="width: 3rem"
    />
    <Column
      field="name"
      header="Nome"
    />
    <Column
      field="objectives"
      header="Objetivos"
    />
    <Column
      field="description"
      header="descrição"
    />
    <Column
      field="characters"
      header="Heróis"
    >
      <template #body="{data}">
        <div class="flex flex-wrap gap-3">
          <Chip
            v-for="(hero, index) in squadHeroes(data.characters)"
            :key="index"
            :label="hero.codename"
            :image="hero.avatar"
          />
          <span v-if="data.characters.length > 3">
            + {{ data.characters.length - 3 }} heróis
          </span>
        </div>
      </template>
    </Column>
    <Column
      field="edit"
      header="Editar"
    >
      <template #body="{ data }">
        <Button
          type="button"
          icon="fa fa-pen"
          severity="contrast"
          text
          raised
          rounded
          aria-label="Editar"
          @click="open(data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="isOpenModal"
    modal
    :header="`Editar ${currentSquad?.name}`"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <p class="m-0">
      <squads-data-form
        :old="currentSquad"
        @update="(event) => formData = event"
      />
    </p>
    <template #footer>
      <Button
        type="button"
        label="Cancelar"
        severity="secondary"
        @click="isOpenModal = false"
      />
      <Button
        type="button"
        label="Salvar"
        icon="fa fa-check"
        @click="edit(currentSquad?.id)"
      />
    </template>
  </Dialog>
</template>

<script
    setup
    lang="ts"
>
import {useSquadStore} from "~/store/squad/squadStore";

const props = defineProps({
  data: {type: Object, default: () => []}
});
const emit = defineEmits(['refresh', 'update']);
const store = useSquadStore();

const selected = ref([]);
const formData = ref({});
const isOpenModal = ref(false);
const currentSquad = ref(null);

const squadHeroes = (squadHeroes: []) => {
  if (squadHeroes.length > 3) {
    return squadHeroes.slice(squadHeroes.length - 3)
  } else return squadHeroes
}

watch(() => selected.value, (value) => {
  emit('update', value)
}, {deep: true});

function open(squad: object) {
  currentSquad.value = squad;
  isOpenModal.value = true;
}

async function edit(id: string) {
  await store.editSquad(formData.value, id).then(() => {
    isOpenModal.value = false;
    emit('refresh');
  });
}


</script>

<style scoped>
</style>

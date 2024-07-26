<template>
  <div class="flex gap-4">
    <Fieldset
      class="w-full"
      legend="Criar novo esquadrão"
      :toggleable="true"
      :collapsed="startCollapsed"
    >
      <div class="grid grid-cols-2 w-full gap-4">
        <div class="py-4 w-full">
          <FloatLabel>
            <InputText
              id="name"
              v-model="formData.name"
              :invalid="errors?.name"
              class="w-full"
            />
            <label for="username">Nome</label>
          </FloatLabel>
          <span
            v-if="errors?.name"
            class="label-text-alt text-red-500"
          >{{ errors?.name[0] }}</span>
        </div>
        <div class="py-4">
          <div class="flex-auto">
            <FloatLabel>
              <MultiSelect
                v-model="formData.hero_ids"
                :options="heroes"
                :invalid="errors?.characters"
                label="Adicione os heróis"
                id="heroes"
                display="chip"
                optionLabel="name"
                optionValue="id"
                placeholder="Selecionar heróis"
                :maxSelectedLabels="5"
                class="w-full"
              />
              <label for="dd-city">Selecionar heróis</label>
            </FloatLabel>
          </div>
          <span
            v-if="errors?.heroes"
            class="label-text-alt text-red-500"
          >{{ errors?.heroes[0] }}</span>
        </div>
        <div class="py-4 w-full">
          <FloatLabel>
            <Textarea
              id="description"
              v-model="formData.description"
              :invalid="errors?.description"
              class="w-full"
              rows="5"
              cols="30"
            />
            <label for="username">Descrição</label>
          </FloatLabel>
          <span
            v-if="errors?.description"
            class="label-text-alt text-red-500"
          >{{ errors?.description[0] }}</span>
        </div>
        <div class="py-4 w-full">
          <FloatLabel>
            <Textarea
              id="description"
              v-model="formData.objectives"
              :invalid="errors?.objectives"
              class="w-full"
              rows="5"
              cols="30"
            />
            <label for="username">Objetivos</label>
          </FloatLabel>
          <span
            v-if="errors?.objectives"
            class="label-text-alt text-red-500"
          >{{ errors?.objectives[0] }}</span>
        </div>
      </div>
      <div
        v-if="enableCreate"
        class="w-full flex justify-end"
      >
        <Button
          label="Criar novo esquadrão"
          icon="fa fa-plus"
          iconPos="right"
          severity="contrast"
          @click="createNewSquad()"
        />
      </div>
    </Fieldset>
  </div>
</template>
<script
    setup
    lang="ts"
>
import {useHeroStore} from "~/store/hero/heroStore";
import {useSquadStore} from "~/store/squad/squadStore";

const props = defineProps({
  old: {type: Object, default: null},
  enableCreate: {type: Boolean, default: false},
  startCollapsed: {type: Boolean, default: false}
})
const emit = defineEmits(['update'])
const heroStore = useHeroStore()
const squadStore = useSquadStore()

const errors = ref([])
const heroes = ref([])
const formData = ref({
  name: '',
  hero_ids: [],
  objectives: '',
  description: ''
})

onMounted(async () => {
  await heroStore.fetchHeroes().then(() => heroes.value = heroStore.getHeroes)
  if (props.old) {
    formData.value = {
      name: props.old.name,
      objectives: props.old.objectives,
      description: props.old.description,
      hero_ids: props.old.characters?.length > 0 ? props.old.characters.map(character => character.id) : []
    }
  }
})

async function createNewSquad() {
  await squadStore.newSquad(formData.value)
      .then(() => {
        if (squadStore.getErrors.length === 0) {
          formData.value = {
            name: '',
            hero_ids: [],
            objectives: '',
            description: ''
          }
          squadStore.fetchSquads()
        } else {
          errors.value = squadStore.getLastCreatedSquad
        }
      })
}

watch(() => formData.value, (form) => {
  emit('update', form)
}, {deep: true});

</script>
<style scoped>

</style>
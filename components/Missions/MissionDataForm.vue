<template>
  <div>
    <div class="flex gap-4">
      <Fieldset
        class="w-full"
        legend="Header"
        :toggleable="true"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <i class="fa fa-user"/>
            <span class="font-bold p-2">Dados da missão</span>
          </div>
        </template>
        <div class="flex flex-col w-full gap-4">
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
          <div class="py-4 w-full">
            <FloatLabel>
              <InputText
                id="coordinates"
                v-model="formData.coordinates"
                :invalid="errors?.coordinates"
                class="w-full"
              />
              <label for="username">Coordenadas</label>
            </FloatLabel>
            <span
              v-if="errors?.coordinates"
              class="label-text-alt text-red-500"
            >{{ errors?.coordinates[0] }}</span>
          </div>
          <div class="py-4 w-full">
            <label
              for="urgency_level"
              class="font-bold block mb-2"
            > Nível de urgência</label>
            <Slider
              v-model="formData.urgency_level"
              id="urgency_level"
              :step="10"
              :min="0"
              :max="100"
              class="w-full"
              @change="setUrgenyColor"
            />
            <span
              v-if="errors?.urgency_level"
              class="label-text-alt text-red-500"
            >{{ errors?.urgency_level[0] }}</span>
          </div>
        </div>
      </Fieldset>
      <Fieldset
        class="w-1/2"
        legend="Header"
        :toggleable="true"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <i class="fa fa-user"/>
            <span class="font-bold p-2">Urgência</span>
          </div>
        </template>
        <div class="flex flex-col justify-center text-center gap-4">
          <Knob
            v-model="formData.urgency_level"
            readonly
            :size="200"
            :text-color="rangeColor"
            :valueColor="rangeColor"
            rangeColor="SlateGray"
          />
          <h2
            class="text-2xl font-bold"
            :class="`text-${rangeColor}-500`"
          >{{ urgency }}</h2>
        </div>
      </Fieldset>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useMissionStore} from "~/store/mission/missionStore";

const props = defineProps({
  old: {type: Object, default: null},
  // formErrors: {type: Object, default: null},
})
const emit = defineEmits(['update'])
const store = useMissionStore()

const errors = ref(store.getErrors)
const formData = ref({
  name: '',
  avatar: '',
  coordinates: '',
  urgency_level: 0,
})
const urgency = ref('Normal')
const rangeColor = ref('cyan')

onMounted(async () => {
  if (props.old) {
    formData.value = props.old
    formData.value.urgency_level = props.old.urgency_level || 0
  }
  // if (props.formErrors)
  //   errors.value = props.formErrors
})

watch(() => formData.value, (form) => {
  emit('update', form)
}, {deep: true});

function setUrgenyColor() {
  if (formData.value.urgency_level <= 10) {
    rangeColor.value = 'cyan'
    urgency.value = 'Normal'
  } else if (formData.value.urgency_level <= 20) {
    rangeColor.value = 'lime'
    urgency.value = 'Levemente Alta'
  } else if (formData.value.urgency_level <= 30) {
    rangeColor.value = 'green'
    urgency.value = 'Alta'
  } else if (formData.value.urgency_level <= 50) {
    rangeColor.value = 'yellow'
    urgency.value = 'Muito Alta'
  } else if (formData.value.urgency_level <= 60) {
    rangeColor.value = 'orange'
    urgency.value = 'Emergência'
  } else if (formData.value.urgency_level <= 70) {
    rangeColor.value = 'red'
    urgency.value = 'Catástrofica'
  }
}

</script>

<style scoped>

</style>
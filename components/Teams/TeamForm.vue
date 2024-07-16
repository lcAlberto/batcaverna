<template>
  <div>
    <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
      <Fieldset
        class="w-full"
        legend="Header"
        :toggleable="true"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <i class="fa fa-user"/>
            <span class="font-bold p-2">Imagem</span>
          </div>
        </template>
        <avatar-upload
          :current-image="formData.image"
          class="w-full justify-end"
          @update="(event) => updateImage(event)"
        />
      </Fieldset>
      <Fieldset
        class="w-full"
        legend="Header"
        :toggleable="true"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <i class="fa fa-user"/>
            <span class="font-bold p-2">Dados da equipe</span>
          </div>
        </template>
        <div class="flex w-full gap-4">
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
                id="location"
                v-model="formData.location"
                :invalid="errors?.location"
                class="w-full"
              />
              <label for="username">Localização</label>
            </FloatLabel>
            <span
              v-if="errors?.location"
              class="label-text-alt text-red-500"
            >{{ errors?.location[0] }}</span>
          </div>
        </div>
      </Fieldset>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import AvatarUpload from "~/components/Heroes/AvatarUpload.vue";

const prop = defineProps({
  old: {type: Object, default: null}
})
const emit = defineEmits(['update'])

const errors = ref(null)
const formData = ref({
  name: '',
  image: '',
  location: '',
  heroes: [],
})

onMounted(() => {
  if (prop.old) {
    formData.value = prop.old
  }
})

function updateImage(payload: object) {
  formData.value.image = payload
  emit('update', formData)
}

watch(() => formData.value, (form) => {
  emit('update', form)
}, {deep: true});

</script>


<style scoped>

</style>
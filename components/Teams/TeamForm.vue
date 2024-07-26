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
          :current-image="formData.avatar"
          :errors="errors?.avatar"
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
        <div class="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-4">
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
          <div class="py-4 w-full">
            <FloatLabel>
              <DatePicker
                id="founded_date"
                v-model="formData.founded_date"
                :invalid="errors?.founded_date"
                dateFormat="dd/mm/yy"
                :maxDate="today"
                class="w-full"
              />
              <label for="username">Data de fundação</label>
            </FloatLabel>
            <span
              v-if="errors?.location"
              class="label-text-alt text-red-500"
            >{{ errors?.location[0] }}</span>
          </div>
          <div class="py-4">
            <div class="flex-auto">
              <FloatLabel>
                <MultiSelect
                  v-model="formData.heroes"
                  :options="heroes"
                  :invalid="errors?.heroes"
                  label="Fraquezas ou pontos fracos"
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
import {useHeroStore} from "~/store/hero/heroStore";

const prop = defineProps({
  old: {type: Object, default: null}
})
const emit = defineEmits(['update'])

const heroStore = useHeroStore()
const heroes = ref(null)

const errors = ref(null)
const formData = ref({
  name: '',
  avatar: '',
  location: '',
  founded_date: '',
  heroes: [],
})
const today = new Date()

onMounted(async () => {
  await heroStore.fetchHeroes().then(() => heroes.value = heroStore.getHeroes)
  if (prop.old)
    formData.value = prop.old
})

function updateImage(payload: object) {
  formData.value.avatar = payload
  emit('update', formData)
}

watch(() => formData.value, (form) => {
  emit('update', form)
}, {deep: true});

</script>


<style scoped>

</style>
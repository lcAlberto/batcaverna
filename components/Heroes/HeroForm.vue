<template>
  <div>
    <div class="grid xl:grid-cols-3 lg:grid-cols-1 gap-4">
      <Fieldset
        class="w-full"
        legend="Header"
        :toggleable="true"
      >
        <template #legend>
          <div class="flex items-center pl-2">
            <i class="fa fa-user"/>
            <span class="font-bold p-2">Dados Pessoais</span>
          </div>
        </template>
        <div class="p-4 w-full">
          <avatar-upload
            :current-image="formData.avatar"
            :errors="errors?.avatar"
            class="flex justify-center w-full mb-3"
            @update="(event) => updateImage(event)"
          />
          <div class="py-4">
            <FloatLabel>
              <InputText
                id="codename"
                v-model="formData.codename"
                :invalid="errors?.codename"
                class="w-full"
              />
              <label for="username">Codinome</label>
            </FloatLabel>
            <span
              v-if="errors?.codename"
              class="label-text-alt text-red-500"
            >{{ errors?.codename[0] }}</span>
          </div>

          <div class="py-4">
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
            <FloatLabel>
              <InputText
                id="age"
                v-model="formData.age"
                :invalid="errors?.age"
                class="w-full"
              />
              <label for="username">Idade</label>
            </FloatLabel>
            <span
              v-if="errors?.age"
              class="label-text-alt text-red-500"
            >{{ errors?.age[0] }}</span>
          </div>
        </div>
      </Fieldset>

      <div class="xl:col-span-2 lg:col-span-1 flex flex-col gap-4">
        <Fieldset
          legend="Header"
          :toggleable="true"
          class="mb-auto"
        >
          <template #legend>
            <div class="flex items-center pl-2">
              <i class="fa fa-user"/>
              <span class="font-bold p-2">Dados do Herói</span>
            </div>
          </template>
          <div class="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
            <div class="">
              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="planet"
                    class="font-bold block mb-2"
                  > Planeta</label>
                  <InputText
                    v-model="formData.planet"
                    inputId="planet"
                    :invalid="errors?.planet"
                    fluid
                  />
                </div>
                <span
                  v-if="errors?.planet"
                  class="label-text-alt text-red-500"
                >{{ errors?.planet[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="affiliate"
                    class="font-bold block mb-2"
                  > Afiliado, mentor, mestre</label>
                  <InputText
                    v-model="formData.affiliate"
                    inputId="affiliate"
                    :invalid="errors?.affiliate"
                    fluid
                  />
                </div>
                <span
                  v-if="errors?.affiliate"
                  class="label-text-alt text-red-500"
                >{{ errors?.affiliate[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="affiliate"
                    class="font-bold block mb-2"
                  >Par, companheiro, interesse romântico</label>
                  <InputText
                    v-model="formData.pair"
                    inputId="affiliate"
                    :invalid="errors?.pair"
                    fluid
                  />
                </div>
                <span
                  v-if="errors?.pair"
                  class="label-text-alt text-red-500"
                >{{ errors?.pair[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="city"
                    class="font-bold block mb-2"
                  > Cidade, província ou nação</label>
                  <InputText
                    v-model="formData.city"
                    inputId="affiliate"
                    :invalid="errors?.city"
                    fluid
                  />
                </div>
                <span
                  v-if="errors?.city"
                  class="label-text-alt text-red-500"
                >{{ errors?.city[0] }}</span>
              </div>
              <div class="py-3 flex gap-4">
                <div class="flex-auto">
                  <label
                    for="color"
                    class="font-bold block mb-2"
                  > Cor predominante</label>
                  {{ colorWithHash }}
                  <ColorPicker
                    v-model="colorWithHash"
                    inputId="color"
                    format="hex"
                    :invalid="errors?.color"
                    class="mb-4"
                  />
                </div>
                <span
                  v-if="errors?.color"
                  class="label-text-alt text-red-500"
                >{{ errors?.color[0] }}</span>
              </div>

            </div>
            <div class="w-full">
              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="team_id"
                    class="font-bold block mb-2"
                  > Equipe</label>
                  <Select
                    v-model="formData.team_id"
                    :options="teams"
                    :loading="pending"
                    :invalid="errors?.team_id"
                    optionLabel="name"
                    optionValue="id"
                    labelId="id"
                    placeholder="Selecione uma equipe"
                    class="w-full"
                  />
                </div>
                <span
                  v-if="errors?.team_id"
                  class="label-text-alt text-red-500"
                >{{ errors?.team_id[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="sex"
                    class="font-bold block mb-2"
                  > Gênero biológico
                  </label>
                  <Select
                    v-model="formData.sex"
                    :options="genders"
                    :loading="pending"
                    :invalid="errors?.sex"
                    optionLabel="label"
                    optionValue="value"
                    labelId="value"
                    placeholder="Selecione um sexo biológico para qual o herói ou criatura pertence"
                    class="w-full"
                  />
                </div>
                <span
                  v-if="errors?.sex"
                  class="label-text-alt text-red-500"
                >{{ errors?.sex[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="skills"
                    class="font-bold block mb-2"
                  > Habilidades, poderes ou pontos fortes</label>
                  <MultiSelect
                    v-model="formData.skills"
                    :options="skills"
                    :invalid="errors?.skills"
                    id="skills"
                    display="chip"
                    optionLabel="name"
                    optionValue="id"
                    dataKey="id"
                    placeholder="Habilidades"
                    :maxSelectedLabels="10"
                    class="w-full"
                  />
                </div>
                <span
                  v-if="errors?.skills"
                  class="label-text-alt text-red-500"
                >{{ errors?.skills[0] }}</span>
              </div>

              <div class="py-3">
                <div class="flex-auto">
                  <label
                    for="weakness"
                    class="font-bold block mb-2"
                  > Fraquezas ou pontos fracos</label>
                  <MultiSelect
                    v-model="formData.weakness"
                    :options="weakness"
                    :invalid="errors?.weakness"
                    id="weakness"
                    display="chip"
                    optionLabel="name"
                    optionValue="id"
                    dataKey="id"
                    placeholder="Fraquezas"
                    :maxSelectedLabels="10"
                    class="w-full"
                  />
                </div>
                <span
                  v-if="errors?.weakness"
                  class="label-text-alt text-red-500"
                >{{ errors?.weakness[0] }}</span>
              </div>
            </div>
          </div>
        </Fieldset>
        <div class="mt-auto flex justify-end gap-4">
          <slot name="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import {useSkillStore} from "~/store/skill/skillStore";
import {useWeaknessStore} from "~/store/weakness/weaknessStore";
import AvatarUpload from "~/components/Heroes/AvatarUpload.vue";

const emit = defineEmits(['update'])

const prop = defineProps({
  old: {type: Object, default: null},
  errors: {type: Array<HeroErrors>, default: null},
})

const skillStore = useSkillStore()
const skills = ref([])
const weaknessStore = useWeaknessStore()
const weakness = ref([])

const config = useRuntimeConfig()
const genders = [
  {value: 'male', label: 'Masculino'},
  {value: 'female', label: 'Feminino'},
  {value: 'other', label: 'Outro'},
]
const formData = ref({
  name: '',
  avatar: null,
  codename: '',
  sex: '',
  city: '',
  skills: [],
  age: null,
  planet: '',
  weakness: [],
  affiliate: '',
  pair: '',
  color: '#10B981',
  team: '',
  team_id: ''
})

onMounted(() => {
  skillStore.fetchSkills()
  weaknessStore.fetchWeakness()
  if (prop.old) {
    formData.value = prop.old
    formData.value.weakness = formData.value.weakness.map(weakness => weakness.id)
    formData.value.skills = formData.value.skills.map(skill => skill.id)
  }
})

watch(() => skillStore.getSkills, (newSkills) => {
  skills.value = newSkills
});
watch(() => weaknessStore.getWeakness, (newWeakness) => {
  weakness.value = newWeakness
});
watch(() => formData.value, (form) => {
  emit('update', form)
}, {deep: true});


const {data: teams, pending} = await useFetch(`${config.public.apiBase}teams`, {
  onRequest({options}) {
    options.headers = {
      Authorization: `Bearer ${config.public.apiSecret}`
    }
  },
  transform: (teams) => {
    return teams.teams.data
  },
})

function updateImage(payload: object) {
  formData.value.avatar = payload
}

const colorWithHash = computed({
  get() {
    return formData.value.color && formData.value.color.startsWith('#')
        ? formData.value.color
        : `#${formData.value.color}`;
  },
  set(value) {
    formData.value.color = `#${value}`
  }
});

interface HeroErrors {
  codename: string[],
  image: string[],
  name: string[],
  age: string[],
  planet: string[],
  city: string[],
  affiliate: string[],
  pair: string[],
  color: string[],
  team_id: string[],
}

</script>


<style scoped>

</style>
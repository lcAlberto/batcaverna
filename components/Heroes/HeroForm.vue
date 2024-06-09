<template>
  <div class="flex flex-col items-center justify-center py-2 gap-4">
    <div class="flex items-center justify-center gap-5 py-3 my-5">
      <avatar-upload
        :current-image="formData.avatar"
        :errors="errors?.codename"
        class="w-min justify-end"
        @update="(event) => updateImage(event)"
      />
      <div class="gap-3">
        <label
          :class="{ 'input-error': errors?.codename}"
          class="input input-bordered flex items-center gap-2 my-2"
        >
          <span class="text-slate-500	">Codinome</span>
          <input
            v-model="formData.codename"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.codename"
              class="label-text-alt text-red-500"
            >{{ errors?.codename[0] }}</span>
          </div>
        </label>
        <label
          :class="{ 'input-error': errors?.name}"
          class="input input-bordered flex items-center gap-2 my-2"
        >
          <span class="text-slate-500	">Nome</span>
          <input
            v-model="formData.name"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.name"
              class="label-text-alt text-red-500"
            >{{ errors?.name[0] }}</span>
          </div>
        </label>
        <label
          :class="{ 'input-error': errors?.age}"
          class="input input-bordered flex items-center gap-2 my-2"
        >
          <span class="text-slate-500	">Idade</span>
          <input
            v-model="formData.age"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.age"
              class="label-text-alt text-red-500"
            >{{ errors?.age[0] }}</span>
          </div>
        </label>
      </div>
    </div>
    <div class="mx-auto lg:w-2/3">
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.planet"
            :class="{ 'input-error': errors?.planet}"
            class="input input-sm input-bordered w-full"
            placeholder="Planeta de origem"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.planet"
              class="label-text-alt"
            >{{ errors?.planet[0] }}</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.city"
            :class="{ 'input-error': errors?.city}"
            class="input input-sm input-bordered w-full"
            placeholder="Cidade"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.city"
              class="label-text-alt"
            >{{ errors?.city[0] }}</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.affiliate"
            :class="{ 'input-error': errors?.affiliate}"
            class="input input-sm input-bordered w-full"
            placeholder="Afiliado"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.affiliare"
              class="label-text-alt"
            >{{ errors?.affiliate[0] }}</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.pair"
            :class="{ 'input-error': errors?.pair}"
            class="input input-sm input-bordered w-full"
            placeholder="Par"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.pair"
              class="label-text-alt"
            >{{ errors?.pair[0] }}</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.color"
            :class="{ 'input-error': errors?.color}"
            class="input input-sm input-bordered w-full"
            placeholder="Principal cor"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-if="errors?.color"
              class="label-text-alt"
            >{{ errors?.color[0] }}</span>
          </div>
        </label>
        <default-select
          :errors="errors?.team_id"
          :items="teams"
          :loading="pending"
          @selected="(event) => updateTeam(event)"
        />
        <!--      </div>-->
      </div>
      <div class="flex gap-4">
        <div class="form-control flex flex-row gap-4 justify-center pb-2 w-full">
          <label class="label cursor-pointer">Sexo:</label>
          <div class="flex flex-row gap-4">
            <label class="label justify-start gap-3 cursor-pointer">
              <input
                v-model="formData.sex"
                :class="{ 'input-error': errors?.sex}"
                class="radio radio-sm checked:bg-primary"
                name="sex"
                type="radio"
                value="male"
                @change="emit('update', formData)"
              />
              <span class="label-text">Masculino</span>
            </label>
            <label class="label justify-start gap-3 cursor-pointer">
              <input
                v-model="formData.sex"
                :class="{ 'input-error': errors?.sex}"
                class="radio radio-sm checked:bg-primary"
                name="sex"
                type="radio"
                value="female"
                @change="emit('update', formData)"
              />
              <span class="label-text">Feminino</span>
            </label>
            <label class="label justify-start gap-3 cursor-pointer">
              <input
                v-model="formData.sex"
                :class="{ 'input-error': errors?.sex}"
                class="radio radio-sm checked:bg-primary"
                name="sex"
                type="radio"
                value="other"
                @change="emit('update', formData)"
              />
              <span class="label-text">Não especificado</span>
            </label>
          </div>
          <div class="label">
            <span
              v-if="sex"
              class="label-text-alt"
            >{{ errors?.sex[0] }}</span>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <multi-select
            v-model="formData.skills"
            :errors="errors?.skills"
            :items="skills"
            :loading="pending"
            label="Equipe"
          />
          <div class="label">
            <span
              v-if="errors?.skills"
              class="label-text-alt"
            >{{ errors?.skills[0] }}</span>
          </div>
        </label>
        <label class="form-control w-full">
          <multi-select
            v-model="formData.weakness"
            :errors="errors?.weakness"
            :items="skills"
            :loading="pending"
            label="Fraquezas"
          />
          <div class="label">
            <span
              v-if="errors?.weakness"
              class="label-text-alt"
            >{{ errors?.weakness[0] }}</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
    setup
>
import AvatarUpload from "~/components/Heroes/AvatarUpload.vue";
import DefaultSelect from "~/components/layout/forms/default-select.vue";
import {useSkillStore} from "~/store/skill/skillStore";
import MultiSelect from "~/components/layout/forms/multi-select.vue";

const emit = defineEmits(['update'])

const prop = defineProps({
  old: {type: Object, default: null},
  errors: {type: Array<HeroErrors>, default: null},
})

const skillStore = useSkillStore()
const skills = ref([])


const config = useRuntimeConfig()
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
  color: '',
  team: '',
  team_id: ''
})

onMounted(() => {
  skillStore.fetchSkills()
  if (prop.old) {
    formData.value = prop.old
  }
})

watch(() => skillStore.getSkills, (newSkills) => {
  skills.value = newSkills
});


const {data: teams, pending, error} = await useFetch(`${config.public.apiBase}teams`, {
  onRequest({options}) {
    options.headers = {
      Authorization: `Bearer ${config.public.apiSecret}`
    }
  },
  transform: (teams) => {
    return teams.teams.data
  },
  //pick: ['id', 'name']
})

function updateImage(payload: object) {
  formData.value.image = payload
  emit('update', formData.value)
}

function updateTeam(payload: object) {
  formData.value.team_id = payload.id
  formData.value.team = `${payload.id}`
  emit('update', formData.value)
}

interface HeroErrors {
  codename: string[],
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
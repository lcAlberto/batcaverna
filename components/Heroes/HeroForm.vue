<template>
  <div class="flex flex-col items-center justify-center py-2 gap-4">
    <div class="flex items-center justify-center gap-5 py-3 my-5">
      <avatar-upload
        :current-image="formData.avatar"
        class="w-min justify-end"
        @update="(event) => updateImage(event)"
      />
      <div class="gap-3">
        <label class="input input-bordered flex items-center gap-2 my-2">
          <span class="text-slate-500	">Codinome</span>
          <input
            v-model="formData.codename"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <label class="input input-bordered flex items-center gap-2 my-2">
          <span class="text-slate-500	">Nome</span>
          <input
            v-model="formData.name"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <label class="input input-bordered flex items-center gap-2 my-2">
          <span class="text-slate-500	">Idade</span>
          <input
            v-model="formData.age"
            class="grow"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
      </div>
    </div>
    <div class="mx-auto lg:w-2/3">
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.planet"
            class="input input-sm input-bordered w-full"
            placeholder="Planeta de origem"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.city"
            class="input input-sm input-bordered w-full"
            placeholder="Cidade"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.affiliate"
            class="input input-sm input-bordered w-full"
            placeholder="Afiliado"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.pair"
            class="input input-sm input-bordered w-full"
            placeholder="Par"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.mainColor"
            class="input input-sm input-bordered w-full"
            placeholder="Principal cor"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <default-select
          :errors="error"
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
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.mainPower"
            class="input input-sm input-bordered w-full"
            placeholder="Principal poder"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.weakness"
            class="input input-sm input-bordered w-full"
            placeholder="Fraqueza"
            type="text"
            @input="emit('update', formData)"
          />
          <div class="label">
            <span
              v-show="errors"
              class="label-text-alt"
            >Bottom Left label</span>
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

const prop = defineProps({
  old: {type: Object, default: null}
})
const emit = defineEmits(['update'])

const config = useRuntimeConfig()
const errors = ref(null)
const formData = ref({
  name: '',
  avatar: null,
  codename: '',
  sex: '',
  city: '',
  mainPower: '',
  age: null,
  planet: '',
  weakness: '',
  affiliate: '',
  pair: '',
  mainColor: '',
  team: '',
  team_id: ''
})

onMounted(() => {
  if (prop.old) {
    formData.value = prop.old
  }
})

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


</script>


<style scoped>

</style>
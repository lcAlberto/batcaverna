<template>
  <div class="flex flex-col items-center justify-center py-2 gap-4">
    <div class="flex items-center justify-center gap-5 py-3 my-5">
      <avatar-upload
        :current-image="formData.avatar"
        class="w-min justify-end"
        @update="(event) => formData.avatar = event"
      />
      <div class="">
        <label class="form-control w-full">
          <input
            v-model="formData.codename"
            type="text"
            placeholder="Codinome"
            class="input w-full input-sm lg:input-bordered"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Nome"
            class="input w-full input-sm lg:input-bordered"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control mb-0">
          <input
            v-model="formData.age"
            type="number"
            placeholder="Idade"
            class="input input-sm w-full lg:input-bordered"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
    </div>
    <div class="mx-auto lg:w-2/3">
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.planet"
            type="text"
            placeholder="Planeta de origem"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.city"
            type="text"
            placeholder="Cidade"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.affiliate"
            type="text"
            placeholder="Afiliado"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.pair"
            type="text"
            placeholder="Par"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.mainColor"
            type="text"
            placeholder="Principal cor"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
      <div class="flex gap-4">
        <div class="form-control flex flex-row gap-4 justify-center pb-2 w-full">
          <label class="label cursor-pointer">Sexo:</label>
          <div class="flex flex-row gap-4">
            <label class="label justify-start gap-3 cursor-pointer">
              <span class="label-text">Masculino</span>
              <input
                v-model="formData.sex"
                type="radio"
                name="sex"
                value="male"
                class="radio radio-sm checked:bg-primary"
              />
            </label>
            <label class="label justify-start gap-3 cursor-pointer">
              <span class="label-text">Feminino</span>
              <input
                v-model="formData.sex"
                type="radio"
                value="female"
                name="sex"
                class="radio radio-sm checked:bg-primary"
              />
            </label>
            <label class="label justify-start gap-3 cursor-pointer">
              <span class="label-text">Não especificado</span>
              <input
                v-model="formData.sex"
                type="radio"
                name="sex"
                value="other"
                class="radio radio-sm checked:bg-primary"
              />
            </label>
          </div>
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </div>
      </div>
      <div class="flex gap-4">
        <label class="form-control w-full">
          <input
            v-model="formData.mainPower"
            type="text"
            placeholder="Principal poder"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label class="form-control w-full">
          <input
            v-model="formData.weakness"
            type="text"
            placeholder="Fraqueza"
            class="input input-sm input-bordered w-full"
          />
          <div class="label">
            <span v-show="errors"  class="label-text-alt">Bottom Left label</span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AvatarUpload from "~/components/Heroes/AvatarUpload.vue";
const prop = defineProps({
  old: {type: Object, default: null}
})
const emit = defineEmits(['update'])

const errors = ref(null)
const formData = ref({
  name: '',
        avatar: '',
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
})

onMounted(() => {
    if (prop.old) {
      formData.value = prop.old
    }
})

watch (formData, (value) => {
  emit('update', value)
})
</script>


<style scoped>

</style>
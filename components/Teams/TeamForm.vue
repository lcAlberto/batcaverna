<template>
  <div class="flex flex-col items-center justify-center py-2 gap-4">
    <div class="flex items-center justify-center gap-5 py-3 my-5">
      <avatar-upload
        :current-image="formData.image"
        class="w-min justify-end"
        @update="(event) => updateImage(event)"
      />
      <div class="">
        <label class="form-control w-full">
          <input
            v-model="formData.name"
            class="input w-full input-sm lg:input-bordered"
            placeholder="Nome"
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
            v-model="formData.location"
            class="input w-full input-sm lg:input-bordered"
            placeholder="Local"
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
  // founded_date: new Date()
})

onMounted(() => {
  console.log(prop.old);
  if (prop.old) {
    formData.value = prop.old
  }
})

function updateImage(payload: object) {
  formData.value.image = payload
  emit('update', formData)
}

</script>


<style scoped>

</style>
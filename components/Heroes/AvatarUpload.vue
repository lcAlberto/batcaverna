<template>
  <div class="avatar flex flex-col items-center gap-1">
    <div
      :class="{ 'ring-error': errors }"
      class="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      @click="triggerFileInput"
    >
      <img
        v-if="fileData && imgBlob.length > 0"
        :src="imgBlob"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else-if="prop.currentImage"
        :src="prop.currentImage"
        alt="superhero-profile-placeholder"
      />
      <img
        v-else
        alt="superhero-profile-placeholder"
        src="/assets/female_superhero.png"
      />
    </div>
    <small
      v-if="errors && errors.length > 0"
      class="text-error">{{errors[0]}}
    </small>
    <input
      id="fileInput"
      class="hidden"
      type="file"
      @change="handleFileUpload"
    >
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['update'])
const prop = defineProps({
  currentImage: { type: [Object, String], default: null },
  acceptBlob: {type: Boolean, default: false},
  errors: {type: Array, default: null}
})

const imgBlob = ref('')
const fileData = ref(null)

function triggerFileInput() {
  if (document.getElementById('fileInput'))
    document.getElementById('fileInput').click()
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    fileData.value = file
    const reader = new FileReader()
    reader.onload = () => {
      toBlob(reader.result)
    }
    reader.readAsDataURL(file)
    emit('update', file);
  }
}

function toBlob (result: string) {
  const teste = result.replace(/^data:image\/[a-z]+;base64,/, "")
  imgBlob.value = `data:image/png;base64,${teste}`
}

</script>


<style scoped>

</style>